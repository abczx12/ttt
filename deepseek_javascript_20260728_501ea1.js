// hellfire_amduong_super.js - Bố Duy Khánh ÂM DƯƠNG SIÊU PHẨM
// SIÊU NÂNG CẤP ÂM THANH: Hard Clip + Sub-Bass + Air Band + Transient Punch

(function () {
    'use strict';
    if (window.__BDK_AMDUONG_SUPER__) return;
    window.__BDK_AMDUONG_SUPER__ = true;

    console.log('%c☯️ HELLFIRE ÂM DƯƠNG SIÊU PHẨM - Bố Duy Khánh', 'font-size:24px;font-weight:bold;color:#ffffff;text-shadow:0 0 40px #888;');

    // ============================================================
    //  THAM SỐ MỞ RỘNG
    // ============================================================
    const P = {
        preGain: 1.0,
        drive: 0.15,
        crush: 0.0,
        width: 0.15,
        postGain: 1.5,
        bass: 0.15,
        treble: 0.25,
        echo: 0.08,
        gateThreshold: 0.008,
        deEsser: 0.3,
        // === THAM SỐ MỚI ===
        hardClip: 0.0,      // 0-1, bóp méo tín hiệu
        subBass: 0.0,       // 0-1, tăng bass cực trầm
        airBand: 0.0,       // 0-1, tăng treble siêu cao
        transientPunch: 0.0,// 0-1, tăng độ đập đầu vào
        musicVolume: 0.5,
        musicSync: true,
    };

    // ============================================================
    //  BẢNG MÀU
    // ============================================================
    const PALETTES = {
        'Âm Dương': { primary: '#ffffff', glow: 'rgba(255,255,255,0.3)', bg: '#0a0a0a' },
        'Hỏa Diệm': { primary: '#ff6b6b', glow: 'rgba(255,107,107,0.4)', bg: '#1a0a0a' },
        'Băng Giá': { primary: '#4d96ff', glow: 'rgba(77,150,255,0.4)', bg: '#0a0a1a' },
        'Âm Ty': { primary: '#a66cff', glow: 'rgba(166,108,255,0.4)', bg: '#0a0a12' },
        'Nguyên Khố': { primary: '#6bcb77', glow: 'rgba(107,203,119,0.4)', bg: '#0a0a0a' },
        'Hoàng Kim': { primary: '#ffd93d', glow: 'rgba(255,217,61,0.4)', bg: '#0a0a00' },
    };

    // ============================================================
    //  CONFIG LIST - NÂNG CẤP
    // ============================================================
    const CONFIG_LIST = [
        { name: '🔥 Lấn Át (Cơ Bản)', desc: 'To, dày, át đối phương', preGain: 200, drive: 0.8, crush: 0.4, width: 0.6, postGain: 5, bass: 0.9, treble: 0.5, echo: 0.2, gateThreshold: 0.002, deEsser: 0.05, hardClip: 0, subBass: 0, airBand: 0, transientPunch: 0 },
        { name: '💀 Lấn Át Cực Đỉnh', desc: 'Bão hòa max, át hết', preGain: 500, drive: 1.0, crush: 0.6, width: 0.9, postGain: 8, bass: 1.0, treble: 0.7, echo: 0.35, gateThreshold: 0.001, deEsser: 0.02, hardClip: 0.3, subBass: 0.5, airBand: 0.3, transientPunch: 0.5 },
        { name: '⚡ Lấn Át Tối Thượng', desc: 'Át hoàn toàn, ko thở', preGain: 700, drive: 1.0, crush: 0.8, width: 1.0, postGain: 10, bass: 1.0, treble: 0.8, echo: 0.5, gateThreshold: 0.001, deEsser: 0.01, hardClip: 0.5, subBass: 0.7, airBand: 0.5, transientPunch: 0.7 },
        { name: '💀 Lấn Át Tối Cao', desc: 'Tối đa công suất, át chết mọi thứ', preGain: 50, drive: 1.0, crush: 0.9, width: 1.0, postGain: 30, bass: 1.0, treble: 0.9, echo: 0.6, gateThreshold: 0.001, deEsser: 0.01, hardClip: 0.9, subBass: 1.0, airBand: 0.8, transientPunch: 1.0 },
        { name: '🔊 Loa Phường', desc: 'Giọng loa phường, cực to, vang xa', preGain: 400, drive: 0.6, crush: 0.3, width: 0.8, postGain: 7, bass: 0.8, treble: 0.6, echo: 0.4, gateThreshold: 0.002, deEsser: 0.02, hardClip: 0.2, subBass: 0.4, airBand: 0.2, transientPunch: 0.3 },
        { name: '💥 Bom Nổ', desc: 'Cực to, cực bão hòa, cực vang', preGain: 800, drive: 1.0, crush: 0.8, width: 1.0, postGain: 10, bass: 1.0, treble: 0.8, echo: 0.5, gateThreshold: 0.001, deEsser: 0.01, hardClip: 0.6, subBass: 0.8, airBand: 0.6, transientPunch: 0.8 },
        { name: '😈 Giọng Ác Quỷ', desc: 'Trầm, bão hòa, đáng sợ', preGain: 300, drive: 0.9, crush: 0.7, width: 0.4, postGain: 6, bass: 1.0, treble: 0.1, echo: 0.25, gateThreshold: 0.002, deEsser: 0.08, hardClip: 0.4, subBass: 0.9, airBand: 0, transientPunch: 0.4 },
        { name: '🌀 Echo Siêu Vang', desc: 'Vang dài, như trong hang động', preGain: 100, drive: 0.3, crush: 0, width: 0.5, postGain: 3, bass: 0.3, treble: 0.4, echo: 0.8, gateThreshold: 0.005, deEsser: 0.1, hardClip: 0, subBass: 0.1, airBand: 0.1, transientPunch: 0.1 },
        { name: '🤖 Robot Bão Tố', desc: 'Robot nhưng cực bão hòa', preGain: 350, drive: 1.0, crush: 0.9, width: 0, postGain: 6, bass: 0, treble: 1.0, echo: 0.3, gateThreshold: 0.001, deEsser: 0, hardClip: 0.5, subBass: 0, airBand: 1.0, transientPunch: 0.6 },
        { name: '🐺 Quái Vật', desc: 'Giọng quái vật, đáng sợ, méo mó', preGain: 400, drive: 0.9, crush: 0.8, width: 0.4, postGain: 7, bass: 0.7, treble: 0.6, echo: 0.4, gateThreshold: 0.001, deEsser: 0.02, hardClip: 0.6, subBass: 0.6, airBand: 0.4, transientPunch: 0.5 },
        { name: '🌊 Sóng Thần', desc: 'Ầm ầm như sóng thần ập tới', preGain: 700, drive: 0.9, crush: 0.7, width: 0.9, postGain: 10, bass: 1.0, treble: 0.5, echo: 0.6, gateThreshold: 0.001, deEsser: 0.01, hardClip: 0.4, subBass: 0.9, airBand: 0.3, transientPunch: 0.6 },
        { name: '💀 Thần Chết', desc: 'Giọng của thần chết, lạnh lùng', preGain: 450, drive: 0.8, crush: 0.9, width: 0.4, postGain: 8, bass: 0.8, treble: 0.2, echo: 0.3, gateThreshold: 0.002, deEsser: 0.05, hardClip: 0.7, subBass: 0.8, airBand: 0.1, transientPunch: 0.7 },
    ];

    // ============================================================
    //  PALETTE SHIFT THEO CONFIG
    // ============================================================
    function getPaletteForConfig(configName) {
        if (configName.includes('Lấn Át') || configName.includes('Tối Cao')) return PALETTES['Hỏa Diệm'];
        if (configName.includes('Loa Phường') || configName.includes('Bom Nổ')) return PALETTES['Hoàng Kim'];
        if (configName.includes('Ác Quỷ') || configName.includes('Thần Chết') || configName.includes('Quái Vật')) return PALETTES['Âm Ty'];
        if (configName.includes('Echo') || configName.includes('Sóng Thần')) return PALETTES['Băng Giá'];
        if (configName.includes('Robot')) return PALETTES['Nguyên Khố'];
        return PALETTES['Âm Dương'];
    }

    function applyPalette(palette) {
        const root = document.documentElement;
        root.style.setProperty('--kh-primary', palette.primary);
        root.style.setProperty('--kh-glow', palette.glow);
        root.style.setProperty('--kh-bg', palette.bg);
        const dot = document.getElementById('kh-dot');
        if (dot) {
            dot.style.background = palette.primary;
            dot.style.boxShadow = `0 0 20px ${palette.glow}`;
        }
    }

    // ============================================================
    //  WORKLET NÂNG CẤP - XỬ LÝ THAM SỐ MỚI
    // ============================================================
    const WORKLET = `
    class BODUYKHANH extends AudioWorkletProcessor {
        static get parameterDescriptors() {
            return [
                { name:'preGain',  defaultValue:1,   min:0,     max:99999999 },
                { name:'drive',    defaultValue:0,   min:0,     max:99999999 },
                { name:'crush',    defaultValue:0,   min:0,     max:99999999 },
                { name:'width',    defaultValue:0,   min:0,     max:99999999 },
                { name:'postGain', defaultValue:1,   min:0,     max:99999999 },
                { name:'bass',     defaultValue:0,   min:0,     max:99999999 },
                { name:'treble',   defaultValue:0,   min:0,     max:99999999 },
                { name:'echo',     defaultValue:0,   min:0,     max:99999999 },
                { name:'gateThreshold', defaultValue:0.005, min:0, max:99999999 },
                { name:'deEsser',  defaultValue:0,    min:0,     max:99999999 },
                { name:'hardClip', defaultValue:0,    min:0,     max:1 },
                { name:'subBass',  defaultValue:0,    min:0,     max:1 },
                { name:'airBand',  defaultValue:0,    min:0,     max:1 },
                { name:'transientPunch', defaultValue:0, min:0, max:1 },
            ];
        }
        constructor() {
            super();
            this.SR = sampleRate || 48000;
            this._limL = 1; this._limR = 1;
            this._echoBufL = 0; this._echoBufR = 0;
            this._gateL = 1; this._gateR = 1;
            this._deEsserL = 0; this._deEsserR = 0;
            this._prevL = 0; this._prevR = 0;
            this._lowL = 0; this._lowR = 0;
            this._highL = 0; this._highR = 0;
        }

        _sat(x, k) {
            if (k < 0.001) return x;
            const drive = k * 20;
            return Math.atan(x * drive) / Math.atan(drive);
        }

        _bassBoost(x, amount) {
            if (amount < 0.001) return x;
            return x * (1 + amount * 1.5);
        }

        _trebleBoost(x, amount) {
            if (amount < 0.001) return x;
            return x * (1 + amount * 2);
        }

        _deEsser(x, amount) {
            if (amount < 0.001) return x;
            const highFreq = x * 0.3 + this._deEsserL * 0.7;
            this._deEsserL = highFreq;
            const reduction = 1 - Math.min(amount, Math.abs(highFreq) * amount * 4);
            return x * Math.max(0.3, reduction);
        }

        _noiseGate(x, threshold) {
            if (threshold < 0.0001) return x;
            const rms = Math.abs(x);
            const attack = 0.01;
            const release = 0.001;
            if (rms > threshold) {
                this._gateL = Math.min(1, this._gateL + attack);
            } else {
                this._gateL = Math.max(0, this._gateL - release);
            }
            return x * this._gateL;
        }

        _softLimit(x) {
            if (Math.abs(x) > 0.95) {
                const sign = x > 0 ? 1 : -1;
                const excess = Math.abs(x) - 0.95;
                return sign * (0.95 + excess * 0.5);
            }
            return x;
        }

        _echo(x, amount) {
            if (amount < 0.001) return x;
            const wet = amount * 0.4;
            const feedback = 0.3;
            const out = x + this._echoBufL * wet;
            this._echoBufL = x * feedback + this._echoBufL * (1 - feedback * 0.3);
            return out;
        }

        process(inputs, outputs, params) {
            const inp = inputs[0];
            const out = outputs[0];
            if (!inp || inp.length === 0) return true;

            const preGain  = params.preGain[0];
            const drive    = params.drive[0];
            const crush    = params.crush[0];
            const width    = params.width[0];
            const postGain = params.postGain[0];
            const bass     = params.bass[0];
            const treble   = params.treble[0];
            const echo     = params.echo[0];
            const gateTh   = params.gateThreshold[0];
            const deEsser  = params.deEsser[0];
            const hardClip = params.hardClip[0];
            const subBass  = params.subBass[0];
            const airBand  = params.airBand[0];
            const transientPunch = params.transientPunch[0];

            for (let i=0; i<inp[0].length; i++) {
                let L = inp[0][i] * preGain;
                let R = (inp[1] ? inp[1][i] : inp[0][i]) * preGain;

                // TRANSIENT PUNCH (tăng attack nhanh)
                if (transientPunch > 0) {
                    const punchFactor = 1 + transientPunch * 0.5;
                    const deltaL = Math.abs(L - this._prevL);
                    const deltaR = Math.abs(R - this._prevR);
                    if (deltaL > 0.01) L *= punchFactor;
                    if (deltaR > 0.01) R *= punchFactor;
                    this._prevL = L;
                    this._prevR = R;
                }

                L = this._noiseGate(L, gateTh);
                R = this._noiseGate(R, gateTh);

                L = this._deEsser(L, deEsser);
                R = this._deEsser(R, deEsser);

                // SUB-BASS (tăng tần số cực trầm)
                if (subBass > 0) {
                    const lowL = L * 0.3 + this._lowL * 0.7;
                    const lowR = R * 0.3 + this._lowR * 0.7;
                    this._lowL = lowL;
                    this._lowR = lowR;
                    L += lowL * subBass * 0.8;
                    R += lowR * subBass * 0.8;
                }

                L = this._bassBoost(L, bass);
                R = this._bassBoost(R, bass);

                // AIR BAND (tăng tần số siêu cao)
                if (airBand > 0) {
                    const highL = L - (L * 0.3 + this._highL * 0.7);
                    const highR = R - (R * 0.3 + this._highR * 0.7);
                    this._highL = L * 0.3 + this._highL * 0.7;
                    this._highR = R * 0.3 + this._highR * 0.7;
                    L += highL * airBand * 0.5;
                    R += highR * airBand * 0.5;
                }

                L = this._trebleBoost(L, treble);
                R = this._trebleBoost(R, treble);

                L = this._sat(L, drive);
                R = this._sat(R, drive);

                if (crush > 0) {
                    const th = Math.max(0.001, 1.0 - crush * 0.98);
                    L = Math.max(-th, Math.min(th, L)) / th;
                    R = Math.max(-th, Math.min(th, R)) / th;
                }

                // HARD CLIP (bóp méo tín hiệu)
                if (hardClip > 0) {
                    const clipThreshold = 1 - hardClip * 0.8;
                    L = Math.max(-clipThreshold, Math.min(clipThreshold, L)) / clipThreshold;
                    R = Math.max(-clipThreshold, Math.min(clipThreshold, R)) / clipThreshold;
                }

                if (width > 0) {
                    const mid = (L + R) * 0.5;
                    const side = (L - R) * 0.5 * (1 + width * 1.5);
                    L = mid + side;
                    R = mid - side;
                }

                L = this._echo(L, echo);
                R = this._echo(R, echo);

                L *= postGain;
                R *= postGain;

                L = this._softLimit(L);
                R = this._softLimit(R);

                out[0][i] = L || 0;
                if (out[1]) out[1][i] = R || 0;
            }
            return true;
        }
    }
    registerProcessor('boduytadao', BODUYKHANH);
    `;

    // ============================================================
    //  HOOK HỆ THỐNG
    // ============================================================
    const _NativeCtx = window.AudioContext || window.webkitAudioContext;
    let _ctx = null;

    class BODUYAudioContext extends _NativeCtx {
        constructor(...args) {
            super({ latencyHint: 'interactive', sampleRate: 48000 });
            if (!_ctx) {
                _ctx = this;
                const blob = new Blob([WORKLET], { type: 'application/javascript' });
                _ctx.audioWorklet.addModule(URL.createObjectURL(blob))
                    .then(() => {
                        UI.badge('SẴN SÀNG', '#fff');
                        showToast('☯️ Hệ thống âm thanh sẵn sàng!', 'success');
                    });
            }
        }
    }
    try {
        window.AudioContext = BODUYAudioContext;
        if (window.webkitAudioContext) window.webkitAudioContext = BODUYAudioContext;
    } catch (e) {}

    const _nativeGUM = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = async function (constraints) {
        if (constraints.audio) constraints.audio = { autoGainControl: false, echoCancellation: false, noiseSuppression: false, channelCount: 2 };
        let raw;
        try { raw = await _nativeGUM(constraints); } catch (e) { return raw; }
        try {
            const proc = await Core.build(raw);
            UI.badge('BẬT', '#fff');
            showToast('🎤 Mic đã được kích hoạt!', 'success');
            return proc;
        } catch (e) { return raw; }
    };

    const Core = {
        node: null,
        async build(stream) {
            if (!_ctx) {
                try {
                    _ctx = new _NativeCtx({ latencyHint: 'interactive', sampleRate: 48000 });
                    const blob = new Blob([WORKLET], { type: 'application/javascript' });
                    await _ctx.audioWorklet.addModule(URL.createObjectURL(blob));
                } catch (e) { return stream; }
            }
            if (_ctx.state === 'suspended') await _ctx.resume();
            const src = _ctx.createMediaStreamSource(stream);
            const dest = _ctx.createMediaStreamDestination();
            this.node = new AudioWorkletNode(_ctx, 'boduytadao', { numberOfOutputs: 1, outputChannelCount: [2] });
            this.push();
            src.connect(this.node);
            this.node.connect(dest);
            return dest.stream;
        },
        push() {
            if (!this.node || !_ctx) return;
            const mp = this.node.parameters,
                t = _ctx.currentTime;
            mp.get('preGain').setTargetAtTime(P.preGain, t, 0.015);
            mp.get('drive').setTargetAtTime(P.drive, t, 0.015);
            mp.get('crush').setTargetAtTime(P.crush, t, 0.015);
            mp.get('width').setTargetAtTime(P.width, t, 0.015);
            mp.get('postGain').setTargetAtTime(P.postGain, t, 0.015);
            mp.get('bass').setTargetAtTime(P.bass, t, 0.015);
            mp.get('treble').setTargetAtTime(P.treble, t, 0.015);
            mp.get('echo').setTargetAtTime(P.echo, t, 0.015);
            mp.get('gateThreshold').setTargetAtTime(P.gateThreshold, t, 0.015);
            mp.get('deEsser').setTargetAtTime(P.deEsser, t, 0.015);
            mp.get('hardClip').setTargetAtTime(P.hardClip, t, 0.015);
            mp.get('subBass').setTargetAtTime(P.subBass, t, 0.015);
            mp.get('airBand').setTargetAtTime(P.airBand, t, 0.015);
            mp.get('transientPunch').setTargetAtTime(P.transientPunch, t, 0.015);
        }
    };

    // ============================================================
    //  APPLY CONFIG + PALETTE + SHAKE
    // ============================================================
    function applyConfig(config) {
        Object.assign(P, config);
        Core.push();
        syncUI();
        updateInputs();

        const palette = getPaletteForConfig(config.name || '');
        applyPalette(palette);

        const root = document.getElementById('kh-root');
        if (root) {
            screenShake(root, 8, 250);
        }

        showToast(`✅ Đã áp dụng: ${config.name || 'Custom'}`, 'success');
        console.log('✅ Đã áp dụng config:', config.name || 'Custom');
    }

    function updateInputs() {
        const map = {
            'preGain': 'num-pg',
            'drive': 'num-dr',
            'crush': 'num-cr',
            'width': 'num-wd',
            'postGain': 'num-po',
            'bass': 'num-bs',
            'treble': 'num-tr',
            'echo': 'num-ec',
            'gateThreshold': 'num-gt',
            'deEsser': 'num-de',
            'hardClip': 'num-hc',
            'subBass': 'num-sb',
            'airBand': 'num-ab',
            'transientPunch': 'num-tp',
            'musicVolume': 'num-mv',
        };
        Object.keys(map).forEach(param => {
            const num = document.getElementById(map[param]);
            if (num) num.value = P[param]?.toFixed(4) || P[param];
        });
    }

    function syncUI() {
        const els = [
            ['sl-pg', 'lb-pg', 'preGain', 'x'],
            ['sl-dr', 'lb-dr', 'drive', ''],
            ['sl-cr', 'lb-cr', 'crush', ''],
            ['sl-wd', 'lb-wd', 'width', ''],
            ['sl-po', 'lb-po', 'postGain', 'x'],
            ['sl-bs', 'lb-bs', 'bass', ''],
            ['sl-tr', 'lb-tr', 'treble', ''],
            ['sl-ec', 'lb-ec', 'echo', ''],
            ['sl-gt', 'lb-gt', 'gateThreshold', ''],
            ['sl-de', 'lb-de', 'deEsser', ''],
            ['sl-hc', 'lb-hc', 'hardClip', ''],
            ['sl-sb', 'lb-sb', 'subBass', ''],
            ['sl-ab', 'lb-ab', 'airBand', ''],
            ['sl-tp', 'lb-tp', 'transientPunch', ''],
            ['sl-mv', 'lb-mv', 'musicVolume', '%'],
        ];
        els.forEach(arr => {
            const el = document.getElementById(arr[0]),
                lb = document.getElementById(arr[1]);
            if (!el || !lb) return;
            let val = P[arr[2]];
            el.value = val;
            let pct = Math.min(100, (val / (val + 1)) * 100);
            el.style.setProperty('--v', pct + '%');
            if (arr[3] === 'x') lb.innerText = val.toFixed(1) + 'x';
            else if (arr[3] === '%') lb.innerText = (val * 100).toFixed(0) + '%';
            else lb.innerText = val.toFixed(2);
        });
    }

    // ============================================================
    //  EFFECTS
    // ============================================================
    function screenShake(element, intensity = 8, duration = 250) {
        if (!element) return;
        const startTime = Date.now();

        function shake() {
            const elapsed = Date.now() - startTime;
            const progress = 1 - elapsed / duration;
            if (progress <= 0) {
                element.style.transform = '';
                element.style.transition = '';
                return;
            }
            const strength = intensity * progress;
            const x = (Math.random() - 0.5) * strength * 2;
            const y = (Math.random() - 0.5) * strength * 2;
            element.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(shake);
        }
        shake();
    }

    function showToast(message, type = 'info', duration = 2500) {
        const toast = document.createElement('div');
        const colors = {
            info: '#888',
            success: '#43e97b',
            error: '#ff6b6b',
            warning: '#ffd93d'
        };
        toast.style.cssText = `
            position:fixed;bottom:120px;left:50%;transform:translateX(-50%) translateY(20px);
            background:rgba(10,10,10,0.95);
            backdrop-filter:blur(20px);
            color:${colors[type] || '#fff'};
            padding:12px 24px;
            border-radius:12px;
            border:1px solid ${colors[type] || '#888'}40;
            box-shadow:0 0 40px ${colors[type] || '#888'}20;
            z-index:9999999;
            font-size:14px;
            font-weight:bold;
            font-family:'Segoe UI',sans-serif;
            opacity:0;
            transition:all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            pointer-events:none;
            text-shadow:0 0 20px ${colors[type] || '#888'}40;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 500);
        }, duration);
    }

    // ============================================================
    //  AUDIO VISUALIZER
    // ============================================================
    let visualizerRunning = false;
    let visualizerAnimationId = null;

    function initVisualizer() {
        const canvas = document.getElementById('kh-visualizer');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.clientWidth;
        const height = canvas.height = 80;

        visualizerRunning = true;
        drawFakeVisualizer(ctx, width, height);
    }

    function drawFakeVisualizer(ctx, width, height) {
        if (!visualizerRunning) return;

        ctx.clearRect(0, 0, width, height);

        const barCount = 60;
        const barWidth = width / barCount;
        const time = Date.now() / 1000;

        for (let i = 0; i < barCount; i++) {
            const value = (Math.sin(time * 2 + i * 0.15) * 0.4 + 
                          Math.sin(time * 1.3 + i * 0.25) * 0.3 + 
                          Math.sin(time * 0.7 + i * 0.35) * 0.3) * 0.5 + 0.5;
            const barHeight = Math.max(2, value * height * 0.85);

            const brightness = Math.round(100 + value * 155);
            ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
            ctx.shadowColor = value > 0.6 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = value > 0.6 ? 8 : 0;
            ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
            ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = '16px Arial';
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('☯', width / 2, height / 2);

        visualizerAnimationId = requestAnimationFrame(() => drawFakeVisualizer(ctx, width, height));
    }

    function stopVisualizer() {
        visualizerRunning = false;
        if (visualizerAnimationId) {
            cancelAnimationFrame(visualizerAnimationId);
            visualizerAnimationId = null;
        }
    }

    // ============================================================
    //  MUSIC PLAYER
    // ============================================================
    let musicBuffer = null;
    let musicSource = null;
    let musicGain = null;
    let isMusicPlaying = false;

    function updateMusicVolume(volume) {
        if (musicGain) {
            musicGain.gain.value = Math.min(1, Math.max(0, volume));
            console.log('🔊 Đã cập nhật volume nhạc:', volume);
        }
    }

    function loadMusic(file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                const ctx = _ctx || new (window.AudioContext || window.webkitAudioContext)();
                const audioData = await ctx.decodeAudioData(e.target.result);
                musicBuffer = audioData;
                document.getElementById('music-status').textContent = '✅ ' + file.name;
                document.getElementById('music-status').style.color = '#888';
                showToast(`✅ Đã tải: ${file.name}`, 'success');
            } catch (err) {
                console.error('Lỗi tải nhạc:', err);
                document.getElementById('music-status').textContent = '❌ Lỗi file!';
                document.getElementById('music-status').style.color = '#ff6b6b';
                showToast('❌ Lỗi tải file nhạc!', 'error');
            }
        };
        reader.readAsArrayBuffer(file);
    }

    function toggleMusic() {
        if (!musicBuffer) {
            showToast('⚠️ Chọn file nhạc trước!', 'warning');
            document.getElementById('music-status').textContent = '⚠️ Chọn file!';
            document.getElementById('music-status').style.color = '#ffd93d';
            return;
        }

        const ctx = _ctx || new (window.AudioContext || window.webkitAudioContext)();

        if (isMusicPlaying) {
            if (musicSource) {
                try { musicSource.stop(); } catch(e) {}
                musicSource = null;
            }
            if (musicGain) {
                try { musicGain.disconnect(); } catch(e) {}
                musicGain = null;
            }
            isMusicPlaying = false;
            document.getElementById('music-play').textContent = '▶ PLAY';
            document.getElementById('music-status').textContent = '⏸ Đã dừng';
            document.getElementById('music-status').style.color = '#888';
            showToast('⏸ Đã dừng phát nhạc', 'info');
            return;
        }

        try {
            musicGain = ctx.createGain();
            const volume = Math.min(1, Math.max(0, P.musicVolume || 0.5));
            musicGain.gain.value = volume;

            musicSource = ctx.createBufferSource();
            musicSource.buffer = musicBuffer;
            musicSource.loop = true;
            musicSource.connect(musicGain);
            musicGain.connect(ctx.destination);
            musicSource.start(0);

            isMusicPlaying = true;
            document.getElementById('music-play').textContent = '⏹ STOP';
            document.getElementById('music-status').textContent = `▶ Đang phát (${(volume * 100).toFixed(0)}%)`;
            document.getElementById('music-status').style.color = '#888';
            showToast(`▶ Đang phát nhạc (${(volume * 100).toFixed(0)}% volume)`, 'success');
        } catch (err) {
            console.error('Lỗi phát nhạc:', err);
            document.getElementById('music-status').textContent = '❌ Lỗi phát!';
            document.getElementById('music-status').style.color = '#ff6b6b';
            showToast('❌ Lỗi phát nhạc!', 'error');
        }
    }

    // ============================================================
    //  UI - ÂM DƯƠNG (TRẮNG ĐEN) + GLOW + VIỀN ĐUỔI MÀU + SLIDER MỚI
    // ============================================================
    const UI = {
        badge(t, c) {
            const e = document.getElementById('kh-st'),
                d = document.getElementById('kh-dot');
            if (e) { e.innerText = t; e.style.color = c; }
            if (d) { d.style.background = c; d.style.boxShadow = '0 0 10px ' + c; }
        },
        init() {
            // Nút toggle ☯️
            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'kh-toggle';
            toggleBtn.textContent = '☯';
            toggleBtn.style.cssText = `
                position:fixed;bottom:24px;left:24px;z-index:999999;
                width:60px;height:60px;border-radius:50%;
                background:linear-gradient(135deg,#1a1a1a,#2a2a2a);
                border:2px solid #888;color:#fff;font-size:28px;cursor:pointer;
                box-shadow:0 0 40px rgba(255,255,255,0.05), inset 0 0 40px rgba(255,255,255,0.02);
                transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                display:flex;align-items:center;justify-content:center;
                font-family:'Segoe UI',sans-serif;user-select:none;
                backdrop-filter:blur(10px);
                animation: yinyangPulse 3s infinite;
            `;

            const style = document.createElement('style');
            style.textContent = `
                @keyframes yinyangPulse {
                    0%, 100% { text-shadow: 0 0 20px rgba(255,255,255,0.1); }
                    50% { text-shadow: 0 0 60px rgba(255,255,255,0.3); }
                }
                @keyframes borderChase {
                    0% { border-color: #fff; }
                    25% { border-color: #888; }
                    50% { border-color: #fff; }
                    75% { border-color: #444; }
                    100% { border-color: #fff; }
                }
                #kh-root {
                    animation: borderChase 4s ease-in-out infinite;
                    border-width: 2px;
                    border-style: solid;
                }
                .kh-glow-text {
                    text-shadow: 0 0 20px rgba(255,255,255,0.2);
                }
                .kh-glow-text:hover {
                    text-shadow: 0 0 40px rgba(255,255,255,0.5);
                }
            `;
            document.head.appendChild(style);

            toggleBtn.onmouseenter = () => {
                toggleBtn.style.transform = 'scale(1.1)';
                toggleBtn.style.boxShadow = '0 0 60px rgba(255,255,255,0.15)';
            };
            toggleBtn.onmouseleave = () => {
                toggleBtn.style.transform = 'scale(1)';
                toggleBtn.style.boxShadow = '0 0 40px rgba(255,255,255,0.05)';
            };
            document.body.appendChild(toggleBtn);

            // Main UI
            const el = document.createElement('div');
            el.id = 'kh-root';
            let html = `
            <div id="kh-head">
                <div id="kh-title">
                    <span style="font-size:20px;animation:yinyangPulse 2s infinite;">☯</span>
                    <span id="kh-name" class="kh-glow-text">ÂM DƯƠNG SIÊU PHẨM</span>
                </div>
                <div id="kh-right">
                    <div id="kh-badge">
                        <span id="kh-dot"></span>
                        <span id="kh-st">CHỜ</span>
                    </div>
                    <button id="kh-close">✕</button>
                </div>
            </div>
            <div id="kh-body">
                <div class="kh-section-title">🎯 CHỌN CONFIG</div>
                <select id="config-select" style="width:100%;padding:10px 12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#fff;border-radius:8px;font-size:14px;cursor:pointer;margin-bottom:10px;">
                    <option value="">-- Chọn config --</option>
                    ${CONFIG_LIST.map((c, i) => `
                        <option value="${i}">${c.name} - ${c.desc}</option>
                    `).join('')}
                </select>
                <div id="config-info" style="font-size:11px;color:#666;margin-bottom:10px;padding:8px;background:rgba(255,255,255,0.02);border-radius:6px;border:1px solid rgba(255,255,255,0.03);">
                    💡 Chọn config để áp dụng hiệu ứng (nhạc sẽ tự đồng bộ)
                </div>

                <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:8px;margin-bottom:12px;border:1px solid rgba(255,255,255,0.05);">
                    <canvas id="kh-visualizer" style="width:100%;height:80px;display:block;border-radius:4px;"></canvas>
                </div>

                <div style="display:flex;gap:6px;margin-bottom:12px;align-items:center;flex-wrap:wrap;">
                    <input type="file" id="music-file" accept="audio/*" style="flex:1;min-width:120px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#fff;border-radius:4px;padding:4px 8px;font-size:11px;">
                    <button id="music-play" style="padding:4px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:#fff;border-radius:4px;cursor:pointer;font-size:11px;white-space:nowrap;">▶ PLAY</button>
                    <span id="music-status" style="font-size:10px;color:#666;min-width:80px;">Chọn file</span>
                </div>

                <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;padding:8px 12px;background:rgba(255,255,255,0.02);border-radius:6px;border:1px solid rgba(255,255,255,0.03);">
                    <span style="font-size:11px;color:#666;min-width:40px;">🔊</span>
                    <input type="range" id="sl-mv" min="0" max="100" step="1" value="50" style="flex:1;--v:50%;">
                    <span id="lb-mv" style="font-size:11px;color:#fff;min-width:40px;text-align:right;">50%</span>
                    <button id="btn-sync-music" style="padding:2px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:#888;border-radius:4px;cursor:pointer;font-size:10px;white-space:nowrap;">🔄 SYNC</button>
                </div>

                <div class="kh-sep"></div>

                ${[
                    ['sl-pg', 'lb-pg', 'num-pg', '🔊 PRE GAIN', '1.0x', 'preGain'],
                    ['sl-dr', 'lb-dr', 'num-dr', '🔥 DRIVE', '0.00', 'drive'],
                    ['sl-cr', 'lb-cr', 'num-cr', '💥 CRUSH', '0.00', 'crush'],
                    ['sl-wd', 'lb-wd', 'num-wd', '📢 WIDTH', '0.00', 'width'],
                    ['sl-po', 'lb-po', 'num-po', '⚡ POST GAIN', '1.0x', 'postGain'],
                    ['sl-bs', 'lb-bs', 'num-bs', '🎸 BASS', '0.00', 'bass'],
                    ['sl-tr', 'lb-tr', 'num-tr', '🎵 TREBLE', '0.00', 'treble'],
                    ['sl-ec', 'lb-ec', 'num-ec', '🔊 ECHO', '0.00', 'echo'],
                    ['sl-gt', 'lb-gt', 'num-gt', '🔇 GATE', '0.000', 'gateThreshold'],
                    ['sl-de', 'lb-de', 'num-de', '🗣️ DE-ESSER', '0.00', 'deEsser'],
                    ['sl-hc', 'lb-hc', 'num-hc', '🔥 HARD CLIP', '0.00', 'hardClip'],
                    ['sl-sb', 'lb-sb', 'num-sb', '🌀 SUB-BASS', '0.00', 'subBass'],
                    ['sl-ab', 'lb-ab', 'num-ab', '✨ AIR BAND', '0.00', 'airBand'],
                    ['sl-tp', 'lb-tp', 'num-tp', '💥 TRANSIENT PUNCH', '0.00', 'transientPunch'],
                ].map(([slId, lbId, numId, label, defaultVal, param]) => `
                    <div class="kh-row">
                        <div class="kh-rowlabel">
                            <span>${label}</span>
                            <div style="display:flex;gap:8px;align-items:center;">
                                <span id="${lbId}" style="min-width:50px;">${defaultVal}</span>
                                <input type="number" id="${numId}" value="${defaultVal}" style="width:80px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#fff;border-radius:6px;padding:4px 8px;font-size:12px;text-align:center;">
                            </div>
                        </div>
                        <input type="range" id="${slId}" min="0" max="1000" step="1" value="0" style="--v:0%">
                    </div>
                `).join('')}

                <div class="kh-sep"></div>
                <div style="display:flex;gap:8px;">
                    <button id="kh-rst" style="flex:1;">↺ RESET</button>
                    <button id="kh-save" style="flex:1;">💾 SAVE</button>
                </div>
            </div>
            `;
            el.innerHTML = html;
            document.body.appendChild(el);

            // ===== EVENTS =====
            let uiVisible = true;
            toggleBtn.onclick = () => {
                uiVisible = !uiVisible;
                el.style.display = uiVisible ? 'block' : 'none';
                toggleBtn.style.borderColor = uiVisible ? '#888' : '#333';
                toggleBtn.textContent = uiVisible ? '☯' : '☯';
            };

            document.getElementById('kh-close').onclick = () => {
                el.style.display = 'none';
                toggleBtn.style.borderColor = '#333';
                toggleBtn.textContent = '☯';
            };

            // Config select
            document.getElementById('config-select').onchange = function() {
                const idx = parseInt(this.value);
                if (isNaN(idx)) return;
                const config = CONFIG_LIST[idx];
                if (config) {
                    applyConfig(config);
                    document.getElementById('config-info').innerHTML = `✅ Đã áp dụng: <b style="color:#fff;">${config.name}</b> - ${config.desc}`;
                    document.getElementById('config-info').style.borderColor = 'rgba(255,255,255,0.2)';
                }
            };

            // ===== MUSIC VOLUME SLIDER =====
            const mvSlider = document.getElementById('sl-mv');
            const mvLabel = document.getElementById('lb-mv');

            mvSlider.oninput = function() {
                const val = parseInt(this.value);
                const volume = val / 100;
                mvLabel.innerText = val + '%';
                this.style.setProperty('--v', val + '%');
                P.musicVolume = volume;
                updateMusicVolume(volume);
                if (isMusicPlaying) {
                    document.getElementById('music-status').textContent = `▶ Đang phát (${val}%)`;
                }
            };

            document.getElementById('btn-sync-music').onclick = function() {
                const maxPostGain = 20;
                const normalizedVolume = Math.min(1, P.postGain / maxPostGain);
                P.musicVolume = Math.max(0.05, normalizedVolume);
                const val = P.musicVolume * 100;
                mvSlider.value = val;
                mvSlider.style.setProperty('--v', val + '%');
                mvLabel.innerText = val.toFixed(0) + '%';
                updateMusicVolume(P.musicVolume);
                if (isMusicPlaying) {
                    document.getElementById('music-status').textContent = `▶ Đang phát (${val.toFixed(0)}%)`;
                }
                showToast(`🔊 Đã đồng bộ volume (${val.toFixed(0)}%)`, 'success');
            };

            // ===== SLIDERS =====
            const paramMap = {
                'preGain': { sl: 'sl-pg', lb: 'lb-pg', num: 'num-pg' },
                'drive': { sl: 'sl-dr', lb: 'lb-dr', num: 'num-dr' },
                'crush': { sl: 'sl-cr', lb: 'lb-cr', num: 'num-cr' },
                'width': { sl: 'sl-wd', lb: 'lb-wd', num: 'num-wd' },
                'postGain': { sl: 'sl-po', lb: 'lb-po', num: 'num-po' },
                'bass': { sl: 'sl-bs', lb: 'lb-bs', num: 'num-bs' },
                'treble': { sl: 'sl-tr', lb: 'lb-tr', num: 'num-tr' },
                'echo': { sl: 'sl-ec', lb: 'lb-ec', num: 'num-ec' },
                'gateThreshold': { sl: 'sl-gt', lb: 'lb-gt', num: 'num-gt' },
                'deEsser': { sl: 'sl-de', lb: 'lb-de', num: 'num-de' },
                'hardClip': { sl: 'sl-hc', lb: 'lb-hc', num: 'num-hc' },
                'subBass': { sl: 'sl-sb', lb: 'lb-sb', num: 'num-sb' },
                'airBand': { sl: 'sl-ab', lb: 'lb-ab', num: 'num-ab' },
                'transientPunch': { sl: 'sl-tp', lb: 'lb-tp', num: 'num-tp' },
            };

            Object.keys(paramMap).forEach(param => {
                const ids = paramMap[param];
                const sl = document.getElementById(ids.sl);
                const num = document.getElementById(ids.num);
                if (!sl || !num) return;

                sl.oninput = () => {
                    let val = parseFloat(sl.value);
                    if (param === 'gateThreshold') val = val * 0.05;
                    else if (param === 'postGain') val = val * 20;
                    else if (param === 'preGain') val = val * 1000;
                    else val = val / 1000;
                    P[param] = val;
                    num.value = val.toFixed(4);
                    Core.push();
                    syncUI();
                    updateInputs();
                };

                num.oninput = () => {
                    let val = parseFloat(num.value) || 0;
                    P[param] = val;
                    let sliderVal = val;
                    if (param === 'gateThreshold') sliderVal = val / 0.05;
                    else if (param === 'postGain') sliderVal = val / 20;
                    else if (param === 'preGain') sliderVal = val / 1000;
                    else sliderVal = val * 1000;
                    sl.value = Math.min(1000, Math.max(0, sliderVal));
                    Core.push();
                    syncUI();
                };
            });

            // Reset
            document.getElementById('kh-rst').onclick = () => {
                applyConfig({ preGain: 1, drive: 0, crush: 0, width: 0, postGain: 1, bass: 0, treble: 0, echo: 0, gateThreshold: 0.005, deEsser: 0, musicVolume: 0.5, hardClip: 0, subBass: 0, airBand: 0, transientPunch: 0 });
                document.getElementById('config-select').value = '';
                document.getElementById('config-info').innerHTML = '💡 Chọn config để áp dụng hiệu ứng';
                document.getElementById('config-info').style.borderColor = 'rgba(255,255,255,0.03)';
                const mvSlider = document.getElementById('sl-mv');
                const mvLabel = document.getElementById('lb-mv');
                if (mvSlider) {
                    mvSlider.value = 50;
                    mvSlider.style.setProperty('--v', '50%');
                    mvLabel.innerText = '50%';
                }
                updateMusicVolume(0.5);
                // Reset palette
                applyPalette(PALETTES['Âm Dương']);
                showToast('🔄 Đã reset về mặc định', 'info');
            };

            // Save
            document.getElementById('kh-save').onclick = () => {
                const name = prompt('Nhập tên config:');
                if (name) {
                    const config = { ...P };
                    CONFIG_LIST.push({ name, desc: 'Custom config', ...config });
                    const select = document.getElementById('config-select');
                    const option = document.createElement('option');
                    option.value = CONFIG_LIST.length - 1;
                    option.textContent = `${name} - Custom`;
                    select.appendChild(option);
                    showToast(`✅ Đã lưu config: ${name}`, 'success');
                }
            };

            // Music
            document.getElementById('music-file').onchange = function(e) {
                const file = e.target.files[0];
                if (file) loadMusic(file);
            };
            document.getElementById('music-play').onclick = toggleMusic;

            this.css();
            this.badge('CHỜ', '#888');
            syncUI();
            updateInputs();

            // Khởi tạo visualizer
            setTimeout(initVisualizer, 500);

            // Âm dương xoay
            let angle = 0;
            const toggle = document.getElementById('kh-toggle');
            setInterval(() => {
                angle += 0.02;
                if (toggle) {
                    toggle.style.transform = `rotate(${angle}deg)`;
                }
            }, 50);

            // Palette mặc định
            applyPalette(PALETTES['Âm Dương']);

            // Thông báo chào mừng
            setTimeout(() => {
                showToast('☯️ HELLFIRE ÂM DƯƠNG SIÊU PHẨM - Sẵn sàng!', 'info', 3000);
            }, 1000);
        },
        css() {
            const s = document.createElement('style');
            s.textContent = `
            @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.1);} }
            @keyframes glow { 0%,100%{text-shadow:0 0 20px var(--kh-primary, #888);} 50%{text-shadow:0 0 40px var(--kh-primary, #fff),0 0 80px var(--kh-glow, rgba(255,255,255,0.1));} }
            @keyframes slowRotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @keyframes fastRotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(720deg); } }

            #kh-root {
                position:fixed;top:20px;right:20px;width:400px;
                background:rgba(10,10,10,0.95);
                backdrop-filter:blur(20px);
                border:1px solid var(--kh-primary, #888);
                border-radius:20px;
                box-shadow:0 0 60px var(--kh-glow, rgba(255,255,255,0.02)), inset 0 0 60px var(--kh-glow, rgba(255,255,255,0.02));
                font-family:'Segoe UI',system-ui,sans-serif;
                color:#fff;
                z-index:999998;
                user-select:none;
                max-height:90vh;
                overflow-y:auto;
                transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                display:block;
                opacity:1;
            }
            #kh-root::-webkit-scrollbar{width:6px;}
            #kh-root::-webkit-scrollbar-track{background:rgba(255,255,255,0.02);border-radius:10px;}
            #kh-root::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:10px;}

            #kh-head {
                display:flex;justify-content:space-between;align-items:center;
                padding:16px 20px;
                background:rgba(0,0,0,0.5);
                border-bottom:1px solid rgba(255,255,255,0.05);
                border-radius:20px 20px 0 0;
                backdrop-filter:blur(10px);
            }
            #kh-title{display:flex;align-items:center;gap:12px;}
            #kh-name{font-size:20px;font-weight:900;letter-spacing:1px;animation:glow 3s infinite;}
            #kh-right{display:flex;align-items:center;gap:12px;}
            #kh-badge{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.02);padding:6px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.05);}
            #kh-dot{width:10px;height:10px;border-radius:50%;background:#888;transition:all 0.3s;}
            #kh-st{font-size:11px;color:#666;letter-spacing:1px;font-weight:bold;}
            #kh-close{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);color:#666;border-radius:8px;width:32px;height:32px;font-size:16px;cursor:pointer;transition:all 0.3s;}
            #kh-close:hover{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:#fff;}

            #kh-body{padding:20px;}
            .kh-section-title{font-size:12px;font-weight:bold;color:#666;margin:12px 0 8px;letter-spacing:2px;text-transform:uppercase;opacity:0.7;}
            .kh-sep{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent);margin:12px 0;}

            .kh-row{margin-bottom:12px;}
            .kh-rowlabel{display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:bold;margin-bottom:4px;}
            .kh-rowlabel span:first-child{opacity:0.6;}
            .kh-rowlabel span:last-child{color:#fff;text-shadow:0 0 20px var(--kh-glow, rgba(255,255,255,0.1));}
            .kh-rowlabel input[type=number]{width:80px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);color:#fff;border-radius:6px;padding:4px 8px;font-size:12px;text-align:center;transition:all 0.3s;}
            .kh-rowlabel input[type=number]:focus{outline:none;border-color:rgba(255,255,255,0.2);box-shadow:0 0 20px var(--kh-glow, rgba(255,255,255,0.02));}

            input[type=range]{-webkit-appearance:none;width:100%;height:4px;background:linear-gradient(90deg,rgba(255,255,255,0.1) var(--v,0%),rgba(255,255,255,0.02) var(--v,0%));border-radius:10px;outline:none;transition:all 0.3s;}
            input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;background:radial-gradient(circle at 30% 30%, #fff, #555);border:1px solid rgba(255,255,255,0.2);border-radius:50%;cursor:pointer;box-shadow:0 0 20px rgba(255,255,255,0.1);transition:all 0.3s;}
            input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.15);box-shadow:0 0 30px rgba(255,255,255,0.2);}

            #kh-rst,#kh-save{width:100%;padding:12px;margin-top:8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);color:#888;font-size:13px;font-weight:bold;border-radius:10px;cursor:pointer;transition:all 0.3s;}
            #kh-rst:hover,#kh-save:hover{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:#fff;transform:scale(1.02);}

            #config-select{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);color:#fff;border-radius:8px;}
            #config-select:focus{outline:none;border-color:rgba(255,255,255,0.15);}
            #config-select option{background:#1a1a1a;color:#fff;}

            #music-file{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);color:#fff;border-radius:4px;}
            #music-file::-webkit-file-upload-button{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);color:#fff;border-radius:4px;padding:4px 8px;cursor:pointer;}

            @media (max-width:480px){#kh-root{width:340px;right:10px;top:10px;}}
            `;
            document.head.appendChild(s);
        }
    };

    // ============================================================
    //  BOOT
    // ============================================================
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => UI.init());
    else UI.init();

    console.log('✅ HELLFIRE ÂM DƯƠNG SIÊU PHẨM - Bố Duy Khánh đã sẵn sàng!');
    console.log('☯️ UI Trắng Đen - Sóng nhảy trong GUI');
    console.log('🎵 Phát MP3 + Âm lượng đồng bộ config');
    console.log('🔥 SIÊU NÂNG CẤP: Hard Clip + Sub-Bass + Air Band + Transient Punch');
    console.log('🔊 Hệ thống âm thanh cực to, lấn át tối đa!');
})();