// hellfire_cosmic_FIXED.js - Bố Duy Khánh COSMIC EDITION
// FIX: Lỗi mic + Sao băng TO ĐẸP RÕ RÀNG

(function () {
    'use strict';
    if (window.__BDK_COSMIC_FIXED__) return;
    window.__BDK_COSMIC_FIXED__ = true;

    console.log('%c🌌 HELLFIRE COSMIC FIXED - Bố Duy Khánh', 'font-size:28px;font-weight:bold;color:#ff6b6b;text-shadow:0 0 60px #ff6b6b, 0 0 120px #ff6b6b;');

    // ============================================================
    //  1. HIỆU ỨNG SAO BĂNG RƠI - TO ĐẸP RÕ RÀNG
    // ============================================================
    function createShootingStars() {
        const canvas = document.createElement('canvas');
        canvas.id = 'kh-stars';
        canvas.style.cssText = `
            position:fixed;top:0;left:0;width:100%;height:100%;
            pointer-events:none;z-index:999996;
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

        // Tạo sao băng - NHIỀU HƠN, TO HƠN, SÁNG HƠN
        const stars = [];
        const STAR_COUNT = 15; // Tăng từ 8 lên 15

        class ShootingStar {
            constructor() {
                this.reset();
            }

            reset() {
                this.active = false;
                this.x = Math.random() * width;
                this.y = Math.random() * height * 0.5;
                this.speed = 20 + Math.random() * 35; // Nhanh hơn
                this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.6;
                this.length = 120 + Math.random() * 200; // Dài hơn
                this.opacity = 0.6 + Math.random() * 0.4; // Sáng hơn
                this.trail = [];
                this.life = 0;
                this.maxLife = 50 + Math.random() * 70;
                this.tailLength = 25 + Math.random() * 30; // Đuôi dài hơn
                this.size = 4 + Math.random() * 6; // To hơn
            }

            start() {
                this.active = true;
                this.x = Math.random() * width * 0.9;
                this.y = Math.random() * height * 0.4;
                this.life = 0;
                this.trail = [];
                // Màu sắc đa dạng
                this.hue = 200 + Math.random() * 60; // Xanh dương - tím
                this.saturation = 80 + Math.random() * 20;
                this.lightness = 70 + Math.random() * 30;
            }

            update() {
                if (!this.active) {
                    if (Math.random() < 0.005) this.start(); // Tần suất cao hơn
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

                // Vẽ đuôi sao băng - TO HƠN
                for (let i = 1; i < this.trail.length; i++) {
                    const progress = i / this.trail.length;
                    const alpha = progress * this.opacity * 0.9;
                    const size = progress * this.size * 1.2;

                    // Gradient màu từ trắng đến màu sao
                    const gradient = ctx.createRadialGradient(
                        this.trail[i].x, this.trail[i].y, 0,
                        this.trail[i].x, this.trail[i].y, size * 2
                    );
                    gradient.addColorStop(0, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${alpha})`);
                    gradient.addColorStop(0.5, `hsla(${this.hue - 20}, ${this.saturation}%, ${this.lightness - 20}%, ${alpha * 0.6})`);
                    gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);

                    ctx.beginPath();
                    ctx.arc(this.trail[i].x, this.trail[i].y, size * 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.shadowColor = `hsla(${this.hue}, 100%, 80%, ${alpha * 0.5})`;
                    ctx.shadowBlur = 25 * progress;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }

                // Đầu sao băng - TO RÕ
                const last = this.trail[this.trail.length - 1];
                const gradient = ctx.createRadialGradient(
                    last.x, last.y, 0,
                    last.x, last.y, this.size * 3
                );
                gradient.addColorStop(0, `hsla(${this.hue}, 100%, 100%, ${this.opacity})`);
                gradient.addColorStop(0.3, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.opacity * 0.8})`);
                gradient.addColorStop(0.7, `hsla(${this.hue - 30}, ${this.saturation}%, ${this.lightness - 30}%, ${this.opacity * 0.4})`);
                gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);

                ctx.beginPath();
                ctx.arc(last.x, last.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.shadowColor = `hsla(${this.hue}, 100%, 80%, ${this.opacity * 0.6})`;
                ctx.shadowBlur = 50;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Tia sáng xung quanh đầu
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2 + this.life * 0.02;
                    const distance = this.size * (2 + Math.sin(this.life * 0.1 + i) * 1);
                    const x = last.x + Math.cos(angle) * distance;
                    const y = last.y + Math.sin(angle) * distance;
                    ctx.beginPath();
                    ctx.arc(x, y, this.size * 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${this.hue}, 80%, 80%, ${this.opacity * 0.3 * (0.5 + 0.5 * Math.sin(this.life * 0.05 + i))})`;
                    ctx.shadowBlur = 0;
                    ctx.fill();
                }
            }
        }

        // Tạo sao băng - khởi tạo nhiều hơn
        for (let i = 0; i < STAR_COUNT; i++) {
            const star = new ShootingStar();
            if (i % 2 === 0) star.start();
            stars.push(star);
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            stars.forEach(star => {
                star.update();
                star.draw(ctx);
            });

            requestAnimationFrame(animate);
        }
        animate();
    }

    // ============================================================
    //  2. THAM SỐ
    // ============================================================
    const P = {
        drive: 0.15,
        crush: 0.0,
        width: 0.15,
        echo: 0.08,
        gateThreshold: 0.008,
        deEsser: 0.3,
        preGain: 1.0,
        postGain: 1.5,
        bass: 0.15,
        treble: 0.25,
        hardClip: 0.0,
        subBass: 0.0,
        airBand: 0.0,
        transientPunch: 0.0,
        overdrive: 0.0,
        infiniteEcho: 0.0,
        distortion: 0.0,
        fuzz: 0.0,
        octave: 0.0,
        bitcrush: 0.0,
        musicVolume: 0.5,
        musicSync: true,
    };

    // ============================================================
    //  3. CONFIG
    // ============================================================
    const CONFIG_LIST = [
        {
            name: '💥 Súng Liên Thanh',
            desc: 'Bóp méo cực mạnh + ồn như súng AK',
            preGain: 5000, drive: 1.0, crush: 1.0, width: 1.0,
            postGain: 8000, bass: 1.0, treble: 1.0,
            echo: 0.8, gateThreshold: 0.001, deEsser: 0.0,
            hardClip: 1.0, subBass: 1.0, airBand: 1.0, transientPunch: 1.0,
            overdrive: 1.0, infiniteEcho: 0.8,
            distortion: 1.0, fuzz: 0.8, octave: 0.5, bitcrush: 0.3
        },
        {
            name: '🔫 Bóp Méo Tối Cao',
            desc: 'Méo tiếng cực độ, ồn như pháo',
            preGain: 8000, drive: 1.0, crush: 1.0, width: 1.0,
            postGain: 10000, bass: 1.0, treble: 1.0,
            echo: 0.9, gateThreshold: 0.001, deEsser: 0.0,
            hardClip: 1.0, subBass: 1.0, airBand: 1.0, transientPunch: 1.0,
            overdrive: 1.0, infiniteEcho: 1.0,
            distortion: 1.0, fuzz: 1.0, octave: 0.8, bitcrush: 0.5
        },
        {
            name: '💀 Ác Quỷ Máy Móc',
            desc: 'Giọng quỷ + máy móc + ồn như động cơ',
            preGain: 6000, drive: 1.0, crush: 0.9, width: 1.0,
            postGain: 9000, bass: 1.0, treble: 0.8,
            echo: 0.7, gateThreshold: 0.001, deEsser: 0.0,
            hardClip: 1.0, subBass: 1.0, airBand: 0.8, transientPunch: 1.0,
            overdrive: 0.8, infiniteEcho: 0.6,
            distortion: 0.9, fuzz: 0.7, octave: 0.3, bitcrush: 0.4
        },
        {
            name: '🌀 Lốc Xoáy Hủy Diệt',
            desc: 'Âm thanh xoáy + méo + ồn như bão',
            preGain: 12000, drive: 1.0, crush: 1.0, width: 1.0,
            postGain: 15000, bass: 1.0, treble: 1.0,
            echo: 1.0, gateThreshold: 0.001, deEsser: 0.0,
            hardClip: 1.0, subBass: 1.0, airBand: 1.0, transientPunch: 1.0,
            overdrive: 1.0, infiniteEcho: 1.0,
            distortion: 1.0, fuzz: 1.0, octave: 1.0, bitcrush: 0.6
        },
        {
            name: '🔥 Lửa Địa Ngục',
            desc: 'Cháy + méo + ồn như núi lửa phun',
            preGain: 10000, drive: 1.0, crush: 1.0, width: 1.0,
            postGain: 12000, bass: 1.0, treble: 0.9,
            echo: 0.85, gateThreshold: 0.001, deEsser: 0.0,
            hardClip: 1.0, subBass: 1.0, airBand: 0.9, transientPunch: 1.0,
            overdrive: 0.9, infiniteEcho: 0.7,
            distortion: 1.0, fuzz: 0.9, octave: 0.6, bitcrush: 0.4
        },
        {
            name: '⚡ Sét Đánh Xuyên Trời',
            desc: 'Điện + méo + ồn như sét đánh',
            preGain: 9000, drive: 1.0, crush: 1.0, width: 1.0,
            postGain: 11000, bass: 0.8, treble: 1.0,
            echo: 0.75, gateThreshold: 0.001, deEsser: 0.0,
            hardClip: 1.0, subBass: 0.8, airBand: 1.0, transientPunch: 1.0,
            overdrive: 1.0, infiniteEcho: 0.5,
            distortion: 0.8, fuzz: 0.6, octave: 0.4, bitcrush: 0.3
        }
    ];

    // ============================================================
    //  4. WORKLET - BÓP MÉO (GIỮ NGUYÊN)
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
                { name:'hardClip', defaultValue:0,    min:0,     max:99999999 },
                { name:'subBass',  defaultValue:0,    min:0,     max:99999999 },
                { name:'airBand',  defaultValue:0,    min:0,     max:99999999 },
                { name:'transientPunch', defaultValue:0, min:0, max:99999999 },
                { name:'overdrive', defaultValue:0,   min:0,     max:1 },
                { name:'infiniteEcho', defaultValue:0, min:0,   max:1 },
                { name:'distortion', defaultValue:0,  min:0,     max:1 },
                { name:'fuzz',     defaultValue:0,    min:0,     max:1 },
                { name:'octave',   defaultValue:0,    min:0,     max:1 },
                { name:'bitcrush', defaultValue:0,    min:0,     max:1 },
            ];
        }
        constructor() {
            super();
            this.SR = sampleRate || 48000;
            this._limL = 1; this._limR = 1;
            this._echoBufL = 0; this._echoBufR = 0;
            this._echoHistoryL = [];
            this._echoHistoryR = [];
            this._gateL = 1; this._gateR = 1;
            this._deEsserL = 0; this._deEsserR = 0;
            this._prevL = 0; this._prevR = 0;
            this._lowL = 0; this._lowR = 0;
            this._highL = 0; this._highR = 0;
            this._phase = 0;
        }

        _hardDistortion(x, amount) {
            if (amount < 0.001) return x;
            const threshold = 1 - amount * 0.5;
            const y = Math.max(-threshold, Math.min(threshold, x)) / threshold;
            const y2 = y * y * Math.sign(y);
            const y3 = y * y * y;
            return y * (1 - amount * 0.3) + y3 * amount * 0.3;
        }

        _fuzz(x, amount) {
            if (amount < 0.001) return x;
            const drive = 1 + amount * 8;
            const y = Math.tanh(x * drive);
            const clip = 1 - amount * 0.4;
            return Math.max(-clip, Math.min(clip, y)) / clip;
        }

        _octave(x, amount) {
            if (amount < 0.001) return x;
            const oct = Math.sin(x * 2 * Math.PI) * 0.5;
            return x * (1 - amount * 0.5) + oct * amount * 0.5;
        }

        _bitcrush(x, amount) {
            if (amount < 0.001) return x;
            const bits = Math.floor(16 - amount * 14);
            const step = 2 / Math.pow(2, bits);
            return Math.round(x / step) * step;
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

        _infiniteEcho(x, amount) {
            if (amount < 0.001) return x;
            this._echoHistoryL.push(x);
            this._echoHistoryR.push(x);
            if (this._echoHistoryL.length > 1000) {
                this._echoHistoryL.shift();
                this._echoHistoryR.shift();
            }
            const idx = Math.floor(this._echoHistoryL.length * amount);
            const echoL = this._echoHistoryL[idx] || 0;
            const echoR = this._echoHistoryR[idx] || 0;
            return x + echoL * 0.3;
        }

        _overdrive(x, amount) {
            if (amount < 0.001) return x;
            const drive = 1 + amount * 10;
            const clip = 1 - amount * 0.5;
            const y = Math.tanh(x * drive);
            return Math.max(-clip, Math.min(clip, y)) / clip;
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
            const overdrive = params.overdrive[0];
            const infiniteEcho = params.infiniteEcho[0];
            const distortion = params.distortion[0];
            const fuzz = params.fuzz[0];
            const octave = params.octave[0];
            const bitcrush = params.bitcrush[0];

            for (let i=0; i<inp[0].length; i++) {
                let L = inp[0][i] * preGain;
                let R = (inp[1] ? inp[1][i] : inp[0][i]) * preGain;

                // BÓP MÉO
                if (distortion > 0) {
                    L = this._hardDistortion(L, distortion);
                    R = this._hardDistortion(R, distortion);
                }

                if (fuzz > 0) {
                    L = this._fuzz(L, fuzz);
                    R = this._fuzz(R, fuzz);
                }

                if (octave > 0) {
                    L = this._octave(L, octave);
                    R = this._octave(R, octave);
                }

                if (bitcrush > 0) {
                    L = this._bitcrush(L, bitcrush);
                    R = this._bitcrush(R, bitcrush);
                }

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

                if (overdrive > 0) {
                    L = this._overdrive(L, overdrive);
                    R = this._overdrive(R, overdrive);
                }

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

                if (infiniteEcho > 0) {
                    L = this._infiniteEcho(L, infiniteEcho);
                    R = this._infiniteEcho(R, infiniteEcho);
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
    //  5. HOOK HỆ THỐNG - FIX LỖI MIC + CONTEXT
    // ============================================================
    const _NativeCtx = window.AudioContext || window.webkitAudioContext;
    let _ctx = null;
    let _workletLoaded = false;
    let _stream = null;

    class BODUYAudioContext extends _NativeCtx {
        constructor(...args) {
            super({ latencyHint: 'interactive', sampleRate: 48000 });
            if (!_ctx) {
                _ctx = this;
                // Load worklet với retry
                loadWorkletWithRetry();
            }
        }
    }

    async function loadWorkletWithRetry(retries = 3) {
        if (_workletLoaded) return;
        try {
            const blob = new Blob([WORKLET], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            await _ctx.audioWorklet.addModule(url);
            _workletLoaded = true;
            URL.revokeObjectURL(url);
            UI.badge('SẴN SÀNG', '#00ffff');
            showToast('🌌 Hệ thống âm thanh vũ trụ sẵn sàng!', 'success');
            console.log('✅ Worklet loaded successfully');
        } catch (e) {
            console.error('❌ Worklet load failed:', e);
            if (retries > 0) {
                setTimeout(() => loadWorkletWithRetry(retries - 1), 1000);
            } else {
                showToast('⚠️ Lỗi load worklet, thử refresh trang!', 'error');
            }
        }
    }

    // Hook AudioContext
    try {
        window.AudioContext = BODUYAudioContext;
        if (window.webkitAudioContext) window.webkitAudioContext = BODUYAudioContext;
    } catch (e) {}

    // Hook getUserMedia với FIX
    const _nativeGUM = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = async function (constraints) {
        // Force audio constraints
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
        try {
            raw = await _nativeGUM(constraints);
        } catch (e) {
            console.error('❌ getUserMedia failed:', e);
            showToast('❌ Lỗi truy cập mic!', 'error');
            throw e;
        }

        // Lưu stream để xử lý sau
        _stream = raw;

        // Nếu worklet chưa load, chờ
        if (!_workletLoaded) {
            showToast('⏳ Đang load worklet, chờ 1s...', 'warning');
            await new Promise(resolve => {
                const check = () => {
                    if (_workletLoaded) resolve();
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

            // Resume context nếu bị suspend
            if (_ctx.state === 'suspended') {
                await _ctx.resume();
                console.log('✅ Context resumed');
            }

            const proc = await Core.build(raw);
            UI.badge('BẬT', '#00ffff');
            showToast('🎤 Mic vũ trụ đã được kích hoạt!', 'success');
            return proc;
        } catch (e) {
            console.error('❌ Build audio processor failed:', e);
            showToast('⚠️ Lỗi xử lý âm thanh, dùng mic raw!', 'warning');
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

            // Đảm bảo context đang chạy
            if (_ctx.state === 'suspended') {
                await _ctx.resume();
            }

            // Tạo node
            this.src = _ctx.createMediaStreamSource(stream);
            this.dest = _ctx.createMediaStreamDestination();
            this.node = new AudioWorkletNode(_ctx, 'boduytadao', {
                numberOfOutputs: 1,
                outputChannelCount: [2]
            });

            // Kết nối
            this.src.connect(this.node);
            this.node.connect(this.dest);

            // Push params
            this.push();

            // Xử lý lỗi node
            this.node.onprocessorerror = (e) => {
                console.error('❌ AudioWorklet error:', e);
                showToast('⚠️ Lỗi processor, thử refresh!', 'error');
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
                mp.get('overdrive').setTargetAtTime(P.overdrive, t, ramp);
                mp.get('infiniteEcho').setTargetAtTime(P.infiniteEcho, t, ramp);
                mp.get('distortion').setTargetAtTime(P.distortion, t, ramp);
                mp.get('fuzz').setTargetAtTime(P.fuzz, t, ramp);
                mp.get('octave').setTargetAtTime(P.octave, t, ramp);
                mp.get('bitcrush').setTargetAtTime(P.bitcrush, t, ramp);
            } catch (e) {
                console.error('❌ Push params error:', e);
            }
        },

        // Hàm destroy để cleanup
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
    //  6. APPLY CONFIG (GIỮ NGUYÊN)
    // ============================================================
    function applyConfig(config) {
        Object.assign(P, config);
        Core.push();
        syncUI();
        updateInputs();
        showToast(`✅ Đã áp dụng: ${config.name}`, 'success');
        console.log('✅ Đã áp dụng config:', config.name);
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
            'overdrive': 'num-od',
            'infiniteEcho': 'num-ie',
            'distortion': 'num-ds',
            'fuzz': 'num-fz',
            'octave': 'num-oc',
            'bitcrush': 'num-bc',
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
            ['sl-od', 'lb-od', 'overdrive', ''],
            ['sl-ie', 'lb-ie', 'infiniteEcho', ''],
            ['sl-ds', 'lb-ds', 'distortion', ''],
            ['sl-fz', 'lb-fz', 'fuzz', ''],
            ['sl-oc', 'lb-oc', 'octave', ''],
            ['sl-bc', 'lb-bc', 'bitcrush', ''],
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
    //  7. EFFECTS (GIỮ NGUYÊN)
    // ============================================================
    function showToast(message, type = 'info', duration = 2500) {
        const toast = document.createElement('div');
        const colors = {
            info: '#888',
            success: '#00ffff',
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

        visualizerAnimationId = requestAnimationFrame(() => drawFakeVisualizer(ctx, width, height));
    }

    // ============================================================
    //  8. MUSIC PLAYER (GIỮ NGUYÊN)
    // ============================================================
    let musicBuffer = null;
    let musicSource = null;
    let musicGain = null;
    let isMusicPlaying = false;

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
    //  9. UI - TO HƠN + SAO BĂNG
    // ============================================================
    const UI = {
        badge(t, c) {
            const e = document.getElementById('kh-st'),
                d = document.getElementById('kh-dot');
            if (e) { e.innerText = t; e.style.color = c; }
            if (d) { d.style.background = c; d.style.boxShadow = '0 0 10px ' + c; }
        },
        init() {
            // Tạo hiệu ứng sao băng TO ĐẸP RÕ
            createShootingStars();

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

            // Main UI - TO HƠN (480px)
            const el = document.createElement('div');
            el.id = 'kh-root';
            el.style.cssText = `
                position:fixed;top:20px;right:20px;width:480px;
                background:rgba(10,10,26,0.92);
                backdrop-filter:blur(20px);
                border:1px solid rgba(100,200,255,0.15);
                border-radius:20px;
                box-shadow:0 0 60px rgba(0,50,150,0.2), inset 0 0 60px rgba(0,50,150,0.05);
                font-family:'Segoe UI',system-ui,sans-serif;
                color:#fff;
                z-index:999998;
                user-select:none;
                max-height:92vh;
                overflow-y:auto;
                transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                display:block;
                opacity:1;
            `;
            el.style.backgroundImage = `
                radial-gradient(ellipse at 20% 50%, rgba(0,50,150,0.2) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(50,0,150,0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 80%, rgba(0,150,200,0.1) 0%, transparent 50%)
            `;

            let html = `
            <div id="kh-head" style="display:flex;justify-content:space-between;align-items:center;padding:16px 24px;background:rgba(0,0,0,0.3);border-bottom:1px solid rgba(100,200,255,0.05);border-radius:20px 20px 0 0;">
                <div id="kh-title" style="display:flex;align-items:center;gap:14px;">
                    <span style="font-size:24px;animation:pulse 2s infinite;">🌌</span>
                    <span id="kh-name" style="font-size:20px;font-weight:900;letter-spacing:1px;text-shadow:0 0 30px rgba(0,150,255,0.3);">COSMIC FIXED</span>
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
                <!-- CONFIG -->
                <div style="margin-bottom:14px;">
                    <div style="font-size:12px;color:#888;margin-bottom:6px;letter-spacing:1px;font-weight:bold;">⚡ CHỌN VŨ KHÍ</div>
                    <select id="config-select" style="width:100%;padding:10px 14px;background:rgba(0,150,255,0.03);border:1px solid rgba(0,150,255,0.1);color:#fff;border-radius:10px;font-size:14px;cursor:pointer;outline:none;">
                        <option value="">-- Chọn config --</option>
                        ${CONFIG_LIST.map((c, i) => `
                            <option value="${i}">${c.name} - ${c.desc}</option>
                        `).join('')}
                    </select>
                    <div id="config-info" style="font-size:11px;color:#666;margin-top:4px;padding:6px 12px;background:rgba(0,150,255,0.02);border-radius:8px;border:1px solid rgba(0,150,255,0.03);">
                        💡 Chọn config để áp dụng sức mạnh vũ trụ
                    </div>
                </div>

                <!-- VISUALIZER -->
                <div style="background:rgba(0,0,0,0.3);border-radius:10px;padding:8px;margin-bottom:14px;border:1px solid rgba(0,150,255,0.05);">
                    <canvas id="kh-visualizer" style="width:100%;height:60px;display:block;border-radius:6px;"></canvas>
                </div>

                <!-- MUSIC -->
                <div style="display:flex;gap:10px;margin-bottom:12px;align-items:center;">
                    <input type="file" id="music-file" accept="audio/*" style="flex:1;background:rgba(0,150,255,0.02);border:1px solid rgba(0,150,255,0.05);color:#fff;border-radius:6px;padding:6px 8px;font-size:11px;">
                    <button id="music-play" style="padding:6px 16px;background:rgba(0,150,255,0.05);border:1px solid rgba(0,150,255,0.1);color:#00ffff;border-radius:6px;cursor:pointer;font-size:11px;white-space:nowrap;">▶ PLAY</button>
                    <span id="music-status" style="font-size:10px;color:#666;min-width:70px;">Chọn file</span>
                </div>

                <!-- VOLUME MUSIC -->
                <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;padding:8px 14px;background:rgba(0,150,255,0.02);border-radius:8px;border:1px solid rgba(0,150,255,0.05);">
                    <span style="font-size:11px;color:#888;min-width:50px;">🔊 MUSIC</span>
                    <input type="range" id="sl-mv" min="0" max="100" step="1" value="50" style="flex:1;--v:50%;height:4px;background:linear-gradient(90deg,#00ffff var(--v,0%),rgba(0,150,255,0.1) var(--v,0%));">
                    <span id="lb-mv" style="font-size:11px;color:#00ffff;min-width:45px;text-align:right;">50%</span>
                </div>

                <!-- SLIDERS CHÍNH - GỘP LẠI -->
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
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
                        ['sl-od', 'lb-od', 'OVERDRIVE', '0.00', 'overdrive'],
                        ['sl-ie', 'lb-ie', 'INF ECHO', '0.00', 'infiniteEcho'],
                        ['sl-ds', 'lb-ds', 'DISTORTION', '0.00', 'distortion'],
                        ['sl-fz', 'lb-fz', 'FUZZ', '0.00', 'fuzz'],
                        ['sl-oc', 'lb-oc', 'OCTAVE', '0.00', 'octave'],
                        ['sl-bc', 'lb-bc', 'BITCRUSH', '0.00', 'bitcrush'],
                    ].map(([slId, lbId, label, defaultVal, param]) => `
                        <div style="margin-bottom:6px;">
                            <div style="display:flex;justify-content:space-between;font-size:10px;color:#888;margin-bottom:2px;">
                                <span>${label}</span>
                                <span id="${lbId}" style="color:#fff;">${defaultVal}</span>
                            </div>
                            <input type="range" id="${slId}" min="0" max="100000" step="10" value="0" style="width:100%;--v:0%;height:3px;background:linear-gradient(90deg,#00ffff var(--v,0%),rgba(0,150,255,0.1) var(--v,0%));">
                        </div>
                    `).join('')}
                </div>

                <!-- BUTTONS -->
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

            // === SLIDERS ===
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
                'overdrive': { sl: 'sl-od', lb: 'lb-od' },
                'infiniteEcho': { sl: 'sl-ie', lb: 'lb-ie' },
                'distortion': { sl: 'sl-ds', lb: 'lb-ds' },
                'fuzz': { sl: 'sl-fz', lb: 'lb-fz' },
                'octave': { sl: 'sl-oc', lb: 'lb-oc' },
                'bitcrush': { sl: 'sl-bc', lb: 'lb-bc' },
                'musicVolume': { sl: 'sl-mv', lb: 'lb-mv' },
            };

            Object.keys(paramMap).forEach(param => {
                const ids = paramMap[param];
                const sl = document.getElementById(ids.sl);
                const lb = document.getElementById(ids.lb);
                if (!sl || !lb) return;

                sl.oninput = function() {
                    let val = parseFloat(this.value);
                    if (param === 'musicVolume') {
                        val = Math.min(1, val / 100);
                    }
                    P[param] = val;
                    lb.innerText = val.toFixed(2);
                    this.style.setProperty('--v', (val / 100000 * 100) + '%');
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
                    overdrive: 0.0,
                    infiniteEcho: 0.0,
                    distortion: 0.0,
                    fuzz: 0.0,
                    octave: 0.0,
                    bitcrush: 0.0,
                    musicVolume: 0.5,
                });
                document.getElementById('config-select').value = '';
                document.getElementById('config-info').innerHTML = '💡 Chọn config để áp dụng sức mạnh vũ trụ';
                document.getElementById('config-info').style.borderColor = 'rgba(0,150,255,0.03)';
                // Reset sliders
                Object.keys(paramMap).forEach(param => {
                    const ids = paramMap[param];
                    const sl = document.getElementById(ids.sl);
                    const lb = document.getElementById(ids.lb);
                    if (!sl || !lb) return;
                    const val = P[param] || 0;
                    sl.value = val;
                    lb.innerText = val.toFixed(2);
                    sl.style.setProperty('--v', (val / 100000 * 100) + '%');
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

            // === MUSIC ===
            document.getElementById('music-file').onchange = function(e) {
                const file = e.target.files[0];
                if (file) loadMusic(file);
            };
            document.getElementById('music-play').onclick = toggleMusic;

            // === CSS ===
            const style = document.createElement('style');
            style.textContent = `
            @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.1);} }
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
            this.badge('ON', '#00ffff');

            // === INIT ===
            syncUI();
            updateInputs();
            setTimeout(initVisualizer, 500);

            setTimeout(() => {
                showToast('🌌 HELLFIRE COSMIC FIXED - Sẵn sàng hủy diệt!', 'info', 3000);
            }, 1000);
        },
        badge(t, c) {
            const e = document.getElementById('kh-st'),
                d = document.getElementById('kh-dot');
            if (e) { e.innerText = t; e.style.color = c; }
            if (d) { d.style.background = c; d.style.boxShadow = '0 0 10px ' + c; }
        }
    };

    // ============================================================
    //  10. BOOT
    // ============================================================
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => UI.init());
    else UI.init();

    console.log('✅ HELLFIRE COSMIC FIXED - Bố Duy Khánh đã sẵn sàng!');
    console.log('🌌 FIX: Lỗi mic + Sao băng TO ĐẸP RÕ');
    console.log('🔊 Bóp méo cực mạnh + ồn như súng liên thanh');
})();