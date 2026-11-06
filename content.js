// ==UserScript==
// @name         Equaliser Youngbi 4.0
// @namespace    https://youngbi.store/
// @version      4.1.3
// @description  Equaliser Youngbi 4.0 — Live rebuild, Limiter, Gate, Preset, VU, Echo, Vang, Xả nhạc
// @author       Youngbi
// @match        https://discord.com/*
// @match        https://*.discord.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';
  if (window.__EYB40) return;
  window.__EYB40 = true;

  const PRODUCT = 'Equaliser Youngbi 4.1.3';
  const VERSION = '4.1.3';
  const CFG_KEY = 'eyb40-cfg';
  const PROFILES_KEY = 'eyb40-profiles';

  const FILTER_TYPES = [
    'peaking', 'lowshelf', 'highshelf',
    'lowpass', 'highpass', 'notch',
    'bandpass', 'allpass'
  ];

  const DEFAULT_BANDS = [
    { on: true, type: 'highpass',  freq: 80,   gain: 0,   Q: 0.85 },
    { on: true, type: 'lowshelf',  freq: 120,  gain: -4.5,Q: 0.75 },
    { on: true, type: 'peaking',   freq: 160,  gain: -1.5,Q: 1.2 },
    { on: true, type: 'peaking',   freq: 350,  gain: 1.5, Q: 1.0 },
    { on: true, type: 'peaking',   freq: 700,  gain: 3,   Q: 1.1 },
    { on: true, type: 'peaking',   freq: 1300, gain: 5.5, Q: 1.2 },
    { on: true, type: 'peaking',   freq: 2200, gain: 7,   Q: 1.3 },
    { on: true, type: 'peaking',   freq: 3500, gain: 5.5, Q: 1.2 },
    { on: true, type: 'peaking',   freq: 5500, gain: 3.5, Q: 1.0 },
    { on: true, type: 'peaking',   freq: 8500, gain: 2,   Q: 0.9 },
    { on: true, type: 'highshelf', freq: 14000,gain: 1,   Q: 0.7 }
  ];

  const DEFAULT_MUSIC_BANDS = [
    { freq: 60, gain: 0 }, { freq: 120, gain: 0 }, { freq: 250, gain: 0 },
    { freq: 500, gain: 0 }, { freq: 1000, gain: 0 }, { freq: 2000, gain: 0 },
    { freq: 4000, gain: 0 }, { freq: 8000, gain: 0 }, { freq: 12000, gain: 0 },
    { freq: 16000, gain: 0 }
  ];

  // To hơn config APO trả phí: preamp/master mặc định & max cao hơn
  const DEFAULTS = {
    enabled: true,
    preamp: 12,
    masterGain: 4,
    limiterOn: true,
    limiterCeil: 0.95,
    gateOn: false,
    gateDb: -48,
    reverbOn: false,
    reverbMix: 0.25,
    reverbDecay: 0.8,
    reverbSize: 1.2,
    reverbPreDelay: 0.15,
    musicGain: 1.0,
    voiceMix: 1.0,
    musicMix: 0.8,
    musicBass: 0,
    musicBands: JSON.parse(JSON.stringify(DEFAULT_MUSIC_BANDS)),
    bands: JSON.parse(JSON.stringify(DEFAULT_BANDS)),
    echoOn: false,
    echoLayers: 3,
    echoDelay: 0.4,
    echoGain: 1.2,
    counterOn: false,
    counterPan: 0,
    counterWider: 0.35,
    monitorOn: false,
    open: false,
    tab: 'eq',
    fx: null, fy: null
  };

  function loadCfg() {
    try {
      const raw = JSON.parse(localStorage.getItem(CFG_KEY) || '{}');
      const cfg = Object.assign({}, DEFAULTS, raw);
      if (!Array.isArray(cfg.bands) || !cfg.bands.length) cfg.bands = JSON.parse(JSON.stringify(DEFAULT_BANDS));
      cfg.bands = cfg.bands.map(b => ({
        on: b.on !== false,
        type: FILTER_TYPES.includes(b.type) ? b.type : 'peaking',
        freq: Number(b.freq) || 1000,
        gain: Number(b.gain) || 0,
        Q: Number(b.Q) || 1.0
      }));
      if (!Array.isArray(cfg.musicBands) || cfg.musicBands.length !== 10)
        cfg.musicBands = JSON.parse(JSON.stringify(DEFAULT_MUSIC_BANDS));
      return cfg;
    } catch {
      return JSON.parse(JSON.stringify(DEFAULTS));
    }
  }
  function saveCfg() { try { localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); } catch {} }
  function loadProfiles() { try { return JSON.parse(localStorage.getItem(PROFILES_KEY) || '[]'); } catch { return []; } }
  function saveProfiles(list) { try { localStorage.setItem(PROFILES_KEY, JSON.stringify(list)); } catch {} }

  let cfg = loadCfg();
  let profiles = loadProfiles();

  let audioCtx = null;
  let graph = null;
  let graphNoise = null;
  let rawStream = null;
  let outStream = null;
  let music = { el: null, src: null, playing: false };
  let gateState = 'open';
  let meterTimer = null;

  function ensureCtx() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)({
          sampleRate: 48000, latencyHint: 'interactive'
        });
      } catch (e) {
        // iOS / một số Android fallback không hỗ trợ options
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
    return audioCtx;
  }
  function dbToLin(db) { return Math.pow(10, db / 20); }

  function makeIR(ctx, sizeSec, decay) {
    // tối ưu: stride + 1 channel copy → đỡ lag khi regen IR dài
    const len = Math.max(1, Math.floor(ctx.sampleRate * Math.min(sizeSec, 4.5)));
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    const d0 = buf.getChannelData(0);
    const d1 = buf.getChannelData(1);
    const exp = Math.max(0.5, decay * 2.5);
    const step = len > 48000 ? 2 : 1;
    for (let i = 0; i < len; i += step) {
      const v = (Math.random() * 2 - 1) * Math.pow(1 - i / len, exp);
      d0[i] = v;
      d1[i] = v * (0.92 + Math.random() * 0.08);
      if (step === 2 && i + 1 < len) { d0[i + 1] = d0[i]; d1[i + 1] = d1[i]; }
    }
    return buf;
  }

  function makeLimiterCurve(ceil) {
    const n = 4096, c = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      c[i] = Math.tanh(x / (ceil || 0.95)) * (ceil || 0.95);
    }
    return c;
  }

  function disconnectGraph() {
    if (!graph) return;
    try {
      Object.values(graph).forEach(n => {
        if (n && typeof n.disconnect === 'function') { try { n.disconnect(); } catch (e) {} }
        if (Array.isArray(n)) n.forEach(x => { try { x.disconnect(); } catch (e) {} });
      });
    } catch (e) {}
    try { if (graphNoise) { graphNoise.stop(); graphNoise.disconnect(); } } catch (e) {}
    graphNoise = null;
    graph = null;
  }

  function buildGraph(stream) {
    const ctx = ensureCtx();
    disconnectGraph();

    rawStream = stream;
    const src = ctx.createMediaStreamSource(stream);

    const preamp = ctx.createGain();
    preamp.gain.value = dbToLin(cfg.preamp);

    const filters = [];
    cfg.bands.forEach(b => {
      const f = ctx.createBiquadFilter();
      f.type = b.type;
      f.frequency.value = b.freq;
      f.Q.value = b.Q;
      if ('gain' in f) f.gain.value = b.on && cfg.enabled ? b.gain : 0;
      filters.push(f);
    });

    const master = ctx.createGain();
    master.gain.value = cfg.enabled ? cfg.masterGain : 1;

    // Limiter (soft clip)
    const limiter = ctx.createWaveShaper();
    limiter.curve = cfg.limiterOn ? makeLimiterCurve(cfg.limiterCeil) : null;
    limiter.oversample = '2x';

    // Gate
    const gate = ctx.createGain();
    gate.gain.value = 1;

    // Reverb
    const dry = ctx.createGain();
    const wet = ctx.createGain();
    const reverbIn = ctx.createGain();
    const reverbDelay = ctx.createDelay(2.0);
    reverbDelay.delayTime.value = Math.max(0, Math.min(2, cfg.reverbPreDelay || 0));
    const conv = ctx.createConvolver();
    conv.normalize = true;
    conv.buffer = makeIR(ctx, 0.3 + cfg.reverbSize * 0.9, cfg.reverbDecay);
    const mix = ctx.createGain();
    dry.gain.value = 1 - (cfg.reverbOn ? cfg.reverbMix : 0);
    wet.gain.value = cfg.reverbOn ? cfg.reverbMix : 0;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.25;

    const dest = ctx.createMediaStreamDestination();

    let last = src;
    last.connect(preamp); last = preamp;
    filters.forEach(f => { last.connect(f); last = f; });
    last.connect(master);

    // Noise nhẹ
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = cfg.enabled ? 0.01 : 0;
    try {
      const nLen = ctx.sampleRate * 2;
      const nBuf = ctx.createBuffer(1, nLen, ctx.sampleRate);
      const nData = nBuf.getChannelData(0);
      for (let i = 0; i < nLen; i++) nData[i] = (Math.random() * 2 - 1) * 0.3;
      const noise = ctx.createBufferSource();
      noise.buffer = nBuf; noise.loop = true;
      const nh = ctx.createBiquadFilter(); nh.type = 'highpass'; nh.frequency.value = 1500;
      const nl = ctx.createBiquadFilter(); nl.type = 'lowpass'; nl.frequency.value = 9000;
      noise.connect(nh); nh.connect(nl); nl.connect(noiseGain);
      noise.start(); graphNoise = noise;
    } catch (e) {}

    const voiceGain = ctx.createGain();
    voiceGain.gain.value = cfg.voiceMix;
    const musicBus = ctx.createGain();
    musicBus.gain.value = cfg.musicMix;

    const post = ctx.createGain();
    master.connect(voiceGain);
    voiceGain.connect(post);
    noiseGain.connect(post);
    musicBus.connect(post);

    // Echo layers
    const echoDelays = [], echoGains = [];
    const echoBus = ctx.createGain();
    echoBus.gain.value = cfg.echoOn ? 1 : 0;
    for (let i = 0; i < 16; i++) {
      const d = ctx.createDelay(3.0);
      d.delayTime.value = cfg.echoDelay * (i + 1);
      const g = ctx.createGain();
      g.gain.value = (cfg.echoOn && i < cfg.echoLayers) ? (cfg.echoGain * Math.pow(0.92, i)) : 0;
      voiceGain.connect(d); d.connect(g); g.connect(echoBus);
      echoDelays.push(d); echoGains.push(g);
    }
    echoBus.connect(post);

    post.connect(dry); dry.connect(mix);
    post.connect(reverbIn); reverbIn.connect(reverbDelay); reverbDelay.connect(conv); conv.connect(wet); wet.connect(mix);

    mix.connect(limiter);
    limiter.connect(gate);

    // Counter: pan L/R/giữa + wider (2 tai)
    const counterIn = ctx.createGain();
    const counterPanNode = ctx.createStereoPanner();
    counterPanNode.pan.value = cfg.counterOn ? (cfg.counterPan || 0) : 0;
    const widerDelay = ctx.createDelay(0.05);
    widerDelay.delayTime.value = 0.012 + (cfg.counterWider || 0) * 0.018;
    const widerGain = ctx.createGain();
    widerGain.gain.value = cfg.counterOn ? (cfg.counterWider || 0) * 0.85 : 0;
    const widerInv = ctx.createGain();
    widerInv.gain.value = -1;
    const counterMerge = ctx.createChannelMerger(2);
    const counterOut = ctx.createGain();

    gate.connect(counterIn);
    // mono → 2 kênh
    counterIn.connect(counterMerge, 0, 0);
    counterIn.connect(counterMerge, 0, 1);
    // wider: trễ + pha ngược hai bên
    counterIn.connect(widerDelay);
    widerDelay.connect(widerGain);
    widerGain.connect(counterMerge, 0, 0);
    widerGain.connect(widerInv);
    widerInv.connect(counterMerge, 0, 1);
    counterMerge.connect(counterPanNode);
    counterPanNode.connect(counterOut);

    // Nghe mic: mình nghe + stream vẫn gửi đi (người khác vẫn nghe)
    const monitorGain = ctx.createGain();
    monitorGain.gain.value = cfg.monitorOn ? 0.9 : 0;
    counterOut.connect(monitorGain);
    try { monitorGain.connect(ctx.destination); } catch (e) {}

    counterOut.connect(analyser);
    analyser.connect(dest);

    // Music chain nodes
    const musicGainNode = ctx.createGain();
    musicGainNode.gain.value = cfg.musicGain;
    const musicBass = ctx.createBiquadFilter();
    musicBass.type = 'lowshelf'; musicBass.frequency.value = 120; musicBass.gain.value = cfg.musicBass;
    const musicFilters = [];
    for (let i = 0; i < 10; i++) {
      const f = ctx.createBiquadFilter();
      f.type = i === 0 ? 'lowshelf' : (i === 9 ? 'highshelf' : 'peaking');
      const mb = cfg.musicBands[i] || DEFAULT_MUSIC_BANDS[i];
      f.frequency.value = mb.freq; f.Q.value = 1; f.gain.value = mb.gain;
      musicFilters.push(f);
    }

    graph = {
      ctx, src, preamp, filters, master, limiter, gate, noiseGain, post,
      dry, wet, reverbIn, reverbDelay, conv, mix, analyser, dest,
      voiceGain, musicBus, musicGainNode, musicBass, musicFilters,
      echoDelays, echoGains, echoBus,
      counterIn, counterPanNode, widerDelay, widerGain, counterOut, monitorGain
    };

    if (music.src) connectMusicChain();
    applyCfg();
    startGateMeter();
    outStream = dest.stream;
    return dest.stream;
  }

  /** Live rebuild: đổi số band / cấu trúc mà không cần rời voice */
  function liveRebuild() {
    if (!rawStream) return false;
    try {
      const tracks = rawStream.getAudioTracks();
      if (!tracks.length || tracks[0].readyState === 'ended') return false;
      buildGraph(rawStream);
      return true;
    } catch (e) {
      console.warn('[EYB40] liveRebuild', e);
      return false;
    }
  }

  function applyCfg() {
    if (!graph || !audioCtx) return;
    const t = audioCtx.currentTime, ramp = 0.03, on = cfg.enabled;

    graph.preamp.gain.setTargetAtTime(dbToLin(on ? cfg.preamp : 0), t, ramp);
    graph.master.gain.setTargetAtTime(on ? cfg.masterGain : 1, t, ramp);

    try {
      graph.limiter.curve = (on && cfg.limiterOn) ? makeLimiterCurve(cfg.limiterCeil) : null;
    } catch (e) {}

    const n = Math.min(graph.filters.length, cfg.bands.length);
    for (let i = 0; i < n; i++) {
      const node = graph.filters[i], b = cfg.bands[i];
      if (!node || !b) continue;
      try { node.type = b.type; } catch (e) {}
      node.frequency.setTargetAtTime(b.freq, t, ramp);
      node.Q.setTargetAtTime(Math.max(0.0001, b.Q), t, ramp);
      if ('gain' in node) node.gain.setTargetAtTime(on && b.on ? b.gain : 0, t, ramp);
    }
    // nếu số band lệch → live rebuild
    if (graph.filters.length !== cfg.bands.length) {
      liveRebuild();
      return;
    }

    if (graph.dry && graph.wet) {
      const mixAmt = (on && cfg.reverbOn) ? cfg.reverbMix : 0;
      graph.dry.gain.setTargetAtTime(1 - mixAmt, t, ramp);
      graph.wet.gain.setTargetAtTime(mixAmt, t, ramp);
    }
    if (graph.reverbDelay) {
      const pd = Math.max(0, Math.min(2, Number(cfg.reverbPreDelay) || 0));
      graph.reverbDelay.delayTime.setTargetAtTime(pd, t, ramp);
    }
    if (graph.noiseGain) graph.noiseGain.gain.setTargetAtTime(on ? 0.01 : 0, t, ramp);
    if (graph.voiceGain) graph.voiceGain.gain.setTargetAtTime(on ? cfg.voiceMix : 1, t, ramp);
    if (graph.musicBus) graph.musicBus.gain.setTargetAtTime(on ? cfg.musicMix : 0, t, ramp);
    if (graph.musicGainNode) graph.musicGainNode.gain.setTargetAtTime(cfg.musicGain, t, ramp);
    if (graph.musicBass) graph.musicBass.gain.setTargetAtTime(cfg.musicBass, t, ramp);
    if (graph.musicFilters) {
      for (let i = 0; i < 10; i++) {
        const f = graph.musicFilters[i], b = cfg.musicBands[i];
        if (!f || !b) continue;
        f.frequency.setTargetAtTime(b.freq, t, ramp);
        f.gain.setTargetAtTime(b.gain, t, ramp);
      }
    }
    if (graph.echoBus && graph.echoDelays) {
      graph.echoBus.gain.setTargetAtTime(on && cfg.echoOn ? 1 : 0, t, ramp);
      const layers = Math.max(1, Math.min(16, cfg.echoLayers | 0));
      for (let i = 0; i < graph.echoDelays.length; i++) {
        graph.echoDelays[i].delayTime.setTargetAtTime(cfg.echoDelay * (i + 1), t, ramp);
        const g = (on && cfg.echoOn && i < layers) ? (cfg.echoGain * Math.pow(0.92, i)) : 0;
        graph.echoGains[i].gain.setTargetAtTime(g, t, ramp);
      }
    }
    // Counter
    if (graph.counterPanNode) {
      const pan = (on && cfg.counterOn) ? (Number(cfg.counterPan) || 0) : 0;
      graph.counterPanNode.pan.setTargetAtTime(Math.max(-1, Math.min(1, pan)), t, ramp);
    }
    if (graph.widerGain && graph.widerDelay) {
      const w = (on && cfg.counterOn) ? Math.max(0, Math.min(1, Number(cfg.counterWider) || 0)) : 0;
      graph.widerGain.gain.setTargetAtTime(w * 0.9, t, ramp);
      graph.widerDelay.delayTime.setTargetAtTime(0.01 + w * 0.022, t, ramp);
    }
    if (graph.monitorGain) {
      graph.monitorGain.gain.setTargetAtTime(cfg.monitorOn ? 0.9 : 0, t, ramp);
    }
  }

  function startGateMeter() {
    if (meterTimer) return;
    const data = new Uint8Array(256);
    meterTimer = setInterval(() => {
      if (!graph || !graph.analyser) return;
      graph.analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const v = (data[i] - 128) / 128; sum += v * v;
      }
      const rms = Math.sqrt(sum / data.length);
      const db = 20 * Math.log10(Math.max(1e-6, rms));

      // Gate
      if (graph.gate && cfg.enabled && cfg.gateOn) {
        const open = db > cfg.gateDb;
        const target = open ? 1 : 0.02;
        gateState = open ? 'open' : 'closed';
        graph.gate.gain.setTargetAtTime(target, audioCtx.currentTime, open ? 0.02 : 0.08);
      } else if (graph.gate) {
        graph.gate.gain.setTargetAtTime(1, audioCtx.currentTime, 0.03);
        gateState = 'open';
      }

      // VU UI
      if (window.__eyb40vu) {
        const pct = Math.min(100, Math.max(0, (db + 60) * 1.6));
        window.__eyb40vu.bar.style.width = pct + '%';
        window.__eyb40vu.bar.style.background = pct > 85 ? '#e74c3c' : (pct > 55 ? '#f39c12' : '#27ae60');
        window.__eyb40vu.lab.textContent = db.toFixed(1) + ' dB' + (cfg.gateOn ? (gateState === 'closed' ? ' | GATE' : '') : '');
      }
    }, 140);
  }

  function connectMusicChain() {
    if (!graph || !music.src) return;
    try {
      let last = music.src;
      last.connect(graph.musicGainNode); last = graph.musicGainNode;
      last.connect(graph.musicBass); last = graph.musicBass;
      graph.musicFilters.forEach(f => { last.connect(f); last = f; });
      last.connect(graph.musicBus);
    } catch (e) {}
  }

  function loadMusicFile(file) {
    if (!file) return;
    const ctx = ensureCtx();
    const url = URL.createObjectURL(file);
    if (music.el) try { music.el.pause(); } catch (e) {}
    const audio = new Audio(url);
    audio.loop = true; audio.crossOrigin = 'anonymous';
    music.el = audio;
    music.src = ctx.createMediaElementSource(audio);
    music.playing = false;
    if (graph) connectMusicChain();
    applyCfg();
  }

  function toggleMusic() {
    if (!music.el) return alert('Chọn file nhạc trước');
    ensureCtx();
    if (music.el.paused) {
      music.el.play().then(() => { music.playing = true; }).catch(e => alert('Không phát được: ' + e.message));
    } else {
      music.el.pause(); music.playing = false;
    }
  }

  // Hook GUM
  const origGUM = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
  navigator.mediaDevices.getUserMedia = async function (constraints) {
    const stream = await origGUM(constraints);
    try {
      if (constraints && constraints.audio) {
        const processed = buildGraph(stream);
        console.log(`[${PRODUCT}] Mic chain active (${cfg.bands.length} bands, live rebuild)`);
        return processed;
      }
    } catch (e) { console.error(`[${PRODUCT}]`, e); }
    return stream;
  };

  // ===== PRESETS (to & rõ hơn APO config tiền) =====
  const PRESETS = {
    'To Rõ': {
      preamp: 18, masterGain: 8, limiterOn: true, limiterCeil: 0.92,
      gateOn: false, reverbOn: false, echoOn: false,
      bands: [
        { on: true, type: 'highpass', freq: 50, gain: 0, Q: 0.7 },
        { on: true, type: 'lowshelf', freq: 100, gain: -3, Q: 0.7 },
        { on: true, type: 'peaking', freq: 200, gain: -1, Q: 1.2 },
        { on: true, type: 'peaking', freq: 800, gain: 2.5, Q: 1.1 },
        { on: true, type: 'peaking', freq: 1500, gain: 5, Q: 1.2 },
        { on: true, type: 'peaking', freq: 2500, gain: 6.5, Q: 1.3 },
        { on: true, type: 'peaking', freq: 4000, gain: 4.5, Q: 1.1 },
        { on: true, type: 'peaking', freq: 7000, gain: 2.5, Q: 1.0 },
        { on: true, type: 'highshelf', freq: 12000, gain: 1, Q: 0.7 }
      ]
    },
    'Siêu To': {
      preamp: 42, masterGain: 20, limiterOn: true, limiterCeil: 0.98,
      gateOn: false, reverbOn: false, echoOn: false,
      bands: JSON.parse(JSON.stringify(DEFAULT_BANDS)).map((b, i) => {
        const boosts = [0, -2, -1, 1.5, 3, 6, 7.5, 6, 4, 2.5, 1];
        return Object.assign({}, b, { gain: boosts[i] != null ? boosts[i] : b.gain });
      })
    },
    'Vang Dày': {
      preamp: 28, masterGain: 12, limiterOn: true, limiterCeil: 0.95,
      reverbOn: true, reverbMix: 0.4, reverbDecay: 2.0, reverbSize: 2.5,
      echoOn: false
    },
    'Echo 8 lớp': {
      preamp: 30, masterGain: 14, limiterOn: true, limiterCeil: 0.95,
      echoOn: true, echoLayers: 8, echoDelay: 0.4, echoGain: 1.5,
      reverbOn: false
    },
    'Livestream': {
      preamp: 22, masterGain: 10, limiterOn: true, limiterCeil: 0.9,
      gateOn: true, gateDb: -46,
      reverbOn: true, reverbMix: 0.15, reverbDecay: 0.6, reverbSize: 0.9,
      echoOn: false
    },
    'loud🍉': {
      preamp: 48, masterGain: 24, limiterOn: true, limiterCeil: 0.99,
      gateOn: false,
      reverbOn: true, reverbMix: 0.22, reverbDecay: 1.2, reverbSize: 1.5,
      echoOn: true, echoLayers: 4, echoDelay: 0.3, echoGain: 1.8,
      bands: [
        { on: true, type: 'highpass', freq: 40, gain: 0, Q: 0.7 },
        { on: true, type: 'lowshelf', freq: 80, gain: -4, Q: 0.7 },
        { on: true, type: 'peaking', freq: 150, gain: -3, Q: 1.3 },
        { on: true, type: 'peaking', freq: 400, gain: 2, Q: 1.0 },
        { on: true, type: 'peaking', freq: 1000, gain: 4, Q: 1.1 },
        { on: true, type: 'peaking', freq: 1800, gain: 7, Q: 1.3 },
        { on: true, type: 'peaking', freq: 2800, gain: 8, Q: 1.3 },
        { on: true, type: 'peaking', freq: 4500, gain: 5.5, Q: 1.1 },
        { on: true, type: 'peaking', freq: 8000, gain: 3, Q: 0.9 },
        { on: true, type: 'highshelf', freq: 13000, gain: 1.5, Q: 0.7 }
      ]
    }
  };

  function applyPreset(name) {
    const p = PRESETS[name];
    if (!p) return;
    Object.keys(p).forEach(k => {
      if (k === 'bands') cfg.bands = JSON.parse(JSON.stringify(p.bands));
      else cfg[k] = p[k];
    });
    cfg.enabled = true;
    saveCfg();
    if (!liveRebuild()) applyCfg();
  }

  // ===== UI =====
  const CSS = `
  :host { all: initial; }
  #eyb-root, #eyb-root * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, sans-serif; user-select: none; }
  #eyb-fab {
    position: fixed; right: 18px; bottom: 18px; width: 72px; height: 72px;
    background: linear-gradient(135deg, #1a0a2e, #0d1b4a); border: 2px solid #5b2d9e;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center; cursor: pointer; color: #c4b5fd; font-size: 32px;
    box-shadow: 0 0 16px rgba(91,45,158,.55), 0 0 4px rgba(30,64,175,.8); z-index: 2147483647; touch-action: none;
  }
  #eyb-fab:hover { transform: scale(1.08); border-color: #7c3aed; }
  #eyb-fab.off { background: linear-gradient(135deg, #333, #222); border-color: #555; color: #888; }
  #eyb-panel {
    position: fixed; top: 4px; left: 50%; transform: translateX(-50%);
    width: min(1600px, calc(100vw - 4px)); max-height: calc(100vh - 8px);
    background-color: #050508;
    background-image:
      radial-gradient(1.5px 1.5px at 8% 12%, #fff, transparent),
      radial-gradient(1px 1px at 22% 40%, rgba(255,255,255,.9), transparent),
      radial-gradient(1.5px 1.5px at 45% 18%, #fff, transparent),
      radial-gradient(1px 1px at 60% 55%, rgba(255,255,255,.85), transparent),
      radial-gradient(1.5px 1.5px at 78% 28%, #fff, transparent),
      radial-gradient(1px 1px at 92% 70%, rgba(255,255,255,.8), transparent),
      radial-gradient(1px 1px at 15% 78%, rgba(255,255,255,.75), transparent),
      radial-gradient(1.5px 1.5px at 35% 88%, #fff, transparent),
      radial-gradient(1px 1px at 68% 8%, rgba(255,255,255,.9), transparent),
      radial-gradient(1px 1px at 85% 45%, rgba(255,255,255,.7), transparent),
      radial-gradient(2px 2px at 50% 50%, rgba(255,255,255,.5), transparent),
      radial-gradient(ellipse 80% 50% at 30% 40%, rgba(80,60,120,.25), transparent),
      radial-gradient(ellipse 60% 40% at 70% 60%, rgba(40,50,100,.2), transparent);
    border: 2px solid #3b1d7a; border-radius: 12px;
    box-shadow: 0 12px 40px rgba(0,0,0,.65), 0 0 0 1px rgba(91,45,158,.35); z-index: 2147483646;
    display: flex; flex-direction: column; overflow: hidden;
    color: #e8e4f5;
  }
  #eyb-panel.hidden { display: none; }
  .eyb-header {
    background: linear-gradient(90deg, #1a0a2e, #0d1b4a 50%, #2e1065); color: #e9d5ff; padding: 14px 18px;
    display: flex; align-items: center; justify-content: space-between; font-weight: 700; font-size: 20px;
    border-bottom: 1px solid #5b2d9e;
  }
  .eyb-header .close {
    width: 36px; height: 36px; border-radius: 8px; background: rgba(91,45,158,.35);
    border: 1px solid #5b2d9e; color: #ddd6fe;
    display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 20px;
  }
  .eyb-tabs { display: flex; gap: 14px; padding: 10px 14px 0; background: rgba(10,8,20,.75); flex-wrap: wrap; border-bottom: 1px solid #3b1d7a; }
  .eyb-tab {
    padding: 10px 20px; border-radius: 10px 10px 0 0; font-size: 16px; font-weight: 700;
    color: #a5b4fc; cursor: pointer; background: transparent; border: 1px solid transparent;
    letter-spacing: 0.06em; margin-right: 4px;
  }
  .eyb-tab.on { background: rgba(30,20,60,.85); color: #c4b5fd; border-color: #5b2d9e; border-bottom-color: transparent; box-shadow: 0 -2px 0 #7c3aed inset; }
  .eyb-body { padding: 16px 18px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 14px; background: transparent; }
  .eyb-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .eyb-label { font-size: 16px; font-weight: 700; color: #c7d2fe; min-width: 110px; }
  .eyb-switch {
    width: 52px; height: 30px; border-radius: 15px; background: #2a2540; border: 1px solid #5b2d9e; position: relative; cursor: pointer; transition: .2s;
  }
  .eyb-switch.on { background: linear-gradient(90deg, #1e3a8a, #6d28d9); border-color: #7c3aed; }
  .eyb-switch.on::after { left: 26px; }
  .eyb-switch::after {
    content: ''; position: absolute; top: 3px; left: 3px; width: 22px; height: 22px;
    border-radius: 50%; background: #e9d5ff; transition: .2s;
  }
  input[type=range] { flex: 1; accent-color: #7c3aed; min-width: 120px; height: 28px; }
  input[type=number], select {
    padding: 8px 10px; border: 1px solid #5b2d9e; border-radius: 8px; font-size: 16px;
    background: rgba(15,12,30,.85); color: #e9d5ff;
  }
  .eyb-btn {
    padding: 10px 16px; border-radius: 8px;
    border: 2px solid #1e3a8a; background: linear-gradient(135deg, rgba(15,23,50,.9), rgba(45,20,80,.9));
    color: #ddd6fe; font-size: 16px; font-weight: 700; cursor: pointer;
    box-shadow: 0 0 0 1px #6d28d9, inset 0 0 12px rgba(91,45,158,.25);
  }
  .eyb-btn:hover { border-color: #7c3aed; color: #fff; background: linear-gradient(135deg, rgba(30,40,90,.95), rgba(70,30,120,.95)); }
  .eyb-btn.secondary {
    background: rgba(12,10,28,.8); color: #c4b5fd;
    border: 2px solid #1e3a8a; box-shadow: 0 0 0 1px #6d28d9;
  }
  .eyb-btn.danger { background: rgba(80,20,30,.85); border-color: #7f1d1d; color: #fecaca; box-shadow: 0 0 0 1px #a21caf; }
  .eyb-btn.fire { background: linear-gradient(135deg, #6d28d9, #1e3a8a); border-color: #7c3aed; }
  .eyb-section { font-size: 18px; font-weight: 800; color: #ddd6fe; border-bottom: 2px solid #5b2d9e; padding-bottom: 6px; margin-top: 4px; }
  .eyb-note {
    font-size: 15px; color: #c4b5fd; background: rgba(20,15,40,.75); border-left: 4px solid #7c3aed;
    border: 1px solid #3b1d7a; border-left-width: 4px; padding: 10px 12px; border-radius: 6px; line-height: 1.45;
  }
  .band-table { width: 100%; border-collapse: collapse; font-size: 15px; }
  .band-table th { background: rgba(30,20,60,.9); color: #c4b5fd; padding: 10px 6px; text-align: center; font-size: 15px; border-bottom: 1px solid #5b2d9e; }
  .band-table td { padding: 8px 4px; text-align: center; border-bottom: 1px solid #2e1065; background: rgba(10,8,22,.7); color: #e8e4f5; }
  .band-table input[type=number] { width: 80px; text-align: center; font-size: 15px; }
  .band-table select { width: 110px; font-size: 15px; }
  .band-on { width: 22px; height: 22px; border-radius: 5px; border: 2px solid #5b2d9e; display: inline-block; cursor: pointer; vertical-align: middle; }
  .band-on.on { background: linear-gradient(135deg, #1e3a8a, #7c3aed); border-color: #7c3aed; }
  .geq-wrap { display: flex; gap: 8px; justify-content: space-between; padding: 12px 6px; overflow-x: auto;
    background: rgba(10,8,22,.75); border: 1px solid #5b2d9e; border-radius: 8px; }
  .geq-band { display: flex; flex-direction: column; align-items: center; min-width: 42px; flex: 1; }
  .geq-band label { font-size: 13px; color: #c4b5fd; font-weight: 700; margin-bottom: 6px; }
  .geq-band input[type=range] { writing-mode: bt-lr; -webkit-appearance: slider-vertical; appearance: slider-vertical; width: 26px; height: 130px; accent-color: #7c3aed; }
  .geq-band .geq-val { font-size: 13px; font-weight: 700; color: #a5b4fc; margin-top: 6px; font-family: Consolas, monospace; }
  .meter-bg { flex: 1; height: 18px; background: rgba(30,25,50,.9); border-radius: 9px; overflow: hidden; min-width: 100px; border: 1px solid #3b1d7a; }
  .meter-bar { height: 100%; width: 0%; background: linear-gradient(90deg, #1e3a8a, #7c3aed); transition: width .08s; }
  .preset-grid { display: flex; flex-wrap: wrap; gap: 10px; }
  .tab-pane { display: none; flex-direction: column; gap: 14px; }
  .tab-pane.on { display: flex; }
  `;

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === 'class') node.className = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
      else node.setAttribute(k, v);
    }
    children.forEach(c => { if (c != null) node.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(c) : c); });
    return node;
  }

  function buildUI() {
    if (document.getElementById('eyb40-host')) return;
    const host = document.createElement('div');
    host.id = 'eyb40-host';
    host.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;z-index:2147483647;';
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.appendChild(Object.assign(document.createElement('style'), { textContent: CSS }));
    const root = el('div', { id: 'eyb-root' });

    const fab = el('div', { id: 'eyb-fab', title: PRODUCT }, '🎚');
    if (!cfg.enabled) fab.classList.add('off');
    if (cfg.fx != null && cfg.fy != null) {
      fab.style.right = 'auto'; fab.style.bottom = 'auto';
      fab.style.left = cfg.fx + 'px'; fab.style.top = cfg.fy + 'px';
    }

    const panel = el('div', { id: 'eyb-panel', class: cfg.open ? '' : 'hidden' });
    const header = el('div', { class: 'eyb-header' },
      el('span', {}, '🎚 ' + PRODUCT + '  ·  Menu TO'),
      el('div', { class: 'close' }, '✕')
    );
    header.querySelector('.close').addEventListener('click', () => {
      cfg.open = false; panel.classList.add('hidden'); saveCfg();
    });

    const tabs = el('div', { class: 'eyb-tabs' });
    const tabNames = [
      ['eq', 'EQ + Gain'],
      ['fx', 'Vang / Echo'],
      ['counter', 'Counter'],
      ['music', 'Nhạc'],
      ['cfg', 'Config / Preset']
    ];
    const panes = {};
    tabNames.forEach(([id, label]) => {
      const t = el('button', { class: 'eyb-tab' + (cfg.tab === id ? ' on' : '') }, label);
      t.addEventListener('click', () => {
        cfg.tab = id; saveCfg();
        tabNames.forEach(([tid]) => {
          tabs.querySelectorAll('.eyb-tab')[[...tabs.children].findIndex((_, i) => tabNames[i][0] === tid)]?.classList.toggle('on', tid === id);
        });
        Object.keys(panes).forEach(k => panes[k].classList.toggle('on', k === id));
        // simpler:
        [...tabs.children].forEach((el, i) => el.classList.toggle('on', tabNames[i][0] === id));
        Object.keys(panes).forEach(k => panes[k].classList.toggle('on', k === id));
      });
      tabs.appendChild(t);
    });

    const body = el('div', { class: 'eyb-body' });
    tabNames.forEach(([id]) => {
      panes[id] = el('div', { class: 'tab-pane' + (cfg.tab === id ? ' on' : '') });
      body.appendChild(panes[id]);
    });

    // ---- helpers ----
    const uiSyncers = [];
    function syncAllUI() {
      uiSyncers.forEach(fn => { try { fn(); } catch (e) {} });
      if (fab) fab.classList.toggle('off', !cfg.enabled);
    }
    function mkSwitch(label, key, onChange) {
      const row = el('div', { class: 'eyb-row' });
      const sw = el('div', { class: 'eyb-switch' + (cfg[key] ? ' on' : '') });
      const st = el('span', { style: 'font-size:12px;font-weight:700;color:' + (cfg[key] ? '#16a34a' : '#999') }, cfg[key] ? 'ON' : 'OFF');
      const paint = () => {
        sw.classList.toggle('on', !!cfg[key]);
        st.textContent = cfg[key] ? 'ON' : 'OFF';
        st.style.color = cfg[key] ? '#16a34a' : '#999';
      };
      sw.addEventListener('click', () => {
        cfg[key] = !cfg[key];
        paint();
        if (key === 'enabled') fab.classList.toggle('off', !cfg.enabled);
        applyCfg(); saveCfg();
        if (onChange) onChange();
      });
      row.append(sw, el('span', { class: 'eyb-label' }, label), st);
      uiSyncers.push(paint);
      return row;
    }
    function mkSlider(parent, label, key, min, max, step, fmt) {
      const row = el('div', { class: 'eyb-row' });
      const slider = el('input', { type: 'range', min, max, step, value: cfg[key] });
      const val = el('span', { style: 'min-width:52px;font-weight:700;color:#0078d4;' }, fmt(cfg[key]));
      slider.addEventListener('input', () => {
        cfg[key] = Number(slider.value);
        val.textContent = fmt(cfg[key]);
        applyCfg(); saveCfg();
      });
      row.append(el('span', { class: 'eyb-label' }, label), slider, val);
      parent.appendChild(row);
      const handle = { slider, val, sync() { slider.value = cfg[key]; val.textContent = fmt(cfg[key]); } };
      uiSyncers.push(() => handle.sync());
      return handle;
    }

    // ========== TAB EQ ==========
    const pEQ = panes.eq;
    pEQ.appendChild(mkSwitch('Enable EQ', 'enabled'));

    // VU
    pEQ.appendChild(el('div', { class: 'eyb-section' }, '📊 VU Meter'));
    const vuRow = el('div', { class: 'eyb-row' });
    const vuBg = el('div', { class: 'meter-bg' });
    const vuBar = el('div', { class: 'meter-bar' });
    vuBg.appendChild(vuBar);
    const vuLab = el('span', { style: 'min-width:90px;font-weight:700;color:#0078d4;font-family:Consolas,monospace;' }, '-- dB');
    vuRow.append(el('span', { class: 'eyb-label' }, 'Level'), vuBg, vuLab);
    pEQ.appendChild(vuRow);
    window.__eyb40vu = { bar: vuBar, lab: vuLab };

    mkSlider(pEQ, 'Preamp', 'preamp', -12, 130, 0.5, v => v.toFixed(1) + ' dB');
    mkSlider(pEQ, 'Master', 'masterGain', 0, 130, 0.1, v => v.toFixed(2) + '×');

    pEQ.appendChild(el('div', { class: 'eyb-section' }, '🛡 Limiter + Gate'));
    pEQ.appendChild(mkSwitch('Limiter (chống nổ)', 'limiterOn'));
    mkSlider(pEQ, 'Limiter ceil', 'limiterCeil', 0.5, 1, 0.01, v => v.toFixed(2));
    pEQ.appendChild(mkSwitch('Noise Gate', 'gateOn'));
    mkSlider(pEQ, 'Ngưỡng Gate', 'gateDb', -70, -25, 1, v => v.toFixed(0) + ' dB');

    pEQ.appendChild(el('div', { class: 'eyb-section' }, '🎚 Band Equaliser'));
    const table = el('table', { class: 'band-table' });
    table.appendChild(el('thead', {}, el('tr', {},
      el('th', {}, '#'), el('th', {}, 'ON'), el('th', {}, 'Type'),
      el('th', {}, 'Fc'), el('th', {}, 'Gain'), el('th', {}, 'Q'), el('th', {}, '')
    )));
    const bandBody = el('tbody');
    table.appendChild(bandBody);
    pEQ.appendChild(table);

    function rebuildBandTable() {
      bandBody.innerHTML = '';
      cfg.bands.forEach((b, i) => {
        const tr = el('tr');
        const onBox = el('div', { class: 'band-on' + (b.on ? ' on' : '') });
        onBox.addEventListener('click', () => { b.on = !b.on; onBox.classList.toggle('on', b.on); applyCfg(); saveCfg(); });
        const typeSel = el('select');
        FILTER_TYPES.forEach(t => { const o = el('option', { value: t }, t); if (t === b.type) o.selected = true; typeSel.appendChild(o); });
        typeSel.addEventListener('change', () => { b.type = typeSel.value; applyCfg(); saveCfg(); });
        const freqInp = el('input', { type: 'number', value: b.freq, min: 20, max: 20000, step: 1 });
        freqInp.addEventListener('change', () => { b.freq = Math.max(20, Math.min(20000, Number(freqInp.value) || 1000)); applyCfg(); saveCfg(); });
        const gainInp = el('input', { type: 'number', value: b.gain, min: -30, max: 30, step: 0.5 });
        gainInp.addEventListener('change', () => { b.gain = Number(gainInp.value) || 0; applyCfg(); saveCfg(); rebuildGraphic(); });
        const qInp = el('input', { type: 'number', value: b.Q, min: 0.1, max: 20, step: 0.1 });
        qInp.addEventListener('change', () => { b.Q = Number(qInp.value) || 1; applyCfg(); saveCfg(); });
        const del = el('button', { class: 'eyb-btn danger', style: 'padding:2px 8px;font-size:12px;' }, '✕');
        del.addEventListener('click', () => {
          if (cfg.bands.length <= 1) return alert('Cần ≥ 1 band');
          cfg.bands.splice(i, 1); saveCfg();
          rebuildBandTable(); rebuildGraphic();
          liveRebuild() || applyCfg();
        });
        tr.append(el('td', {}, String(i + 1)), el('td', {}, onBox), el('td', {}, typeSel),
          el('td', {}, freqInp), el('td', {}, gainInp), el('td', {}, qInp), el('td', {}, del));
        bandBody.appendChild(tr);
      });
    }
    rebuildBandTable();

    const bandAct = el('div', { class: 'eyb-row' });
    const btnAdd = el('button', { class: 'eyb-btn' }, '➕ Add Band');
    btnAdd.addEventListener('click', () => {
      const last = cfg.bands[cfg.bands.length - 1] || { freq: 1000 };
      cfg.bands.push({ on: true, type: 'peaking', freq: Math.min(20000, Math.round((last.freq || 1000) * 1.6)), gain: 0, Q: 1 });
      saveCfg(); rebuildBandTable(); rebuildGraphic();
      liveRebuild() || applyCfg();
    });
    const btnFlat = el('button', { class: 'eyb-btn secondary' }, 'Flat');
    btnFlat.addEventListener('click', () => { cfg.bands.forEach(b => b.gain = 0); saveCfg(); rebuildBandTable(); rebuildGraphic(); applyCfg(); });
    bandAct.append(btnAdd, btnFlat);
    pEQ.appendChild(bandAct);

    pEQ.appendChild(el('div', { class: 'eyb-section' }, '📊 Graphic EQ'));
    const geqWrap = el('div', { class: 'geq-wrap' });
    pEQ.appendChild(geqWrap);
    function rebuildGraphic() {
      geqWrap.innerHTML = '';
      cfg.bands.forEach(b => {
        const col = el('div', { class: 'geq-band' });
        const lab = el('label', {}, b.freq >= 1000 ? (b.freq / 1000).toFixed(b.freq >= 10000 ? 0 : 1) + 'k' : String(Math.round(b.freq)));
        const slider = el('input', { type: 'range', min: -18, max: 50, step: 0.5, value: b.gain });
        slider.setAttribute('orient', 'vertical');
        const val = el('div', { class: 'geq-val' }, (b.gain >= 0 ? '+' : '') + b.gain.toFixed(1));
        slider.addEventListener('input', () => {
          b.gain = Number(slider.value);
          val.textContent = (b.gain >= 0 ? '+' : '') + b.gain.toFixed(1);
          applyCfg();
        });
        slider.addEventListener('change', () => { saveCfg(); rebuildBandTable(); });
        col.append(lab, slider, val); geqWrap.appendChild(col);
      });
    }
    rebuildGraphic();
    pEQ.appendChild(el('div', { class: 'eyb-note' }, 'Live rebuild: thêm/xóa band áp ngay, không cần rời voice.'));

    // ========== TAB FX ==========
    const pFX = panes.fx;
    pFX.appendChild(el('div', { class: 'eyb-section' }, '🌊 Reverb / Vang'));
    pFX.appendChild(mkSwitch('Bật Vang', 'reverbOn'));
    mkSlider(pFX, 'Mix', 'reverbMix', 0, 0.8, 0.01, v => Math.round(v * 100) + '%');
    const decS = mkSlider(pFX, 'Decay', 'reverbDecay', 0.2, 3.5, 0.05, v => v.toFixed(2));
    const sizeS = mkSlider(pFX, 'Size', 'reverbSize', 0.3, 4.0, 0.05, v => v.toFixed(2));
    // regen IR on decay/size change
    [decS, sizeS].forEach(s => {
      s.slider.addEventListener('change', () => {
        if (graph && graph.conv) {
          try { graph.conv.buffer = makeIR(graph.ctx, 0.3 + cfg.reverbSize * 0.9, cfg.reverbDecay); } catch (e) {}
        }
      });
    });

    pFX.appendChild(el('div', { class: 'eyb-section' }, '🔁 Echo nhiều lớp'));
    pFX.appendChild(mkSwitch('Bật Echo', 'echoOn'));
    mkSlider(pFX, 'Số lớp', 'echoLayers', 1, 16, 1, v => Math.round(v) + ' lớp');
    mkSlider(pFX, 'Trễ mỗi lớp', 'echoDelay', 0.0, 1.0, 0.05, v => v.toFixed(2) + 's');
    mkSlider(pFX, 'Gain lớp', 'echoGain', 0.2, 4.5, 0.05, v => v.toFixed(2) + '×');
    const echoPresets = el('div', { class: 'eyb-row' });
    [
      { n: '3 lớp 0.4s', l: 3, d: 0.4, g: 1.2 },
      { n: '5 lớp dày', l: 5, d: 0.4, g: 1.4 },
      { n: '8 lớp MAX', l: 8, d: 0.35, g: 1.6 }
    ].forEach(p => {
      const b = el('button', { class: 'eyb-btn secondary' }, p.n);
      b.addEventListener('click', () => {
        cfg.echoOn = true; cfg.echoLayers = p.l; cfg.echoDelay = p.d; cfg.echoGain = p.g;
        saveCfg(); applyCfg(); syncAllUI(); alert('Đã áp: ' + p.n);
      });
      echoPresets.appendChild(b);
    });
    pFX.appendChild(echoPresets);
    pFX.appendChild(el('div', { class: 'eyb-note' }, 'Echo xếp lớp = nhiều bản giọng trễ → nghe như nhiều người, vừa to vừa dày.'));

    // ========== Vang nổ (khung chỉnh) ==========
    pFX.appendChild(el('div', { class: 'eyb-section' }, '💥 Vang nổ'));
    pFX.appendChild(el('div', { class: 'eyb-note' }, 'Chỉnh 4 thông số bên dưới. Bật Vang + Echo tự động khi kéo.'));
    const enableVangNo = () => {
      cfg.reverbOn = true;
      cfg.echoOn = true;
      if (cfg.echoLayers < 7) cfg.echoLayers = 7;
      if (cfg.reverbSize < 3.0) cfg.reverbSize = 3.5;
      if (cfg.reverbDecay < 2.0) cfg.reverbDecay = 2.8;
      if (cfg.echoGain < 1.8) cfg.echoGain = 2.2;
    };
    // Độ nổ to → echoGain
    const noTo = mkSlider(pFX, 'Độ nổ to', 'echoGain', 0.2, 4.5, 0.05, v => v.toFixed(2) + '×');
    noTo.slider.addEventListener('input', () => { enableVangNo(); saveCfg(); applyCfg(); syncAllUI(); });
    // Độ vang dài → reverbDecay
    const vangDai = mkSlider(pFX, 'Độ vang dài', 'reverbDecay', 0.2, 3.5, 0.05, v => v.toFixed(2));
    vangDai.slider.addEventListener('input', () => { enableVangNo(); saveCfg(); applyCfg(); });
    vangDai.slider.addEventListener('change', () => {
      enableVangNo();
      if (graph && graph.conv) {
        try { graph.conv.buffer = makeIR(graph.ctx, 0.3 + cfg.reverbSize * 0.9, cfg.reverbDecay); } catch (e) {}
      }
      saveCfg(); applyCfg(); syncAllUI();
    });
    // Độ trễ của vang → pre-delay vang (sau giọng), không phải echo
    const treVang = mkSlider(pFX, 'Độ trễ của vang', 'reverbPreDelay', 0.0, 1.0, 0.05, v => v.toFixed(2) + 's');
    treVang.slider.addEventListener('input', () => { enableVangNo(); saveCfg(); applyCfg(); syncAllUI(); });
    // Độ rõ giọng → voiceMix
    const roGong = mkSlider(pFX, 'Độ rõ giọng', 'voiceMix', 0.5, 2.0, 0.05, v => v.toFixed(2) + '×');
    roGong.slider.addEventListener('input', () => { enableVangNo(); saveCfg(); applyCfg(); syncAllUI(); });

    // ========== TAB COUNTER ==========
    const pCT = panes.counter;
    pCT.appendChild(el('div', { class: 'eyb-section' }, '🎧 Counter'));
    pCT.appendChild(el('div', { class: 'eyb-note' },
      'Ý nghĩa: đè đối thủ bằng cách chỉnh giọng qua tai TRÁI / PHẢI / GIỮA / 2 TAI.\n' +
      'Cách counter: đối thủ chuyển luồng tai phải → mình qua tai trái (và ngược lại).\n' +
      '2 tai = khó bị đè hơn. Tai giữa có thể chống lại 2 tai nếu dùng đúng.'
    ));
    pCT.appendChild(mkSwitch('Bật Counter', 'counterOn'));
    pCT.appendChild(mkSwitch('Nghe mic', 'monitorOn'));
    pCT.appendChild(el('div', { class: 'eyb-note' },
      'Nghe mic: bật để TỰ nghe mic của mình (sidetone). Người khác trong call vẫn nghe bình thường.'
    ));
    mkSlider(pCT, 'Pan (Trái ← → Phải)', 'counterPan', -1, 1, 0.05, v => {
      if (Math.abs(v) < 0.05) return 'Giữa';
      return (v < 0 ? 'Trái ' : 'Phải ') + Math.abs(v * 100).toFixed(0) + '%';
    });
    mkSlider(pCT, 'Wider / 2 tai', 'counterWider', 0, 1, 0.05, v => Math.round(v * 100) + '%');
    pCT.appendChild(el('div', { class: 'eyb-section' }, 'Cách counter nhanh'));
    const ctQuick = el('div', { class: 'eyb-row', style: 'flex-wrap:wrap;gap:8px;' });
    [
      { n: 'Tai trái', pan: -0.9, w: 0.2 },
      { n: 'Tai phải', pan: 0.9, w: 0.2 },
      { n: 'Tai giữa', pan: 0, w: 0.12 },
      { n: '2 tai (chống đè)', pan: 0, w: 0.92 },
      { n: 'Đè khi địch bên phải', pan: -0.85, w: 0.35 },
      { n: 'Đè khi địch bên trái', pan: 0.85, w: 0.35 }
    ].forEach(p => {
      const b = el('button', { class: 'eyb-btn secondary' }, p.n);
      b.addEventListener('click', () => {
        cfg.counterOn = true;
        cfg.counterPan = p.pan;
        cfg.counterWider = p.w;
        saveCfg(); applyCfg(); syncAllUI();
      });
      ctQuick.appendChild(b);
    });
    pCT.appendChild(ctQuick);
    pCT.appendChild(el('div', { class: 'eyb-note' },
      'Wider ≈ plugin wider (giọng rộng 2 tai). Pan ≈ chuyển luồng trái/phải.\n' +
      'Gợi ý: tai nghe stereo để chỉnh chuẩn hướng counter.'
    ));

    // ========== TAB MUSIC ==========
    const pM = panes.music;
    pM.appendChild(el('div', { class: 'eyb-section' }, '🎵 Xả nhạc (file)'));
    const mRow = el('div', { class: 'eyb-row' });
    const mFile = el('input', { type: 'file', accept: 'audio/*,.mp3,.wav,.ogg,.m4a', style: 'font-size:12px;max-width:220px;' });
    const mName = el('span', { style: 'font-size:12px;color:#555;' }, 'Chưa chọn');
    mFile.addEventListener('change', () => {
      const f = mFile.files && mFile.files[0]; if (!f) return;
      loadMusicFile(f); mName.textContent = f.name.slice(0, 28) + (f.name.length > 28 ? '…' : '');
    });
    mRow.append(mFile, mName); pM.appendChild(mRow);
    const playRow = el('div', { class: 'eyb-row' });
    const btnPlay = el('button', { class: 'eyb-btn' }, '▶ Play / Pause');
    btnPlay.addEventListener('click', () => {
      toggleMusic();
      btnPlay.textContent = (music.el && !music.el.paused) ? '⏸ Pause' : '▶ Play / Pause';
    });
    const btnMStop = el('button', { class: 'eyb-btn secondary' }, '⏹ Stop');
    btnMStop.addEventListener('click', () => {
      if (music.el) { music.el.pause(); music.el.currentTime = 0; music.playing = false; }
      btnPlay.textContent = '▶ Play / Pause';
    });
    playRow.append(btnPlay, btnMStop); pM.appendChild(playRow);
    mkSlider(pM, 'Gain nhạc', 'musicGain', 0, 4, 0.05, v => v.toFixed(2) + '×');
    mkSlider(pM, 'Giọng', 'voiceMix', 0, 2, 0.05, v => v.toFixed(2) + '×');
    mkSlider(pM, 'Nhạc', 'musicMix', 0, 2, 0.05, v => v.toFixed(2) + '×');
    mkSlider(pM, 'Bass nhạc', 'musicBass', -12, 12, 0.5, v => (v >= 0 ? '+' : '') + v.toFixed(1) + ' dB');

    pM.appendChild(el('div', { class: 'eyb-section' }, '🎚 EQ 10-band nhạc'));
    const meq = el('div', { class: 'geq-wrap' });
    pM.appendChild(meq);
    function rebuildMusicEQ() {
      meq.innerHTML = '';
      cfg.musicBands.forEach(b => {
        const col = el('div', { class: 'geq-band' });
        const lab = el('label', {}, b.freq >= 1000 ? (b.freq / 1000).toFixed(b.freq >= 10000 ? 0 : 1) + 'k' : String(b.freq));
        const slider = el('input', { type: 'range', min: -12, max: 12, step: 0.5, value: b.gain });
        slider.setAttribute('orient', 'vertical');
        const val = el('div', { class: 'geq-val' }, (b.gain >= 0 ? '+' : '') + b.gain.toFixed(1));
        slider.addEventListener('input', () => { b.gain = Number(slider.value); val.textContent = (b.gain >= 0 ? '+' : '') + b.gain.toFixed(1); applyCfg(); });
        slider.addEventListener('change', () => saveCfg());
        col.append(lab, slider, val); meq.appendChild(col);
      });
    }
    rebuildMusicEQ();

    // ========== TAB CONFIG ==========
    const pC = panes.cfg;
    pC.appendChild(el('div', { class: 'eyb-section' }, '⚡ Preset 1 chạm (to hơn APO config tiền)'));
    const pg = el('div', { class: 'preset-grid' });
    Object.keys(PRESETS).forEach(name => {
      const b = el('button', { class: 'eyb-btn' + (name.includes('loud') || name.includes('Siêu') ? ' fire' : '') }, name);
      b.addEventListener('click', () => {
        applyPreset(name);
        rebuildBandTable(); rebuildGraphic(); rebuildMusicEQ();
        syncAllUI();
        alert('Đã áp preset: ' + name);
      });
      pg.appendChild(b);
    });
    pC.appendChild(pg);

    pC.appendChild(el('div', { class: 'eyb-section' }, '💾 Config Manager'));
    const bar = el('div', { class: 'eyb-row' });
    const sel = el('select', { style: 'min-width:160px;' });
    function refreshSel() {
      sel.innerHTML = '';
      sel.appendChild(el('option', { value: '' }, '-- Chọn config --'));
      profiles.forEach((p, i) => sel.appendChild(el('option', { value: String(i) }, p.name)));
    }
    refreshSel();
    const btnSave = el('button', { class: 'eyb-btn' }, '➕ Add Config');
    btnSave.addEventListener('click', () => {
      const name = prompt('Tên config:', 'Config ' + (profiles.length + 1));
      if (!name) return;
      const snap = {
        name, preamp: cfg.preamp, masterGain: cfg.masterGain,
        limiterOn: cfg.limiterOn, limiterCeil: cfg.limiterCeil,
        gateOn: cfg.gateOn, gateDb: cfg.gateDb,
        reverbOn: cfg.reverbOn, reverbMix: cfg.reverbMix, reverbDecay: cfg.reverbDecay, reverbSize: cfg.reverbSize, reverbPreDelay: cfg.reverbPreDelay,
        echoOn: cfg.echoOn, echoLayers: cfg.echoLayers, echoDelay: cfg.echoDelay, echoGain: cfg.echoGain,
        counterOn: cfg.counterOn, counterPan: cfg.counterPan, counterWider: cfg.counterWider, monitorOn: cfg.monitorOn,
        musicGain: cfg.musicGain, voiceMix: cfg.voiceMix, musicMix: cfg.musicMix, musicBass: cfg.musicBass,
        musicBands: JSON.parse(JSON.stringify(cfg.musicBands)),
        bands: JSON.parse(JSON.stringify(cfg.bands))
      };
      profiles.push(snap); saveProfiles(profiles); refreshSel(); alert('Đã lưu: ' + name);
    });
    const btnLoad = el('button', { class: 'eyb-btn secondary' }, '📂 Load');
    btnLoad.addEventListener('click', () => {
      const idx = parseInt(sel.value, 10);
      if (isNaN(idx) || !profiles[idx]) return alert('Chọn config trước');
      const p = profiles[idx];
      Object.keys(p).forEach(k => { if (k !== 'name') cfg[k] = k === 'bands' || k === 'musicBands' ? JSON.parse(JSON.stringify(p[k])) : p[k]; });
      saveCfg();
      if (!liveRebuild()) applyCfg();
      rebuildBandTable(); rebuildGraphic(); rebuildMusicEQ();
      syncAllUI();
      alert('Đã load: ' + p.name);
    });
    const btnDel = el('button', { class: 'eyb-btn danger' }, '🗑');
    btnDel.addEventListener('click', () => {
      const idx = parseInt(sel.value, 10);
      if (isNaN(idx) || !profiles[idx]) return;
      if (!confirm('Xóa "' + profiles[idx].name + '"?')) return;
      profiles.splice(idx, 1); saveProfiles(profiles); refreshSel();
    });
    bar.append(sel, btnSave, btnLoad, btnDel); pC.appendChild(bar);

    // Export / Import file
    const fileBar = el('div', { class: 'eyb-row' });
    const btnExp = el('button', { class: 'eyb-btn secondary' }, '⬇ Export File');
    btnExp.addEventListener('click', () => {
      const data = {
        name: 'Equaliser Youngbi 4.0 Config', version: '4.0',
        preamp: cfg.preamp, masterGain: cfg.masterGain,
        limiterOn: cfg.limiterOn, limiterCeil: cfg.limiterCeil,
        gateOn: cfg.gateOn, gateDb: cfg.gateDb,
        reverbOn: cfg.reverbOn, reverbMix: cfg.reverbMix, reverbDecay: cfg.reverbDecay, reverbSize: cfg.reverbSize, reverbPreDelay: cfg.reverbPreDelay,
        echoOn: cfg.echoOn, echoLayers: cfg.echoLayers, echoDelay: cfg.echoDelay, echoGain: cfg.echoGain,
        counterOn: cfg.counterOn, counterPan: cfg.counterPan, counterWider: cfg.counterWider, monitorOn: cfg.monitorOn,
        musicGain: cfg.musicGain, voiceMix: cfg.voiceMix, musicMix: cfg.musicMix, musicBass: cfg.musicBass,
        musicBands: cfg.musicBands, bands: cfg.bands
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = 'eyb40-config-' + Date.now() + '.json'; a.click();
    });
    const btnImp = el('button', { class: 'eyb-btn secondary' }, '⬆ Import File');
    const fin = el('input', { type: 'file', accept: '.json,application/json', style: 'display:none' });
    btnImp.addEventListener('click', () => fin.click());
    fin.addEventListener('change', () => {
      const file = fin.files && fin.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          if (data.enabled != null) cfg.enabled = !!data.enabled;
          if (data.gateThreshold != null && data.gateDb == null) data.gateDb = data.gateThreshold;
          ['preamp', 'masterGain', 'limiterOn', 'limiterCeil', 'gateOn', 'gateDb',
            'reverbOn', 'reverbMix', 'reverbDecay', 'reverbSize', 'reverbPreDelay',
            'echoOn', 'echoLayers', 'echoDelay', 'echoGain', 'counterOn', 'counterPan', 'counterWider', 'monitorOn',
            'musicGain', 'voiceMix', 'musicMix', 'musicBass'].forEach(k => {
            if (data[k] != null) cfg[k] = data[k];
          });
          if (Array.isArray(data.bands) && data.bands.length) {
            cfg.bands = data.bands.map(b => ({
              on: b.on !== false,
              type: FILTER_TYPES.includes(b.type) ? b.type : 'peaking',
              freq: Number(b.freq != null ? b.freq : b.fc) || 1000,
              gain: Number(b.gain) || 0,
              Q: Number(b.Q != null ? b.Q : b.q) || 1.0
            }));
          }
          if (Array.isArray(data.musicBands) && data.musicBands.length) {
            cfg.musicBands = data.musicBands.slice(0, 10).map(b => ({
              freq: Number(b.freq != null ? b.freq : b.fc) || 1000,
              gain: Number(b.gain) || 0
            }));
            while (cfg.musicBands.length < 10) cfg.musicBands.push({ freq: 1000, gain: 0 });
          }
          saveCfg();
          if (!liveRebuild()) applyCfg();
          rebuildBandTable(); rebuildGraphic(); rebuildMusicEQ();
          syncAllUI();
          alert('Import OK — đã áp config');
        } catch (e) { alert('File lỗi: ' + e.message); }
        fin.value = '';
      };
      reader.readAsText(file);
    });
    fileBar.append(btnExp, btnImp, fin); pC.appendChild(fileBar);
    pC.appendChild(el('div', { class: 'eyb-note' },
      '4.0: Live rebuild · Limiter · Gate · Preset · VU · Tab UI · Không có quay màn hình.\nPreamp max 130dB · Master max 130× · Echo gain max 3× — to hơn config APO trả phí.'
    ));

    // FAB open/drag
    fab.addEventListener('click', () => {
      cfg.open = !cfg.open; panel.classList.toggle('hidden', !cfg.open); saveCfg();
    });
    let drag = null;
    fab.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      const r = fab.getBoundingClientRect();
      drag = { dx: e.clientX - r.left, dy: e.clientY - r.top };
      fab.setPointerCapture(e.pointerId);
    });
    fab.addEventListener('pointermove', e => {
      if (!drag) return;
      const x = e.clientX - drag.dx, y = e.clientY - drag.dy;
      fab.style.right = 'auto'; fab.style.bottom = 'auto';
      fab.style.left = x + 'px'; fab.style.top = y + 'px';
      cfg.fx = x; cfg.fy = y;
    });
    fab.addEventListener('pointerup', () => { drag = null; saveCfg(); });

    panel.append(header, tabs, body);
    root.append(fab, panel);
    shadow.appendChild(root);
    const mount = () => { if (document.body) document.body.appendChild(host); else requestAnimationFrame(mount); };
    mount();
    console.log(`%c[${PRODUCT}] v${VERSION} ready — louder than paid APO configs`, 'color:#0078d4;font-weight:bold');
  }

  // iOS + Android: resume AudioContext khi user chạm (Safari/Chrome mobile)
  const resumeAudio = () => { try { if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume(); } catch (e) {} };
  ['touchstart', 'touchend', 'pointerdown', 'click'].forEach(ev => {
    document.addEventListener(ev, resumeAudio, { capture: true, passive: true });
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildUI, { once: true });
  else buildUI();
})();
