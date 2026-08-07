// hellfire_amduong_slider500.js - Bố Duy Khánh ÂM DƯƠNG SLIDER 500
// Giới hạn slider max 500 + Sao băng + Sao lấp lánh

(function () {
    'use strict';
    if (window.__BDK_AMDUONG_SLIDER500__) return;
    window.__BDK_AMDUONG_SLIDER500__ = true;

    console.log('%c🌌 HELLFIRE ÂM DƯƠNG SLIDER 500 - Bố Duy Khánh', 'font-size:24px;font-weight:bold;color:#ffffff;text-shadow:0 0 40px #888;');

    // ============================================================
    //  1. HIỆU ỨNG SAO BĂNG + SAO LẤP LÁNH (TOÀN MÀN HÌNH)
    // ============================================================
    function createStarField() {
        const canvas = document.createElement('canvas');
        canvas.id = 'kh-stars-bg';
        canvas.style.cssText = `
            position:fixed;top:0;left:0;width:100%;height:100%;
            pointer-events:none;z-index:999995;
            background: transparent;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let width, height;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        // ===== SAO NỀN LẤP LÁNH =====
        const stars = [];
        const STAR_COUNT = 250;

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = 0.5 + Math.random() * 2;
                this.baseAlpha = 0.3 + Math.random() * 0.7;
                this.alpha = this.baseAlpha;
                this.phase = Math.random() * Math.PI * 2;
                this.twinkleSpeed = 0.02 + Math.random() * 0.05;
                this.hue = 200 + Math.random() * 60;
            }

            update() {
                this.phase += this.twinkleSpeed;
                this.alpha = this.baseAlpha * (0.6 + 0.4 * Math.sin(this.phase));
            }

            draw(ctx) {
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 6
                );
                gradient.addColorStop(0, `hsla(${this.hue}, 80%, 100%, ${this.alpha * 0.8})`);
                gradient.addColorStop(0.3, `hsla(${this.hue}, 60%, 80%, ${this.alpha * 0.3})`);
                gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.shadowColor = `rgba(255, 255, 255, ${this.alpha * 0.5})`;
                ctx.shadowBlur = this.size * 4;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push(new Star());
        }

        // ===== SAO BĂNG RƠI =====
        const shootingStars = [];
        const SHOOTING_STAR_COUNT = 10;

        class ShootingStar {
            constructor() {
                this.reset();
            }

            reset() {
                this.active = false;
                this.x = Math.random() * width;
                this.y = Math.random() * height * 0.5;
                this.speed = 20 + Math.random() * 35;
                this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.6;
                this.opacity = 0.5 + Math.random() * 0.5;
                this.trail = [];
                this.life = 0;
                this.maxLife = 45 + Math.random() * 65;
                this.tailLength = 25 + Math.random() * 30;
                this.size = 3 + Math.random() * 5;
                this.hue = 200 + Math.random() * 60;
            }

            start() {
                this.active = true;
                this.x = Math.random() * width * 0.9;
                this.y = Math.random() * height * 0.3;
                this.life = 0;
                this.trail = [];
            }

            update() {
                if (!this.active) {
                    if (Math.random() < 0.004) this.start();
                    return;
                }

                this.life++;
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                this.trail.push({x: this.x, y: this.y});
                if (this.trail.length > this.tailLength) this.trail.shift();

                if (this.life > this.maxLife || this.x > width + 50 || this.y > height + 50) {
                    this.active = false;
                    this.trail = [];
                }
            }

            draw(ctx) {
                if (!this.active || this.trail.length < 2) return;

                // Đuôi sao băng
                for (let i = 1; i < this.trail.length; i++) {
                    const progress = i / this.trail.length;
                    const alpha = progress * this.opacity * 0.9;
                    const size = progress * this.size * 1.5;

                    const gradient = ctx.createRadialGradient(
                        this.trail[i].x, this.trail[i].y, 0,
                        this.trail[i].x, this.trail[i].y, size * 2.5
                    );
                    gradient.addColorStop(0, `hsla(${this.hue}, 100%, 100%, ${alpha})`);
                    gradient.addColorStop(0.4, `hsla(${this.hue - 20}, 80%, 80%, ${alpha * 0.5})`);
                    gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);

                    ctx.beginPath();
                    ctx.arc(this.trail[i].x, this.trail[i].y, size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.shadowColor = `hsla(${this.hue}, 100%, 80%, ${alpha * 0.4})`;
                    ctx.shadowBlur = 30 * progress;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }

                // Đầu sao băng
                const last = this.trail[this.trail.length - 1];
                const gradient = ctx.createRadialGradient(
                    last.x, last.y, 0,
                    last.x, last.y, this.size * 4
                );
                gradient.addColorStop(0, `hsla(${this.hue}, 100%, 100%, ${this.opacity})`);
                gradient.addColorStop(0.4, `hsla(${this.hue}, 80%, 80%, ${this.opacity * 0.6})`);
                gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);

                ctx.beginPath();
                ctx.arc(last.x, last.y, this.size * 4, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.shadowColor = `hsla(${this.hue}, 100%, 80%, ${this.opacity * 0.5})`;
                ctx.shadowBlur = 50;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Tia sáng xung quanh đầu
                for (let i = 0; i < 6; i++) {
                    const angle = (i / 6) * Math.PI * 2 + this.life * 0.03;
                    const distance = this.size * (2.5 + Math.sin(this.life * 0.08 + i) * 1.5);
                    const x = last.x + Math.cos(angle) * distance;
                    const y = last.y + Math.sin(angle) * distance;
                    ctx.beginPath();
                    ctx.arc(x, y, this.size * 0.8, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${this.hue}, 80%, 80%, ${this.opacity * 0.3 * (0.5 + 0.5 * Math.sin(this.life * 0.06 + i))})`;
                    ctx.shadowBlur = 0;
                    ctx.fill();
                }
            }
        }

        for (let i = 0; i < SHOOTING_STAR_COUNT; i++) {
            const star = new ShootingStar();
            if (i % 2 === 0) star.start();
            shootingStars.push(star);
        }

        // ===== ANIMATION =====
        function animate() {
            ctx.clearRect(0, 0, width, height);

            stars.forEach(star => {
                star.update();
                star.draw(ctx);
            });

            shootingStars.forEach(star => {
                star.update();
                star.draw(ctx);
            });

            requestAnimationFrame(animate);
        }
        animate();
    }

    // ============================================================
    //  2. THAM SỐ MẶC ĐỊNH (VỪA PHẢI)
    // ============================================================
    const P = {
        preGain: 1.5,
        drive: 0.3,
        crush: 0.1,
        width: 0.2,
        postGain: 2.0,
        bass: 0.2,
        treble: 0.3,
        echo: 0.1,
        gateThreshold: 0.005,
        deEsser: 0.2,
        hardClip: 0.1,
        subBass: 0.1,
        airBand: 0.1,
        transientPunch: 0.1,
        musicVolume: 0.5,
    };

    // ============================================================
    //  3. 5 CONFIG MẠNH MẼ (GIỚI HẠN 500)
    // ============================================================
    const CONFIG_LIST = [
        {
            name: '💥 Lấn Át Vừa Phải',
            desc: 'To, dày, át đối phương nhưng không vỡ',
            preGain: 2.5, drive: 0.5, crush: 0.3, width: 0.4,
            postGain: 3.0, bass: 0.5, treble: 0.4,
            echo: 0.2, gateThreshold: 0.003, deEsser: 0.1,
            hardClip: 0.2, subBass: 0.2, airBand: 0.2, transientPunch: 0.3
        },
        {
            name: '🔥 Lấn Át Mạnh Mẽ',
            desc: 'Cực to, bão hòa tốt, át chết đối thủ',
            preGain: 4.0, drive: 0.7, crush: 0.5, width: 0.6,
            postGain: 5.0, bass: 0.7, treble: 0.6,
            echo: 0.3, gateThreshold: 0.002, deEsser: 0.05,
            hardClip: 0.3, subBass: 0.4, airBand: 0.3, transientPunch: 0.5
        },
        {
            name: '💀 Lấn Át Tối Thượng',
            desc: 'Tối đa công suất, át hoàn toàn, không thở',
            preGain: 6.0, drive: 0.9, crush: 0.7, width: 0.8,
            postGain: 8.0, bass: 0.9, treble: 0.7,
            echo: 0.4, gateThreshold: 0.001, deEsser: 0.02,
            hardClip: 0.5, subBass: 0.6, airBand: 0.5, transientPunch: 0.7
        },
        {
            name: '🔊 Loa Phường Chất Lừ',
            desc: 'Giọng loa phường, to, vang, rõ ràng',
            preGain: 3.0, drive: 0.4, crush: 0.2, width: 0.5,
            postGain: 4.0, bass: 0.4, treble: 0.5,
            echo: 0.25, gateThreshold: 0.003, deEsser: 0.08,
            hardClip: 0.15, subBass: 0.2, airBand: 0.2, transientPunch: 0.2
        },
        {
            name: '🎤 Giọng Âm Dương',
            desc: 'Cân bằng, ấm, dễ nghe, không méo',
            preGain: 2.0, drive: 0.2, crush: 0.1, width: 0.3,
            postGain: 2.5, bass: 0.3, treble: 0.3,
            echo: 0.1, gateThreshold: 0.005, deEsser: 0.15,
            hardClip: 0.05, subBass: 0.1, airBand: 0.1, transientPunch: 0.1
        }
    ];

    // ============================================================
    //  4. WORKLET - BÓP MÉO (VỪA PHẢI)
    // ============================================================
    const WORKLET = `
    class BODUYKHANH extends AudioWorkletProcessor {
        static get parameterDescriptors() {
            return [
                { name:'preGain',  defaultValue:1,   min:0,     max:500 },
                { name:'drive',    defaultValue:0,   min:0,     max:500 },
                { name:'crush',    defaultValue:0,   min:0,     max:500 },
                { name:'width',    defaultValue:0,   min:0,     max:500 },
                { name:'postGain', defaultValue:1,   min:0,     max:500 },
                { name:'bass',     defaultValue:0,   min:0,     max:500 },
                { name:'treble',   defaultValue:0,   min:0,     max:500 },
                { name:'echo',     defaultValue:0,   min:0,     max:500 },
                { name:'gateThreshold', defaultValue:0.005, min:0, max:500 },
                { name:'deEsser',  defaultValue:0,    min:0,     max:500 },
                { name:'hardClip', defaultValue:0,    min:0,     max:1 },
                { name:'subBass',  defaultValue:0,    min:0,     max:1 },
                { name:'airBand',  defaultValue:0,    min:0,     max:1 },
                { name:'transientPunch', defaultValue:0, min:0, max:1 },
            ];
        }
        constructor() {
            super();
            this.SR = sampleRate || 48000;
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

                // Transient Punch
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

                // Sub-Bass
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

                // Air Band
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

                // Hard Clip
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
    //  5. HOOK HỆ THỐNG - FIX CỨNG
    // ============================================================
    const _NativeCtx = window.AudioContext || window.webkitAudioContext;
    let _ctx = null;
    let _workletLoaded = false;
    let _keepAliveInterval = null;

    function keepContextAlive() {
        if (_ctx) {
            try {
                if (_ctx.state === 'suspended') {
                    _ctx.resume().then(() => {
                        console.log('✅ Context resumed by keep-alive');
                    }).catch(e => console.warn('⚠️ Resume failed:', e));
                }
                if (Core.node) Core.push();
            } catch (e) { console.warn('⚠️ Keep-alive error:', e); }
        }
    }

    class BODUYAudioContext extends _NativeCtx {
        constructor(...args) {
            super({ latencyHint: 'interactive', sampleRate: 48000 });
            if (!_ctx) {
                _ctx = this;
                loadWorkletWithRetry();
                if (_keepAliveInterval) clearInterval(_keepAliveInterval);
                _keepAliveInterval = setInterval(keepContextAlive, 1000);
                this.onstatechange = () => {
                    if (this.state === 'suspended') {
                        console.warn('⚠️ Context suspended, auto-resuming...');
                        this.resume().catch(e => console.warn('⚠️ Auto-resume failed:', e));
                    }
                };
            }
        }
    }

    async function loadWorkletWithRetry(retries = 5) {
        if (_workletLoaded) return;
        try {
            const blob = new Blob([WORKLET], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            await _ctx.audioWorklet.addModule(url);
            _workletLoaded = true;
            URL.revokeObjectURL(url);
            console.log('✅ Worklet loaded successfully');
        } catch (e) {
            console.error('❌ Worklet load failed:', e);
            if (retries > 0) {
                setTimeout(() => loadWorkletWithRetry(retries - 1), 1000);
            }
        }
    }

    try {
        window.AudioContext = BODUYAudioContext;
        if (window.webkitAudioContext) window.webkitAudioContext = BODUYAudioContext;
    } catch (e) {}

    const _nativeGUM = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = async function (constraints) {
        if (constraints.audio) {
            constraints.audio = {
                autoGainControl: false,
                echoCancellation: false,
                noiseSuppression: false,
                channelCount: 2,
                sampleRate: 48000,
                latency: 0
            };
        }

        let raw;
        try { raw = await _nativeGUM(constraints); } 
        catch (e) { 
            console.error('❌ getUserMedia failed:', e);
            return raw;
        }

        if (!_workletLoaded) {
            await new Promise(resolve => {
                let attempts = 0;
                const check = () => {
                    attempts++;
                    if (_workletLoaded || attempts > 20) resolve();
                    else setTimeout(check, 200);
                };
                check();
            });
        }

        try {
            if (!_ctx) {
                _ctx = new _NativeCtx({ latencyHint: 'interactive', sampleRate: 48000 });
                await loadWorkletWithRetry();
            }
            if (_ctx.state === 'suspended') await _ctx.resume();
            const proc = await Core.build(raw);
            return proc;
        } catch (e) {
            console.error('❌ Build audio processor failed:', e);
            return raw;
        }
    };

    const Core = {
        node: null,
        src: null,
        dest: null,

        async build(stream) {
            if (!_ctx) {
                try {
                    _ctx = new _NativeCtx({ latencyHint: 'interactive', sampleRate: 48000 });
                    await loadWorkletWithRetry();
                } catch (e) {
                    console.error('❌ Context creation failed:', e);
                    throw e;
                }
            }

            if (_ctx.state === 'suspended') await _ctx.resume();

            this.src = _ctx.createMediaStreamSource(stream);
            this.dest = _ctx.createMediaStreamDestination();
            this.node = new AudioWorkletNode(_ctx, 'boduytadao', {
                numberOfOutputs: 1,
                outputChannelCount: [2]
            });

            this.src.connect(this.node);
            this.node.connect(this.dest);
            this.push();

            this.node.onprocessorerror = (e) => {
                console.error('❌ AudioWorklet error:', e);
                setTimeout(() => {
                    try {
                        this.destroy();
                        this.build(stream);
                    } catch (err) {
                        console.error('❌ Rebuild failed:', err);
                    }
                }, 500);
            };

            return this.dest.stream;
        },

        push() {
            if (!this.node || !_ctx) return;
            try {
                const mp = this.node.parameters;
                const t = _ctx.currentTime;
                const ramp = 0.015;

                mp.get('preGain').setTargetAtTime(P.preGain, t, ramp);
                mp.get('drive').setTargetAtTime(P.drive, t, ramp);
                mp.get('crush').setTargetAtTime(P.crush, t, ramp);
                mp.get('width').setTargetAtTime(P.width, t, ramp);
                mp.get('postGain').setTargetAtTime(P.postGain, t, ramp);
                mp.get('bass').setTargetAtTime(P.bass, t, ramp);
                mp.get('treble').setTargetAtTime(P.treble, t, ramp);
                mp.get('echo').setTargetAtTime(P.echo, t, ramp);
                mp.get('gateThreshold').setTargetAtTime(P.gateThreshold, t, ramp);
                mp.get('deEsser').setTargetAtTime(P.deEsser, t, ramp);
                mp.get('hardClip').setTargetAtTime(P.hardClip, t, ramp);
                mp.get('subBass').setTargetAtTime(P.subBass, t, ramp);
                mp.get('airBand').setTargetAtTime(P.airBand, t, ramp);
                mp.get('transientPunch').setTargetAtTime(P.transientPunch, t, ramp);
            } catch (e) {
                console.error('❌ Push params error:', e);
            }
        },

        destroy() {
            try {
                if (this.node) {
                    this.node.disconnect();
                    this.node = null;
                }
                if (this.src) {
                    this.src.disconnect();
                    this.src = null;
                }
                if (this.dest) {
                    this.dest.disconnect();
                    this.dest = null;
                }
            } catch (e) {}
        }
    };

    // ============================================================
    //  6. APPLY CONFIG
    // ============================================================
    function applyConfig(config) {
        Object.assign(P, config);
        Core.push();
        syncUI();
        showToast(`✅ Đã áp dụng: ${config.name || 'Custom'}`, 'success');
        console.log('✅ Đã áp dụng config:', config.name || 'Custom');
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
            const el = document.getElementById(arr[0]);
            const lb = document.getElementById(arr[1]);
            if (!el || !lb) return;
            let val = P[arr[2]];
            el.value = val;
            let pct = Math.min(100, (val / 500) * 100);
            el.style.setProperty('--v', pct + '%');
            if (arr[3] === 'x') lb.innerText = val.toFixed(1) + 'x';
            else if (arr[3] === '%') lb.innerText = (val * 100).toFixed(0) + '%';
            else lb.innerText = val.toFixed(2);
        });
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
    //  7. UI - CHỈ CÓ CONFIG + SLIDER (MAX 500)
    // ============================================================
    const UI = {
        init() {
            // Tạo hiệu ứng sao
            createStarField();

            // Nút toggle
            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'kh-toggle';
            toggleBtn.textContent = '🌌';
            toggleBtn.style.cssText = `
                position:fixed;bottom:24px;left:24px;z-index:999999;
                width:60px;height:60px;border-radius:50%;
                background:radial-gradient(circle at 30% 30%, #0a0a2a, #1a1a3e);
                border:2px solid rgba(255,255,255,0.2);
                color:#fff;font-size:28px;cursor:pointer;
                box-shadow:0 0 40px rgba(0,150,255,0.3), inset 0 0 40px rgba(0,150,255,0.1);
                transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                display:flex;align-items:center;justify-content:center;
                font-family:'Segoe UI',sans-serif;user-select:none;
                backdrop-filter:blur(10px);
            `;
            toggleBtn.onmouseenter = () => {
                toggleBtn.style.transform = 'scale(1.1)';
                toggleBtn.style.boxShadow = '0 0 60px rgba(0,150,255,0.5), inset 0 0 60px rgba(0,150,255,0.2)';
            };
            toggleBtn.onmouseleave = () => {
                toggleBtn.style.transform = 'scale(1)';
            };
            document.body.appendChild(toggleBtn);

            // Main UI
            const el = document.createElement('div');
            el.id = 'kh-root';
            el.style.cssText = `
                position:fixed;top:20px;right:20px;width:400px;
                background:rgba(10,10,26,0.92);
                backdrop-filter:blur(20px);
                border:1px solid rgba(100,200,255,0.15);
                border-radius:20px;
                box-shadow:0 0 60px rgba(0,50,150,0.2), inset 0 0 60px rgba(0,50,150,0.05);
                font-family:'Segoe UI',system-ui,sans-serif;
                color:#fff;
                z-index:999998;
                user-select:none;
                max-height:90vh;
                overflow-y:auto;
                transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                display:block;
                opacity:1;
            `;

            let html = `
            <div id="kh-head" style="display:flex;justify-content:space-between;align-items:center;padding:16px 20px;background:rgba(0,0,0,0.3);border-bottom:1px solid rgba(100,200,255,0.05);border-radius:20px 20px 0 0;">
                <div id="kh-title" style="display:flex;align-items:center;gap:12px;">
                    <span style="font-size:24px;">🌌</span>
                    <span id="kh-name" style="font-size:18px;font-weight:900;letter-spacing:1px;text-shadow:0 0 30px rgba(0,150,255,0.3);">ÂM DƯƠNG 500</span>
                </div>
                <div id="kh-right" style="display:flex;align-items:center;gap:12px;">
                    <div id="kh-badge" style="display:flex;align-items:center;gap:8px;background:rgba(0,150,255,0.05);padding:6px 14px;border-radius:12px;border:1px solid rgba(0,150,255,0.1);">
                        <span id="kh-dot" style="width:8px;height:8px;border-radius:50%;background:#00ffff;display:inline-block;"></span>
                        <span id="kh-st" style="font-size:11px;color:#888;letter-spacing:1px;font-weight:bold;">ON</span>
                    </div>
                    <button id="kh-close" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);color:#666;border-radius:8px;width:32px;height:32px;font-size:16px;cursor:pointer;transition:all 0.3s;">✕</button>
                </div>
            </div>
            <div id="kh-body" style="padding:20px;">
                <div style="margin-bottom:14px;">
                    <div style="font-size:12px;color:#888;margin-bottom:6px;letter-spacing:1px;font-weight:bold;">⚡ CHỌN CONFIG</div>
                    <select id="config-select" style="width:100%;padding:10px 14px;background:rgba(0,150,255,0.03);border:1px solid rgba(0,150,255,0.1);color:#fff;border-radius:10px;font-size:14px;cursor:pointer;outline:none;">
                        <option value="">-- Chọn config --</option>
                        ${CONFIG_LIST.map((c, i) => `
                            <option value="${i}">${c.name} - ${c.desc}</option>
                        `).join('')}
                    </select>
                    <div id="config-info" style="font-size:11px;color:#666;margin-top:4px;padding:6px 12px;background:rgba(0,150,255,0.02);border-radius:8px;border:1px solid rgba(0,150,255,0.03);">
                        💡 Chọn config để áp dụng (giới hạn max 500)
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
                    ${[
                        ['sl-pg', 'lb-pg', 'PRE GAIN', '1.0', 'preGain'],
                        ['sl-po', 'lb-po', 'POST GAIN', '1.0', 'postGain'],
                        ['sl-dr', 'lb-dr', 'DRIVE', '0.00', 'drive'],
                        ['sl-cr', 'lb-cr', 'CRUSH', '0.00', 'crush'],
                        ['sl-bs', 'lb-bs', 'BASS', '0.00', 'bass'],
                        ['sl-tr', 'lb-tr', 'TREBLE', '0.00', 'treble'],
                        ['sl-ec', 'lb-ec', 'ECHO', '0.00', 'echo'],
                        ['sl-hc', 'lb-hc', 'HARD CLIP', '0.00', 'hardClip'],
                        ['sl-sb', 'lb-sb', 'SUB-BASS', '0.00', 'subBass'],
                        ['sl-ab', 'lb-ab', 'AIR BAND', '0.00', 'airBand'],
                        ['sl-tp', 'lb-tp', 'PUNCH', '0.00', 'transientPunch'],
                    ].map(([slId, lbId, label, defaultVal, param]) => `
                        <div style="margin-bottom:6px;">
                            <div style="display:flex;justify-content:space-between;font-size:10px;color:#888;margin-bottom:2px;">
                                <span>${label}</span>
                                <span id="${lbId}" style="color:#fff;">${defaultVal}</span>
                            </div>
                            <input type="range" id="${slId}" min="0" max="500" step="1" value="0" style="width:100%;--v:0%;height:3px;background:linear-gradient(90deg,#00ffff var(--v,0%),rgba(0,150,255,0.1) var(--v,0%));">
                        </div>
                    `).join('')}
                </div>

                <div style="display:flex;gap:8px;margin-top:4px;">
                    <button id="kh-rst" style="flex:1;padding:8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);color:#888;border-radius:8px;cursor:pointer;font-size:11px;font-weight:bold;">↺ RESET</button>
                    <button id="kh-save" style="flex:1;padding:8px;background:rgba(0,150,255,0.05);border:1px solid rgba(0,150,255,0.1);color:#00ffff;border-radius:8px;cursor:pointer;font-size:11px;font-weight:bold;">💾 SAVE</button>
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
                toggleBtn.style.borderColor = uiVisible ? 'rgba(255,255,255,0.2)' : 'rgba(255,0,0,0.3)';
                toggleBtn.textContent = uiVisible ? '🌌' : '🔇';
            };

            document.getElementById('kh-close').onclick = () => {
                uiVisible = false;
                el.style.display = 'none';
                toggleBtn.style.borderColor = 'rgba(255,0,0,0.3)';
                toggleBtn.textContent = '🔇';
            };

            // Config select
            document.getElementById('config-select').onchange = function() {
                const idx = parseInt(this.value);
                if (isNaN(idx)) return;
                const config = CONFIG_LIST[idx];
                if (config) {
                    applyConfig(config);
                    document.getElementById('config-info').innerHTML = `✅ Đã áp dụng: <b style="color:#00ffff;">${config.name}</b> - ${config.desc}`;
                    document.getElementById('config-info').style.borderColor = 'rgba(0,150,255,0.15)';
                }
            };

            // ===== SLIDERS (MAX 500) =====
            const paramMap = {
                'preGain': { sl: 'sl-pg', lb: 'lb-pg' },
                'postGain': { sl: 'sl-po', lb: 'lb-po' },
                'drive': { sl: 'sl-dr', lb: 'lb-dr' },
                'crush': { sl: 'sl-cr', lb: 'lb-cr' },
                'bass': { sl: 'sl-bs', lb: 'lb-bs' },
                'treble': { sl: 'sl-tr', lb: 'lb-tr' },
                'echo': { sl: 'sl-ec', lb: 'lb-ec' },
                'hardClip': { sl: 'sl-hc', lb: 'lb-hc' },
                'subBass': { sl: 'sl-sb', lb: 'lb-sb' },
                'airBand': { sl: 'sl-ab', lb: 'lb-ab' },
                'transientPunch': { sl: 'sl-tp', lb: 'lb-tp' },
            };

            Object.keys(paramMap).forEach(param => {
                const ids = paramMap[param];
                const sl = document.getElementById(ids.sl);
                const lb = document.getElementById(ids.lb);
                if (!sl || !lb) return;

                sl.oninput = function() {
                    let val = parseFloat(this.value);
                    P[param] = val;
                    lb.innerText = val.toFixed(2);
                    let pct = (val / 500) * 100;
                    this.style.setProperty('--v', Math.min(100, pct) + '%');
                    Core.push();
                };
            });

            // === RESET ===
            document.getElementById('kh-rst').onclick = () => {
                Object.assign(P, {
                    preGain: 1.0,
                    postGain: 1.0,
                    drive: 0.0,
                    crush: 0.0,
                    bass: 0.0,
                    treble: 0.0,
                    echo: 0.0,
                    hardClip: 0.0,
                    subBass: 0.0,
                    airBand: 0.0,
                    transientPunch: 0.0,
                });
                document.getElementById('config-select').value = '';
                document.getElementById('config-info').innerHTML = '💡 Chọn config để áp dụng (giới hạn max 500)';
                document.getElementById('config-info').style.borderColor = 'rgba(0,150,255,0.03)';
                Object.keys(paramMap).forEach(param => {
                    const ids = paramMap[param];
                    const sl = document.getElementById(ids.sl);
                    const lb = document.getElementById(ids.lb);
                    if (!sl || !lb) return;
                    const val = P[param] || 0;
                    sl.value = val;
                    lb.innerText = val.toFixed(2);
                    sl.style.setProperty('--v', (val / 500 * 100) + '%');
                });
                Core.push();
                showToast('🔄 Đã reset về mặc định', 'info');
            };

            // === SAVE ===
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

            // === CSS ===
            const style = document.createElement('style');
            style.textContent = `
            #kh-root::-webkit-scrollbar{width:6px;}
            #kh-root::-webkit-scrollbar-track{background:rgba(0,150,255,0.02);border-radius:10px;}
            #kh-root::-webkit-scrollbar-thumb{background:rgba(0,150,255,0.2);border-radius:10px;}
            input[type=range]{-webkit-appearance:none;outline:none;border-radius:4px;}
            input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;background:radial-gradient(circle at 30% 30%, #00ffff, #0066ff);border:1px solid rgba(255,255,255,0.2);border-radius:50%;cursor:pointer;box-shadow:0 0 20px rgba(0,150,255,0.3);}
            input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.15);box-shadow:0 0 30px rgba(0,150,255,0.5);}
            #config-select option{background:#0a0a1a;color:#fff;}
            `;
            document.head.appendChild(style);

            // === BADGE ===
            document.getElementById('kh-st').innerText = 'ON';
            document.getElementById('kh-st').style.color = '#00ffff';
            document.getElementById('kh-dot').style.background = '#00ffff';

            // === INIT ===
            syncUI();

            setTimeout(() => {
                showToast('🌌 ÂM DƯƠNG 500 - Sẵn sàng! (Max 500)', 'info', 3000);
            }, 1000);
        }
    };

    // ============================================================
    //  8. BOOT
    // ============================================================
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => UI.init());
    else UI.init();

    console.log('✅ HELLFIRE ÂM DƯƠNG SLIDER 500 - Bố Duy Khánh đã sẵn sàng!');
    console.log('🌌 Giới hạn slider max 500 - Vừa phải nhưng khỏe');
    console.log('⭐ Hiệu ứng sao băng + sao lấp lánh');
})();