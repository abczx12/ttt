// hellfire.js - Bố Duy Khánh (CONFIG FULL - XÓA NHẸ, THÊM NẶNG)
// Copy toàn bộ, paste là dùng

(function () {
    'use strict';
    if (window.__BDK_SAKURA__) return;
    window.__BDK_SAKURA__ = true;

    console.log('🌸 HELLFIRE SAKURA - Bố Duy Khánh');

    // ═══════════════════════════════════════
    //  THÔNG SỐ
    // ═══════════════════════════════════════
    const P = {
        preGain: 1.0,
        drive: 0.15,
        crush: 0.0,
        width: 0.15,
        postGain: 1.5,
        bass: 0.15,
        treble: 0.25,
        echo: 0.08,
        reverb: 0.0,
        gateThreshold: 0.008,
        deEsser: 0.3,
    };

    // ═══════════════════════════════════════
    //  CONFIG - XÓA NHẸ, THÊM NẶNG
    // ═══════════════════════════════════════
    const SUGGESTIONS = {
        // ─── NẶNG ───
        '🔥 Lấn Át Cực Đỉnh': {
            desc: 'Bão hòa max, át hết mọi thứ',
            preGain: 500, drive: 1.0, crush: 0.6, width: 0.9,
            postGain: 8, bass: 1.0, treble: 0.7,
            echo: 0.35, reverb: 0.3, gateThreshold: 0.001, deEsser: 0.02
        },
        '💀 Chửi Nhau (Lấn Át)': {
            desc: 'Cực to, cực dày, át đối phương',
            preGain: 200, drive: 0.8, crush: 0.4, width: 0.6,
            postGain: 5, bass: 0.9, treble: 0.5,
            echo: 0.2, reverb: 0.15, gateThreshold: 0.002, deEsser: 0.05
        },
        '👹 Ác Quỷ': {
            desc: 'Trầm, bão hòa, đáng sợ',
            preGain: 300, drive: 0.9, crush: 0.7, width: 0.4,
            postGain: 6, bass: 1.0, treble: 0.1,
            echo: 0.25, reverb: 0.2, gateThreshold: 0.002, deEsser: 0.08
        },
        '🦇 Ma Cà Rồng': {
            desc: 'Giọng trầm, ẩm ương, bí ẩn',
            preGain: 350, drive: 0.7, crush: 0.6, width: 0.3,
            postGain: 6, bass: 0.9, treble: 0.2,
            echo: 0.3, reverb: 0.25, gateThreshold: 0.002, deEsser: 0.05
        },
        '🐺 Quái Vật': {
            desc: 'Giọng quái vật, méo mó, đáng sợ',
            preGain: 400, drive: 0.9, crush: 0.8, width: 0.4,
            postGain: 7, bass: 0.7, treble: 0.6,
            echo: 0.4, reverb: 0.3, gateThreshold: 0.001, deEsser: 0.02
        },
        '📢 Mic Xịn (To Rõ)': {
            desc: 'Mic xịn, to, rõ từng chữ, ồn',
            preGain: 60, drive: 0.3, crush: 0.1, width: 0.3,
            postGain: 3, bass: 0.3, treble: 0.5,
            echo: 0.08, reverb: 0.1, gateThreshold: 0.005, deEsser: 0.2
        },
        '📢 Mic Xịn Cực Đỉnh': {
            desc: 'Mic xịn nhất, to, rõ, ồn, lấn át',
            preGain: 150, drive: 0.4, crush: 0.2, width: 0.4,
            postGain: 4, bass: 0.4, treble: 0.6,
            echo: 0.15, reverb: 0.2, gateThreshold: 0.003, deEsser: 0.15
        },
        '🔊 Ồn Lấn Át': {
            desc: 'Gây khó chịu, lấn át cực mạnh',
            preGain: 600, drive: 0.9, crush: 0.7, width: 0.8,
            postGain: 9, bass: 0.9, treble: 0.7,
            echo: 0.4, reverb: 0.35, gateThreshold: 0.001, deEsser: 0.01
        },
        '🌀 Vang Khó Chịu': {
            desc: 'Vang cực mạnh, echo dài, gây ức chế',
            preGain: 250, drive: 0.5, crush: 0, width: 0.6,
            postGain: 5, bass: 0.5, treble: 0.6,
            echo: 1.0, reverb: 0.8, gateThreshold: 0.002, deEsser: 0.05
        },
        '💥 Bom Nổ': {
            desc: 'Cực to, cực bão hòa, cực vang',
            preGain: 800, drive: 1.0, crush: 0.8, width: 1.0,
            postGain: 10, bass: 1.0, treble: 0.8,
            echo: 0.5, reverb: 0.4, gateThreshold: 0.001, deEsser: 0.01
        },
        '🔊 Loa Phường': {
            desc: 'Giọng loa phường, vang xa, ồn ào',
            preGain: 400, drive: 0.6, crush: 0.3, width: 0.8,
            postGain: 7, bass: 0.8, treble: 0.6,
            echo: 0.4, reverb: 0.3, gateThreshold: 0.002, deEsser: 0.02
        },
        '🤖 Robot Bão Tố': {
            desc: 'Robot điên loạn, bão hòa max',
            preGain: 350, drive: 1.0, crush: 0.9, width: 0,
            postGain: 6, bass: 0, treble: 1.0,
            echo: 0.3, reverb: 0.2, gateThreshold: 0.001, deEsser: 0
        },
        '🤖 Robot Tận Thế': {
            desc: 'Robot hủy diệt, méo max, ồn max',
            preGain: 500, drive: 1.0, crush: 1.0, width: 0,
            postGain: 8, bass: 0, treble: 1.0,
            echo: 0.5, reverb: 0.3, gateThreshold: 0, deEsser: 0
        },
        '💀 Chết Tiếng Cực Hạn': {
            desc: 'Gần hỏng mic, cực méo, cực ồn',
            preGain: 1500, drive: 1.0, crush: 0.9, width: 1.0,
            postGain: 15, bass: 1.0, treble: 1.0,
            echo: 0.5, reverb: 0.4, gateThreshold: 0, deEsser: 0
        },
        '🌀 Bão Echo': {
            desc: 'Echo chồng echo, cực vang, cực loạn',
            preGain: 200, drive: 0.5, crush: 0, width: 0.8,
            postGain: 5, bass: 0.5, treble: 0.5,
            echo: 1.5, reverb: 1.0, gateThreshold: 0.001, deEsser: 0
        },
        '🌊 Sóng Thần': {
            desc: 'Ầm ầm như sóng thần ập tới',
            preGain: 700, drive: 0.9, crush: 0.7, width: 0.9,
            postGain: 10, bass: 1.0, treble: 0.5,
            echo: 0.6, reverb: 0.5, gateThreshold: 0.001, deEsser: 0.01
        },
        '🔥 Núi Lửa Phun': {
            desc: 'Giọng như núi lửa đang phun trào',
            preGain: 550, drive: 0.8, crush: 0.6, width: 0.7,
            postGain: 9, bass: 0.9, treble: 0.4,
            echo: 0.5, reverb: 0.4, gateThreshold: 0.001, deEsser: 0.02
        },
        '🌀 Lốc Xoáy': {
            desc: 'Giọng như bị cuốn vào lốc xoáy',
            preGain: 300, drive: 0.9, crush: 0.5, width: 1.0,
            postGain: 6, bass: 0.5, treble: 0.8,
            echo: 0.7, reverb: 0.6, gateThreshold: 0.001, deEsser: 0.01
        },
        '💀 Thần Chết': {
            desc: 'Giọng lạnh lùng, đáng sợ nhất',
            preGain: 450, drive: 0.8, crush: 0.9, width: 0.4,
            postGain: 8, bass: 0.8, treble: 0.2,
            echo: 0.3, reverb: 0.25, gateThreshold: 0.002, deEsser: 0.05
        },
    };

    // ═══════════════════════════════════════
    //  WORKLET
    // ═══════════════════════════════════════
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
                { name:'reverb',   defaultValue:0,   min:0,     max:99999999 },
                { name:'gateThreshold', defaultValue:0.005, min:0, max:99999999 },
                { name:'deEsser',  defaultValue:0,    min:0,     max:99999999 },
            ];
        }
        constructor() {
            super();
            this.SR = sampleRate || 48000;
            this._limL = 1; this._limR = 1;
            this._echoBufL = 0; this._echoBufR = 0;
            this._gateL = 1; this._gateR = 1;
            this._deEsserL = 0; this._deEsserR = 0;
            this._rvBufL = new Float32Array(48000);
            this._rvBufR = new Float32Array(48000);
            this._rvIdxL = 0;
            this._rvIdxR = 0;
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
        _reverb(x, amount) {
            if (amount < 0.001) return x;
            const delay = Math.floor(this.SR * 0.05 * amount);
            const idx = (this._rvIdxL - delay + this._rvBufL.length) % this._rvBufL.length;
            const out = this._rvBufL[idx] * amount * 0.6;
            this._rvBufL[this._rvIdxL] = x + out * 0.3;
            this._rvIdxL = (this._rvIdxL + 1) % this._rvBufL.length;
            return x + out;
        }
        process(inputs, outputs, params) {
            const inp = inputs[0];
            const out = outputs[0];
            if (!inp || inp.length === 0) return true;
            const preGain = params.preGain[0];
            const drive = params.drive[0];
            const crush = params.crush[0];
            const width = params.width[0];
            const postGain = params.postGain[0];
            const bass = params.bass[0];
            const treble = params.treble[0];
            const echo = params.echo[0];
            const reverb = params.reverb[0];
            const gateTh = params.gateThreshold[0];
            const deEsser = params.deEsser[0];
            for (let i = 0; i < inp[0].length; i++) {
                let L = inp[0][i] * preGain;
                let R = (inp[1] ? inp[1][i] : inp[0][i]) * preGain;
                L = this._noiseGate(L, gateTh);
                R = this._noiseGate(R, gateTh);
                L = this._deEsser(L, deEsser);
                R = this._deEsser(R, deEsser);
                L = this._bassBoost(L, bass);
                R = this._bassBoost(R, bass);
                L = this._trebleBoost(L, treble);
                R = this._trebleBoost(R, treble);
                L = this._sat(L, drive);
                R = this._sat(R, drive);
                if (crush > 0) {
                    const th = Math.max(0.001, 1.0 - crush * 0.98);
                    L = Math.max(-th, Math.min(th, L)) / th;
                    R = Math.max(-th, Math.min(th, R)) / th;
                }
                if (width > 0) {
                    const mid = (L + R) * 0.5;
                    const side = (L - R) * 0.5 * (1 + width * 1.5);
                    L = mid + side;
                    R = mid - side;
                }
                L = this._echo(L, echo);
                R = this._echo(R, echo);
                L = this._reverb(L, reverb);
                R = this._reverb(R, reverb);
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

    // ═══════════════════════════════════════
    //  HOOK HỆ THỐNG
    // ═══════════════════════════════════════
    const NativeAC = window.AudioContext || window.webkitAudioContext;
    let _ctx = null;
    let _node = null;
    let _isRunning = false;
    let _stream = null;
    let playbackSource = null;

    async function initAudio() {
        try {
            _ctx = new NativeAC({ latencyHint: 'interactive', sampleRate: 48000 });
            const blob = new Blob([WORKLET], { type: 'application/javascript' });
            await _ctx.audioWorklet.addModule(URL.createObjectURL(blob));
            setStatus(true, 'SẴN SÀNG');
            return true;
        } catch (e) {
            console.error('Init error:', e);
            setStatus(false, 'LỖI');
            return false;
        }
    }

    async function startMic() {
        if (_isRunning) return;
        if (!_ctx) {
            const ok = await initAudio();
            if (!ok) return;
        }
        try {
            _stream = await navigator.mediaDevices.getUserMedia({
                audio: { autoGainControl: false, echoCancellation: false, noiseSuppression: false, channelCount: 2 }
            });
            const src = _ctx.createMediaStreamSource(_stream);
            const dest = _ctx.createMediaStreamDestination();
            _node = new AudioWorkletNode(_ctx, 'boduytadao', { numberOfOutputs: 1, outputChannelCount: [2] });
            _node.parameters.get('preGain').setTargetAtTime(P.preGain, _ctx.currentTime, 0.015);
            _node.parameters.get('drive').setTargetAtTime(P.drive, _ctx.currentTime, 0.015);
            _node.parameters.get('crush').setTargetAtTime(P.crush, _ctx.currentTime, 0.015);
            _node.parameters.get('width').setTargetAtTime(P.width, _ctx.currentTime, 0.015);
            _node.parameters.get('postGain').setTargetAtTime(P.postGain, _ctx.currentTime, 0.015);
            _node.parameters.get('bass').setTargetAtTime(P.bass, _ctx.currentTime, 0.015);
            _node.parameters.get('treble').setTargetAtTime(P.treble, _ctx.currentTime, 0.015);
            _node.parameters.get('echo').setTargetAtTime(P.echo, _ctx.currentTime, 0.015);
            _node.parameters.get('reverb').setTargetAtTime(P.reverb, _ctx.currentTime, 0.015);
            _node.parameters.get('gateThreshold').setTargetAtTime(P.gateThreshold, _ctx.currentTime, 0.015);
            _node.parameters.get('deEsser').setTargetAtTime(P.deEsser, _ctx.currentTime, 0.015);
            src.connect(_node);
            _node.connect(dest);
            _isRunning = true;
            setStatus(true, 'BẬT');
            console.log('🎤 Mic started');
        } catch (e) {
            console.error('Start mic error:', e);
            setStatus(false, 'LỖI MIC');
        }
    }

    function stopMic() {
        if (_node) { _node.disconnect();
            _node = null; }
        if (_stream) { _stream.getTracks().forEach(t => t.stop());
            _stream = null; }
        if (playbackSource) { playbackSource.stop();
            playbackSource = null; }
        _isRunning = false;
        setStatus(false, 'TẮT');
        console.log('⏹ Mic stopped');
    }

    function applyConfig(config) {
        Object.assign(P, config);
        if (_node && _ctx) {
            const t = _ctx.currentTime;
            _node.parameters.get('preGain').setTargetAtTime(P.preGain, t, 0.015);
            _node.parameters.get('drive').setTargetAtTime(P.drive, t, 0.015);
            _node.parameters.get('crush').setTargetAtTime(P.crush, t, 0.015);
            _node.parameters.get('width').setTargetAtTime(P.width, t, 0.015);
            _node.parameters.get('postGain').setTargetAtTime(P.postGain, t, 0.015);
            _node.parameters.get('bass').setTargetAtTime(P.bass, t, 0.015);
            _node.parameters.get('treble').setTargetAtTime(P.treble, t, 0.015);
            _node.parameters.get('echo').setTargetAtTime(P.echo, t, 0.015);
            _node.parameters.get('reverb').setTargetAtTime(P.reverb, t, 0.015);
            _node.parameters.get('gateThreshold').setTargetAtTime(P.gateThreshold, t, 0.015);
            _node.parameters.get('deEsser').setTargetAtTime(P.deEsser, t, 0.015);
        }
        updateUI();
        console.log('✅ Config applied');
    }

    // ═══════════════════════════════════════
    //  UI
    // ═══════════════════════════════════════
    function setStatus(active, text) {
        const dot = document.getElementById('kh-dot');
        const label = document.getElementById('kh-st');
        if (dot) { dot.className = (active ? 'active' : '') + ' kh-dot'; }
        if (label) { label.textContent = text;
            label.className = (active ? 'active' : '') + ' kh-st'; }
    }

    function updateUI() {
        const map = {
            'preGain': 'sl-pg',
            'drive': 'sl-dr',
            'crush': 'sl-cr',
            'width': 'sl-wd',
            'postGain': 'sl-po',
            'bass': 'sl-bs',
            'treble': 'sl-tr',
            'echo': 'sl-ec',
            'reverb': 'sl-rv',
            'gateThreshold': 'sl-gt',
            'deEsser': 'sl-de',
        };
        Object.keys(map).forEach(key => {
            const el = document.getElementById(map[key]);
            const lb = document.getElementById(map[key] + '-lb');
            if (el) {
                const val = P[key] || 0;
                el.value = val;
                const pct = Math.min(100, (val / (val + 1)) * 100);
                el.style.setProperty('--v', pct + '%');
            }
            if (lb) {
                const val = P[key] || 0;
                if (key === 'preGain' || key === 'postGain') lb.textContent = val.toFixed(1) + 'x';
                else if (key === 'gateThreshold') lb.textContent = val.toFixed(3);
                else lb.textContent = val.toFixed(2);
            }
        });
        document.querySelectorAll('.preset-btn').forEach(b => {
            const key = b.dataset.key;
            if (key && SUGGESTIONS[key]) {
                const cfg = SUGGESTIONS[key];
                const isActive = JSON.stringify(P) === JSON.stringify(cfg);
                b.style.background = isActive ? '#ff335540' : 'transparent';
                b.style.borderColor = isActive ? '#ff3355' : '#ff335540';
                b.style.color = isActive ? '#ff3355' : '#ff8888';
            }
        });
    }

    // ═══════════════════════════════════════
    //  SAKURA EFFECT
    // ═══════════════════════════════════════
    function createSakura() {
        const container = document.getElementById('sakuraContainer');
        if (!container) return;
        for (let i = 0; i < 30; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = (5 + Math.random() * 10) + 's';
            petal.style.animationDelay = (Math.random() * 10) + 's';
            petal.style.width = (6 + Math.random() * 10) + 'px';
            petal.style.height = petal.style.width;
            petal.style.opacity = 0.4 + Math.random() * 0.5;
            container.appendChild(petal);
        }
    }

    // ═══════════════════════════════════════
    //  BUILD UI
    // ═══════════════════════════════════════
    function buildUI() {
        const style = document.createElement('style');
        style.textContent = `
            #kh-root {
                position: fixed;
                top: 10px;
                right: 10px;
                width: 380px;
                max-height: 95vh;
                overflow-y: auto;
                background: rgba(10, 0, 0, 0.92);
                border: 2px solid #ff3355;
                border-radius: 16px;
                box-shadow: 0 0 60px #ff335540, inset 0 0 60px #ff335520;
                font-family: 'Segoe UI', sans-serif;
                color: #ff8888;
                z-index: 999998;
                user-select: none;
                backdrop-filter: blur(10px);
            }
            #kh-root::-webkit-scrollbar { width: 4px; }
            #kh-root::-webkit-scrollbar-thumb { background: #ff335540; border-radius: 4px; }
            #sakuraContainer {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 999997;
                overflow: hidden;
            }
            .petal {
                position: absolute;
                top: -20px;
                background: radial-gradient(ellipse at center, #ff6b8a, #ff3355);
                border-radius: 50% 0 50% 50%;
                opacity: 0.6;
                animation: sakuraFall linear infinite;
                pointer-events: none;
            }
            @keyframes sakuraFall {
                0% { transform: translateY(-20px) rotate(0deg) scale(0.8); }
                100% { transform: translateY(110vh) rotate(720deg) scale(1.2); }
            }
            #kh-head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                background: rgba(20, 0, 0, 0.9);
                border-bottom: 1px solid #ff335540;
                border-radius: 16px 16px 0 0;
            }
            #kh-title {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 18px;
                font-weight: 900;
                color: #ff3355;
                text-shadow: 0 0 30px #ff3355;
            }
            #kh-badge {
                display: flex;
                align-items: center;
                gap: 6px;
                background: rgba(20, 0, 0, 0.8);
                padding: 4px 12px;
                border-radius: 12px;
                border: 1px solid #ff335540;
            }
            .kh-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #444;
                transition: all 0.3s;
            }
            .kh-dot.active { background: #ff3355; box-shadow: 0 0 20px #ff3355; }
            .kh-st {
                font-size: 10px;
                color: #888;
                letter-spacing: 1px;
                font-weight: bold;
            }
            .kh-st.active { color: #ff3355; }
            #kh-close {
                background: none;
                border: 1px solid #ff335540;
                color: #ff3355;
                border-radius: 6px;
                width: 28px;
                height: 28px;
                font-size: 14px;
                cursor: pointer;
            }
            #kh-close:hover { background: #ff335520; border-color: #ff3355; }
            #kh-body { padding: 16px; }
            .kh-section-title {
                font-size: 11px;
                font-weight: bold;
                color: #ff3355;
                margin: 8px 0 6px;
                letter-spacing: 1px;
            }
            #kh-presets {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4px;
                margin-bottom: 8px;
            }
            .preset-btn {
                padding: 4px 8px;
                font-size: 10px;
                font-weight: bold;
                background: transparent;
                border: 1px solid #ff335540;
                color: #ff8888;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
                text-align: left;
                line-height: 1.3;
            }
            .preset-btn:hover { background: #ff335520; border-color: #ff3355; color: #ff3355; }
            .preset-btn .desc { font-size: 8px; color: #666; display: block; font-weight: normal; }
            .kh-btn {
                width: 100%;
                padding: 10px;
                border: 1px solid #ff335540;
                border-radius: 8px;
                font-size: 13px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s;
                margin: 4px 0;
                background: transparent;
                color: #ff8888;
            }
            .kh-btn:hover { background: #ff335520; border-color: #ff3355; color: #ff3355; }
            .kh-btn-primary { background: #ff3355; color: #1a0a0a; border-color: #ff3355; }
            .kh-btn-primary:hover { background: #ff4466; transform: scale(1.02); }
            .kh-btn-danger { border-color: #ff3355; color: #ff3355; }
            .kh-btn-danger:hover { background: #ff335520; }
            .kh-sep {
                height: 1px;
                background: linear-gradient(90deg, transparent, #ff335540, transparent);
                margin: 8px 0;
            }
            .kh-row { margin: 6px 0; }
            .kh-rowlabel {
                display: flex;
                justify-content: space-between;
                font-size: 11px;
                font-weight: bold;
                margin-bottom: 2px;
            }
            .kh-rowlabel span:last-child { color: #ff6b8a; text-shadow: 0 0 10px #ff335540; }
            .kh-rowlabel input[type="number"] {
                width: 70px;
                background: rgba(20, 0, 0, 0.8);
                border: 1px solid #ff335540;
                color: #ff8888;
                border-radius: 4px;
                padding: 2px 4px;
                font-size: 11px;
                text-align: center;
            }
            .kh-rowlabel input[type="number"]:focus {
                outline: none;
                border-color: #ff3355;
                box-shadow: 0 0 15px #ff335540;
            }
            input[type="range"] {
                -webkit-appearance: none;
                width: 100%;
                height: 4px;
                background: linear-gradient(90deg, #ff3355 var(--v, 0%), #2a0a0a var(--v, 0%));
                border-radius: 4px;
                outline: none;
            }
            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 16px;
                height: 16px;
                background: #1a0a0a;
                border: 2px solid #ff3355;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 12px #ff335540;
            }
            .playback-area {
                display: flex;
                gap: 8px;
                align-items: center;
                margin: 8px 0;
            }
            .playback-area input[type="file"] { display: none; }
            .playback-area label {
                padding: 6px 12px;
                border: 1px solid #ff335540;
                border-radius: 6px;
                font-size: 11px;
                cursor: pointer;
                color: #ff8888;
                transition: all 0.2s;
            }
            .playback-area label:hover { background: #ff335520; border-color: #ff3355; color: #ff3355; }
            @media (max-width: 480px) {
                #kh-root { width: 320px; right: 5px; top: 5px; }
                #kh-presets { grid-template-columns: 1fr 1fr; }
            }
        `;
        document.head.appendChild(style);

        const sakura = document.createElement('div');
        sakura.id = 'sakuraContainer';
        document.body.appendChild(sakura);

        const el = document.createElement('div');
        el.id = 'kh-root';
        el.innerHTML = `
            <div id="kh-head">
                <div id="kh-title">🌸 BỐ DUY KHÁNH</div>
                <div id="kh-right">
                    <div id="kh-badge"><span class="kh-dot" id="kh-dot"></span><span class="kh-st" id="kh-st">CHỜ</span></div>
                    <button id="kh-close">✕</button>
                </div>
            </div>
            <div id="kh-body">
                <div class="kh-section-title">🌸 PRESET</div>
                <div id="kh-presets">
                    ${Object.keys(SUGGESTIONS).map(key => `
                        <button class="preset-btn" data-key="${key}">
                            ${key}
                            <span class="desc">${SUGGESTIONS[key].desc}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="kh-sep"></div>
                <button class="kh-btn kh-btn-primary" id="btnStart">🎤 BẬT MIC</button>
                <button class="kh-btn kh-btn-danger" id="btnStop">⏹ TẮT MIC</button>
                <div class="kh-sep"></div>
                <div class="kh-section-title">📁 PLAYBACK</div>
                <div class="playback-area">
                    <label for="fileInput">📂 CHỌN FILE</label>
                    <input type="file" id="fileInput" accept="audio/*">
                    <button class="kh-btn" id="btnPlaybackStop" style="flex:1;padding:6px;">⏹ DỪNG</button>
                </div>
                <div class="kh-sep"></div>
                ${[
                    ['sl-pg', 'lb-pg', '🔊 TIỀN KHUẾCH', 'preGain', '1.0x'],
                    ['sl-dr', 'lb-dr', '🔥 DRIVE', 'drive', '0.00'],
                    ['sl-cr', 'lb-cr', '💥 NÉN', 'crush', '0.00'],
                    ['sl-wd', 'lb-wd', '📢 MỞ RỘNG', 'width', '0.00'],
                    ['sl-po', 'lb-po', '⚡ HẬU KHUẾCH', 'postGain', '1.0x'],
                    ['sl-bs', 'lb-bs', '🎸 BASS', 'bass', '0.00'],
                    ['sl-tr', 'lb-tr', '🎵 TREBLE', 'treble', '0.00'],
                    ['sl-ec', 'lb-ec', '🔊 VANG', 'echo', '0.00'],
                    ['sl-rv', 'lb-rv', '🌀 REVERB', 'reverb', '0.00'],
                    ['sl-gt', 'lb-gt', '🔇 LỌC NHIỄU', 'gateThreshold', '0.000'],
                    ['sl-de', 'lb-de', '🗣️ LỌC XÌ', 'deEsser', '0.00'],
                ].map(([id, lb, label, param, def]) => `
                    <div class="kh-row">
                        <div class="kh-rowlabel">
                            <span>${label}</span>
                            <div style="display:flex;gap:6px;align-items:center;">
                                <span id="${lb}">${def}</span>
                                <input type="number" id="num-${param}" value="${def}" step="0.01">
                            </div>
                        </div>
                        <input type="range" id="${id}" min="0" max="1000" step="1" value="0" style="--v:0%">
                    </div>
                `).join('')}
                <div class="kh-sep"></div>
                <button class="kh-btn" id="kh-rst">↺ KHÔI PHỤC</button>
            </div>
        `;
        document.body.appendChild(el);

        // ─── EVENTS ───
        document.getElementById('kh-close').onclick = () => {
            document.getElementById('kh-root').style.display = 'none';
        };

        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.onclick = () => {
                const key = btn.dataset.key;
                if (key && SUGGESTIONS[key]) {
                    applyConfig(SUGGESTIONS[key]);
                }
            };
        });

        document.getElementById('btnStart').addEventListener('click', startMic);
        document.getElementById('btnStop').addEventListener('click', stopMic);

        document.getElementById('fileInput').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            if (!_ctx) await initAudio();
            const arrayBuffer = await file.arrayBuffer();
            const audioBuffer = await _ctx.decodeAudioData(arrayBuffer);
            if (playbackSource) playbackSource.stop();
            playbackSource = _ctx.createBufferSource();
            playbackSource.buffer = audioBuffer;
            if (_node) playbackSource.connect(_node);
            else playbackSource.connect(_ctx.destination);
            playbackSource.start();
            console.log('▶️ Playback started');
        });

        document.getElementById('btnPlaybackStop').onclick = () => {
            if (playbackSource) {
                playbackSource.stop();
                playbackSource = null;
                console.log('⏹ Playback stopped');
            }
        };

        document.getElementById('kh-rst').onclick = () => {
            applyConfig({ preGain: 1, drive: 0, crush: 0, width: 0, postGain: 1, bass: 0, treble: 0, echo: 0, reverb: 0, gateThreshold: 0.005, deEsser: 0 });
        };

        // ─── BIND SLIDERS ───
        const bindMap = {
            'preGain': { scale: 1000 },
            'drive': { scale: 1000 },
            'crush': { scale: 1000 },
            'width': { scale: 1000 },
            'postGain': { scale: 20 },
            'bass': { scale: 1000 },
            'treble': { scale: 1000 },
            'echo': { scale: 1000 },
            'reverb': { scale: 1000 },
            'gateThreshold': { scale: 0.05 },
            'deEsser': { scale: 1000 },
        };

        Object.keys(bindMap).forEach(key => {
            const sl = document.getElementById('sl-' + key);
            const num = document.getElementById('num-' + key);
            if (!sl || !num) return;
            const update = () => {
                let val = parseFloat(sl.value);
                if (key === 'gateThreshold') val = val * 0.05;
                else if (key === 'postGain') val = val * 0.02;
                else if (key === 'preGain') val = val * 1;
                else val = val / 1000;
                P[key] = val;
                num.value = val.toFixed(4);
                if (_node && _ctx) {
                    _node.parameters.get(key).setTargetAtTime(val, _ctx.currentTime, 0.015);
                }
                updateUI();
            };
            sl.addEventListener('input', update);
            num.addEventListener('input', () => {
                let val = parseFloat(num.value) || 0;
                P[key] = val;
                let sliderVal = val;
                if (key === 'gateThreshold') sliderVal = val / 0.05;
                else if (key === 'postGain') sliderVal = val / 0.02;
                else if (key === 'preGain') sliderVal = val;
                else sliderVal = val * 1000;
                sl.value = Math.min(1000, Math.max(0, sliderVal));
                if (_node && _ctx) {
                    _node.parameters.get(key).setTargetAtTime(val, _ctx.currentTime, 0.015);
                }
                updateUI();
            });
        });

        createSakura();
        initAudio();
        setStatus(false, 'CHỜ');
        updateUI();
        console.log('🌸 HELLFIRE SAKURA - Bố Duy Khánh đã sẵn sàng!');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildUI);
    } else {
        buildUI();
    }

})();