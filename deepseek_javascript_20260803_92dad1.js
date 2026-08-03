// hellfire_linoria_bg.js - Bố Duy Khánh LINORIA EDITION
// Nút bật tắt từ ảnh + Background từ ảnh + UI đỏ đen

(function () {
    'use strict';
    if (window.__BDK_LINORIA_BG__) return;
    window.__BDK_LINORIA_BG__ = true;

    console.log('%c🔥 HELLFIRE LINORIA BG - Bố Duy Khánh', 'font-size:24px;font-weight:bold;color:#ff6b6b;text-shadow:0 0 40px #ff6b6b;');

    // ============================================================
    //  CẤU HÌNH ẢNH
    // ============================================================
    const IMAGES = {
        // Nút bật tắt (hình vuông)
        toggle: 'https://raw.githubusercontent.com/abczx12/image/main/Screenshot_2026-08-03-22-39-25-863_com.android.chrome-edit.jpg',
        // Background UI (tự kéo dài)
        background: 'https://raw.githubusercontent.com/abczx12/image/main/Screenshot_2026-08-03-22-40-23-148_com.android.chrome-edit.jpg',
    };

    // ============================================================
    //  THAM SỐ
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
        hardClip: 0.0,
        subBass: 0.0,
        airBand: 0.0,
        transientPunch: 0.0,
        musicVolume: 0.5,
        musicSync: true,
    };

    // ============================================================
    //  CONFIG LIST
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
    //  WORKLET
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
                        UI.badge('SẴN SÀNG', '#ff6b6b');
                        showToast('🔥 Hệ thống âm thanh sẵn sàng!', 'success');
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
            UI.badge('BẬT', '#ff6b6b');
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
    //  APPLY CONFIG
    // ============================================================
    function applyConfig(config) {
        Object.assign(P, config);
        Core.push();
        syncUI();
        updateInputs();
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
    //  SHOW TOAST
    // ============================================================
    function showToast(message, type = 'info', duration = 2500) {
        const toast = document.createElement('div');
        const colors = {
            info: '#888',
            success: '#4caf50',
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
        const height = canvas.height = 60;

        visualizerRunning = true;
        drawFakeVisualizer(ctx, width, height);
    }

    function drawFakeVisualizer(ctx, width, height) {
        if (!visualizerRunning) return;

        ctx.clearRect(0, 0, width, height);

        const barCount = 50;
        const barWidth = width / barCount;
        const time = Date.now() / 1000;

        for (let i = 0; i < barCount; i++) {
            const value = (Math.sin(time * 2 + i * 0.15) * 0.4 + 
                          Math.sin(time * 1.3 + i * 0.25) * 0.3 + 
                          Math.sin(time * 0.7 + i * 0.35) * 0.3) * 0.5 + 0.5;
            const barHeight = Math.max(2, value * height * 0.85);

            // Màu đỏ đen
            const red = Math.round(100 + value * 155);
            const brightness = Math.round(100 + value * 50);
            ctx.fillStyle = `rgb(${red}, 0, ${brightness * 0.2})`;
            ctx.shadowColor = value > 0.6 ? 'rgba(255,0,0,0.3)' : 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = value > 0.6 ? 12 : 0;
            ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
            ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.strokeStyle = 'rgba(255,0,0,0.1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

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
    //  UI LINORIA - ĐỎ ĐEN + ẢNH NỀN + NÚT BẬT TẮT
    // ============================================================
    const UI = {
        badge(t, c) {
            const e = document.getElementById('kh-st'),
                d = document.getElementById('kh-dot');
            if (e) { e.innerText = t; e.style.color = c; }
            if (d) { d.style.background = c; d.style.boxShadow = '0 0 10px ' + c; }
        },
        init() {
            // Nút bật tắt bằng ảnh - hình vuông
            const toggleBtn = document.createElement('img');
            toggleBtn.id = 'kh-toggle';
            toggleBtn.src = IMAGES.toggle;
            toggleBtn.style.cssText = `
                position:fixed;right:10px;top:50%;transform:translateY(-50%);
                z-index:999999;
                width:40px;
                height:40px;
                cursor:pointer;
                border:2px solid rgba(255,0,0,0.3);
                border-radius:4px;
                transition:all 0.3s ease;
                box-shadow:0 0 20px rgba(255,0,0,0.2);
                object-fit:cover;
            `;
            toggleBtn.onmouseenter = () => {
                toggleBtn.style.borderColor = 'rgba(255,0,0,0.8)';
                toggleBtn.style.boxShadow = '0 0 40px rgba(255,0,0,0.4)';
                toggleBtn.style.transform = 'translateY(-50%) scale(1.05)';
            };
            toggleBtn.onmouseleave = () => {
                toggleBtn.style.borderColor = 'rgba(255,0,0,0.3)';
                toggleBtn.style.boxShadow = '0 0 20px rgba(255,0,0,0.2)';
                toggleBtn.style.transform = 'translateY(-50%) scale(1)';
            };
            document.body.appendChild(toggleBtn);

            // Main UI
            const el = document.createElement('div');
            el.id = 'kh-root';
            el.style.cssText = `
                position:fixed;top:50%;right:55px;transform:translateY(-50%);
                width:380px;
                max-height:85vh;
                background:rgba(10,10,10,0.92);
                backdrop-filter:blur(20px);
                border:1px solid rgba(255,0,0,0.2);
                border-radius:8px 0 0 8px;
                box-shadow:-4px 0 40px rgba(0,0,0,0.6);
                font-family:'Segoe UI',system-ui,sans-serif;
                color:#fff;
                z-index:999998;
                user-select:none;
                overflow:hidden;
                transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                display:none;
                border-right:none;
            `;

            // Background image
            const bgImg = document.createElement('div');
            bgImg.style.cssText = `
                position:absolute;top:0;left:0;width:100%;height:100%;
                background-image:url(${IMAGES.background});
                background-size:cover;
                background-position:center;
                opacity:0.15;
                z-index:0;
                pointer-events:none;
            `;
            el.appendChild(bgImg);

            // Overlay đỏ đen
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position:absolute;top:0;left:0;width:100%;height:100%;
                background:linear-gradient(135deg, rgba(10,10,10,0.8) 0%, rgba(30,0,0,0.7) 100%);
                z-index:1;
                pointer-events:none;
            `;
            el.appendChild(overlay);

            // Content
            const content = document.createElement('div');
            content.style.cssText = `
                position:relative;z-index:2;
                display:flex;flex-direction:column;height:100%;
            `;

            content.innerHTML = `
            <!-- HEADER -->
            <div id="kh-head" style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:rgba(0,0,0,0.6);border-bottom:1px solid rgba(255,0,0,0.15);">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:14px;font-weight:900;color:#ff6b6b;">HELLFIRE</span>
                    <span style="font-size:10px;color:#888;font-weight:bold;letter-spacing:1px;">LINORIA</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                    <span id="kh-dot" style="width:6px;height:6px;border-radius:50%;background:#ff6b6b;display:inline-block;"></span>
                    <span id="kh-st" style="font-size:9px;color:#888;letter-spacing:1px;font-weight:bold;">ON</span>
                </div>
            </div>

            <!-- BODY -->
            <div id="kh-body" style="padding:12px 16px;overflow-y:auto;max-height:calc(85vh - 50px);">
                <!-- CONFIG DROPDOWN -->
                <div style="margin-bottom:10px;">
                    <div style="font-size:10px;color:#666;margin-bottom:4px;letter-spacing:1px;font-weight:bold;">CONFIG</div>
                    <select id="config-select" style="width:100%;padding:6px 10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,0,0,0.15);color:#fff;border-radius:4px;font-size:12px;cursor:pointer;outline:none;">
                        <option value="">-- Select Config --</option>
                        ${CONFIG_LIST.map((c, i) => `
                            <option value="${i}">${c.name} - ${c.desc}</option>
                        `).join('')}
                    </select>
                    <div id="config-info" style="font-size:9px;color:#444;margin-top:4px;padding:4px 8px;background:rgba(255,255,255,0.02);border-radius:4px;border:1px solid rgba(255,0,0,0.05);">
                        💡 Select config to apply
                    </div>
                </div>

                <!-- VISUALIZER -->
                <div style="background:rgba(0,0,0,0.5);border-radius:4px;padding:6px;margin-bottom:10px;border:1px solid rgba(255,0,0,0.08);">
                    <canvas id="kh-visualizer" style="width:100%;height:50px;display:block;border-radius:3px;"></canvas>
                </div>

                <!-- MUSIC PLAYER -->
                <div style="display:flex;gap:6px;margin-bottom:10px;align-items:center;">
                    <input type="file" id="music-file" accept="audio/*" style="flex:1;background:rgba(255,255,255,0.02);border:1px solid rgba(255,0,0,0.08);color:#fff;border-radius:4px;padding:4px 6px;font-size:10px;">
                    <button id="music-play" style="padding:4px 12px;background:rgba(255,0,0,0.1);border:1px solid rgba(255,0,0,0.15);color:#ff6b6b;border-radius:4px;cursor:pointer;font-size:10px;white-space:nowrap;">▶ PLAY</button>
                    <span id="music-status" style="font-size:9px;color:#666;min-width:60px;">Chọn file</span>
                </div>

                <!-- VOLUME SLIDER -->
                <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;padding:4px 8px;background:rgba(255,0,0,0.03);border-radius:4px;border:1px solid rgba(255,0,0,0.05);">
                    <span style="font-size:10px;color:#666;min-width:30px;">🔊</span>
                    <input type="range" id="sl-mv" min="0" max="100" step="1" value="50" style="flex:1;--v:50%;height:3px;background:linear-gradient(90deg,#ff6b6b var(--v,0%),rgba(255,0,0,0.1) var(--v,0%));">
                    <span id="lb-mv" style="font-size:10px;color:#ff6b6b;min-width:35px;text-align:right;">50%</span>
                    <button id="btn-sync-music" style="padding:2px 6px;background:rgba(255,0,0,0.05);border:1px solid rgba(255,0,0,0.08);color:#888;border-radius:3px;cursor:pointer;font-size:8px;white-space:nowrap;">SYNC</button>
                </div>

                <div style="border-top:1px solid rgba(255,0,0,0.08);margin:6px 0;"></div>

                <!-- SLIDERS -->
                ${[
                    ['sl-pg', 'lb-pg', 'num-pg', 'PRE GAIN', '1.0x', 'preGain'],
                    ['sl-dr', 'lb-dr', 'num-dr', 'DRIVE', '0.00', 'drive'],
                    ['sl-cr', 'lb-cr', 'num-cr', 'CRUSH', '0.00', 'crush'],
                    ['sl-wd', 'lb-wd', 'num-wd', 'WIDTH', '0.00', 'width'],
                    ['sl-po', 'lb-po', 'num-po', 'POST GAIN', '1.0x', 'postGain'],
                    ['sl-bs', 'lb-bs', 'num-bs', 'BASS', '0.00', 'bass'],
                    ['sl-tr', 'lb-tr', 'num-tr', 'TREBLE', '0.00', 'treble'],
                    ['sl-ec', 'lb-ec', 'num-ec', 'ECHO', '0.00', 'echo'],
                    ['sl-gt', 'lb-gt', 'num-gt', 'GATE', '0.000', 'gateThreshold'],
                    ['sl-de', 'lb-de', 'num-de', 'DE-ESSER', '0.00', 'deEsser'],
                    ['sl-hc', 'lb-hc', 'num-hc', 'HARD CLIP', '0.00', 'hardClip'],
                    ['sl-sb', 'lb-sb', 'num-sb', 'SUB-BASS', '0.00', 'subBass'],
                    ['sl-ab', 'lb-ab', 'num-ab', 'AIR BAND', '0.00', 'airBand'],
                    ['sl-tp', 'lb-tp', 'num-tp', 'TRANSIENT', '0.00', 'transientPunch'],
                ].map(([slId, lbId, numId, label, defaultVal, param]) => `
                    <div style="margin-bottom:8px;">
                        <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:bold;margin-bottom:2px;">
                            <span style="opacity:0.5;">${label}</span>
                            <span id="${lbId}" style="color:#ff6b6b;font-size:10px;">${defaultVal}</span>
                        </div>
                        <div style="display:flex;gap:6px;align-items:center;">
                            <input type="range" id="${slId}" min="0" max="1000" step="1" value="0" style="flex:1;--v:0%;height:3px;background:linear-gradient(90deg,#ff6b6b var(--v,0%),rgba(255,0,0,0.1) var(--v,0%));">
                            <input type="number" id="${numId}" value="${defaultVal}" style="width:60px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,0,0,0.08);color:#ff6b6b;border-radius:3px;padding:2px 4px;font-size:9px;text-align:center;">
                        </div>
                    </div>
                `).join('')}

                <div style="border-top:1px solid rgba(255,0,0,0.08);margin:6px 0;"></div>

                <!-- BUTTONS -->
                <div style="display:flex;gap:6px;">
                    <button id="kh-rst" style="flex:1;padding:6px;background:rgba(255,0,0,0.05);border:1px solid rgba(255,0,0,0.08);color:#888;border-radius:4px;cursor:pointer;font-size:10px;">RESET</button>
                    <button id="kh-save" style="flex:1;padding:6px;background:rgba(255,0,0,0.05);border:1px solid rgba(255,0,0,0.08);color:#888;border-radius:4px;cursor:pointer;font-size:10px;">SAVE</button>
                </div>
            </div>
            `;

            el.appendChild(content);
            document.body.appendChild(el);

            // ===== TOGGLE UI =====
            let uiVisible = false;
            toggleBtn.onclick = () => {
                uiVisible = !uiVisible;
                el.style.display = uiVisible ? 'block' : 'none';
                toggleBtn.style.borderColor = uiVisible ? 'rgba(255,0,0,0.8)' : 'rgba(255,0,0,0.3)';
                if (uiVisible) {
                    setTimeout(initVisualizer, 300);
                }
            };

            // ===== CONFIG SELECT =====
            document.getElementById('config-select').onchange = function() {
                const idx = parseInt(this.value);
                if (isNaN(idx)) return;
                const config = CONFIG_LIST[idx];
                if (config) {
                    applyConfig(config);
                    document.getElementById('config-info').innerHTML = `✅ Applied: <b style="color:#ff6b6b;">${config.name}</b> - ${config.desc}`;
                    document.getElementById('config-info').style.borderColor = 'rgba(255,0,0,0.15)';
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
                    document.getElementById('music-status').textContent = `▶ ${val}%`;
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
                    document.getElementById('music-status').textContent = `▶ ${val.toFixed(0)}%`;
                }
                showToast(`🔊 Synced: ${val.toFixed(0)}%`, 'success');
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

            // ===== RESET =====
            document.getElementById('kh-rst').onclick = () => {
                applyConfig({ preGain: 1, drive: 0, crush: 0, width: 0, postGain: 1, bass: 0, treble: 0, echo: 0, gateThreshold: 0.005, deEsser: 0, musicVolume: 0.5, hardClip: 0, subBass: 0, airBand: 0, transientPunch: 0 });
                document.getElementById('config-select').value = '';
                document.getElementById('config-info').innerHTML = '💡 Select config to apply';
                document.getElementById('config-info').style.borderColor = 'rgba(255,0,0,0.05)';
                const mvSlider = document.getElementById('sl-mv');
                const mvLabel = document.getElementById('lb-mv');
                if (mvSlider) {
                    mvSlider.value = 50;
                    mvSlider.style.setProperty('--v', '50%');
                    mvLabel.innerText = '50%';
                }
                updateMusicVolume(0.5);
                showToast('🔄 Reset to default', 'info');
            };

            // ===== SAVE =====
            document.getElementById('kh-save').onclick = () => {
                const name = prompt('Config name:');
                if (name) {
                    const config = { ...P };
                    CONFIG_LIST.push({ name, desc: 'Custom config', ...config });
                    const select = document.getElementById('config-select');
                    const option = document.createElement('option');
                    option.value = CONFIG_LIST.length - 1;
                    option.textContent = `${name} - Custom`;
                    select.appendChild(option);
                    showToast(`✅ Saved: ${name}`, 'success');
                }
            };

            // ===== MUSIC =====
            document.getElementById('music-file').onchange = function(e) {
                const file = e.target.files[0];
                if (file) loadMusic(file);
            };
            document.getElementById('music-play').onclick = toggleMusic;

            // ===== BADGE =====
            this.badge('ON', '#ff6b6b');

            // ===== INIT =====
            syncUI();
            updateInputs();

            // Thông báo
            setTimeout(() => {
                showToast('🔥 HELLFIRE LINORIA - Ready!', 'info', 2000);
            }, 500);
        },

        badge(t, c) {
            const e = document.getElementById('kh-st'),
                d = document.getElementById('kh-dot');
            if (e) { e.innerText = t; e.style.color = c; }
            if (d) { d.style.background = c; d.style.boxShadow = '0 0 10px ' + c; }
        }
    };

    // ============================================================
    //  BOOT
    // ============================================================
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => UI.init());
    else UI.init();

    console.log('✅ HELLFIRE LINORIA BG - Bố Duy Khánh đã sẵn sàng!');
    console.log('🔥 UI đỏ đen + Ảnh nền GitHub + Nút bật tắt ảnh');
})();