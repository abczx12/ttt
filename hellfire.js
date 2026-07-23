// hellfire.js - Bố Duy Khánh (CONFIG GÂY ỒN + BABY + BIẾN GIỌNG)
// Copy toàn bộ, paste là dùng

(function () {
    'use strict';
    if (window.__BDK_TROLL__) return;
    window.__BDK_TROLL__ = true;

    console.log('Hook By VNPW');

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
        gateThreshold: 0.008,
        deEsser: 0.3,
    };

    // ═══════════════════════════════════════
    //  CONFIG GÂY ỒN + BABY + BIẾN GIỌNG
    // ═══════════════════════════════════════
    const SUGGESTIONS = {
        // === CẤP ĐỘ 1: LẤN ÁT ===
        '🔥 Lấn Át (Cơ Bản)': {
            desc: 'To, dày, át đối phương',
            preGain: 200, drive: 0.8, crush: 0.4, width: 0.6,
            postGain: 5, bass: 0.9, treble: 0.5,
            echo: 0.2, gateThreshold: 0.002, deEsser: 0.05
        },
        '💀 Lấn Át Cực Đỉnh': {
            desc: 'Bão hòa max, át hết mọi thứ',
            preGain: 500, drive: 1.0, crush: 0.6, width: 0.9,
            postGain: 8, bass: 1.0, treble: 0.7,
            echo: 0.35, gateThreshold: 0.001, deEsser: 0.02
        },
        '⚡ Lấn Át Tối Thượng': {
            desc: 'Át hoàn toàn, không cho đối phương thở',
            preGain: 700, drive: 1.0, crush: 0.8, width: 1.0,
            postGain: 10, bass: 1.0, treble: 0.8,
            echo: 0.5, gateThreshold: 0.001, deEsser: 0.01
        },
        '📢 Siêu To Không Lọc': {
            desc: 'To cực, ồn ào, không lọc nhiễu',
            preGain: 1000, drive: 0.5, crush: 0, width: 0.5,
            postGain: 12, bass: 1.0, treble: 0.5,
            echo: 0.2, gateThreshold: 0, deEsser: 0
        },

        // === CẤP ĐỘ 2: ÁC QUỶ ===
        '😈 Giọng Ác Quỷ': {
            desc: 'Trầm, bão hòa, đáng sợ',
            preGain: 300, drive: 0.9, crush: 0.7, width: 0.4,
            postGain: 6, bass: 1.0, treble: 0.1,
            echo: 0.25, gateThreshold: 0.002, deEsser: 0.08
        },
        '👹 Ác Quỷ Tối Thượng': {
            desc: 'Quỷ dữ nhất, cực trầm, cực đục',
            preGain: 600, drive: 1.0, crush: 0.9, width: 0.5,
            postGain: 9, bass: 1.0, treble: 0.05,
            echo: 0.3, gateThreshold: 0.001, deEsser: 0.01
        },
        '💀 Ác Quỷ Địa Ngục': {
            desc: 'Địa ngục, méo tiếng, cực đáng sợ',
            preGain: 900, drive: 1.0, crush: 1.0, width: 0.6,
            postGain: 12, bass: 1.0, treble: 0,
            echo: 0.4, gateThreshold: 0.001, deEsser: 0
        },
        '🌑 Quỷ Vô Hình': {
            desc: 'Ám ảnh, khó chịu, ma quái',
            preGain: 400, drive: 0.7, crush: 0.8, width: 0.3,
            postGain: 7, bass: 0.9, treble: 0.3,
            echo: 0.3, gateThreshold: 0.002, deEsser: 0.05
        },
        '🔥 Quỷ Lửa': {
            desc: 'Giọng quỷ lửa, rực cháy, dữ dội',
            preGain: 500, drive: 0.9, crush: 0.7, width: 0.5,
            postGain: 8, bass: 0.8, treble: 0.4,
            echo: 0.35, gateThreshold: 0.001, deEsser: 0.03
        },

        // === CẤP ĐỘ 3: ECHO & VANG ===
        '🌀 Echo Siêu Vang': {
            desc: 'Vang dài, như trong hang động',
            preGain: 100, drive: 0.3, crush: 0, width: 0.5,
            postGain: 3, bass: 0.3, treble: 0.4,
            echo: 0.8, gateThreshold: 0.005, deEsser: 0.1
        },
        '🌊 Echo Sấm Sét': {
            desc: 'Vang rền, echo siêu dài',
            preGain: 150, drive: 0.4, crush: 0, width: 0.7,
            postGain: 4, bass: 0.4, treble: 0.5,
            echo: 1.0, gateThreshold: 0.003, deEsser: 0.05
        },
        '🌀 Bão Echo': {
            desc: 'Echo chồng echo, cực vang, cực loạn',
            preGain: 200, drive: 0.5, crush: 0, width: 0.8,
            postGain: 5, bass: 0.5, treble: 0.5,
            echo: 1.5, gateThreshold: 0.001, deEsser: 0
        },
        '🌪️ Echo Tận Thế': {
            desc: 'Echo max, không gian hỗn loạn',
            preGain: 300, drive: 0.6, crush: 0, width: 1.0,
            postGain: 6, bass: 0.6, treble: 0.6,
            echo: 2.0, gateThreshold: 0.001, deEsser: 0
        },
        '🔊 Vang Nhà Thờ': {
            desc: 'Vang như trong nhà thờ lớn',
            preGain: 120, drive: 0.2, crush: 0, width: 0.6,
            postGain: 3.5, bass: 0.2, treble: 0.3,
            echo: 1.2, gateThreshold: 0.003, deEsser: 0.1
        },

        // === CẤP ĐỘ 4: BOM TẤN ===
        '💥 Bom Nổ': {
            desc: 'Cực to, cực bão hòa, cực vang',
            preGain: 800, drive: 1.0, crush: 0.8, width: 1.0,
            postGain: 10, bass: 1.0, treble: 0.8,
            echo: 0.5, gateThreshold: 0.001, deEsser: 0.01
        },
        '🔊 Loa Phường': {
            desc: 'Giọng loa phường, cực to, vang xa',
            preGain: 400, drive: 0.6, crush: 0.3, width: 0.8,
            postGain: 7, bass: 0.8, treble: 0.6,
            echo: 0.4, gateThreshold: 0.002, deEsser: 0.02
        },
        '📢 Hỏng Mic': {
            desc: 'Như mic hỏng, cực ồn, cực méo',
            preGain: 1200, drive: 0.7, crush: 0.5, width: 0.6,
            postGain: 12, bass: 0.7, treble: 0.7,
            echo: 0.3, gateThreshold: 0, deEsser: 0
        },
        '💀 Chết Tiếng Cực Hạn': {
            desc: 'Gần như hỏng mic, cực méo, cực ồn',
            preGain: 1500, drive: 1.0, crush: 0.9, width: 1.0,
            postGain: 15, bass: 1.0, treble: 1.0,
            echo: 0.5, gateThreshold: 0, deEsser: 0
        },
        '🔥 Siêu Bom': {
            desc: 'Bom nổ cấp độ hủy diệt',
            preGain: 2000, drive: 1.0, crush: 1.0, width: 1.0,
            postGain: 20, bass: 1.0, treble: 1.0,
            echo: 0.8, gateThreshold: 0, deEsser: 0
        },

        // === CẤP ĐỘ 5: ROBOT & BIẾN GIỌNG ===
        '🤖 Robot Bão Tố': {
            desc: 'Robot nhưng cực bão hòa, điên loạn',
            preGain: 350, drive: 1.0, crush: 0.9, width: 0,
            postGain: 6, bass: 0, treble: 1.0,
            echo: 0.3, gateThreshold: 0.001, deEsser: 0
        },
        '🤖 Robot Tận Thế': {
            desc: 'Robot hủy diệt, cực méo, cực ồn',
            preGain: 500, drive: 1.0, crush: 1.0, width: 0,
            postGain: 8, bass: 0, treble: 1.0,
            echo: 0.5, gateThreshold: 0, deEsser: 0
        },
        '🐿 Chipmunk Điên': {
            desc: 'Giọng chipmunk + méo tiếng',
            preGain: 200, drive: 0.8, crush: 0, width: 0,
            postGain: 4, bass: 0, treble: 0.9,
            echo: 0.2, gateThreshold: 0.003, deEsser: 0
        },
        '🐺 Quái Vật': {
            desc: 'Giọng quái vật, đáng sợ, méo mó',
            preGain: 400, drive: 0.9, crush: 0.8, width: 0.4,
            postGain: 7, bass: 0.7, treble: 0.6,
            echo: 0.4, gateThreshold: 0.001, deEsser: 0.02
        },
        '🦇 Ma Cà Rồng': {
            desc: 'Giọng ma cà rồng, trầm, ẩm ương',
            preGain: 350, drive: 0.7, crush: 0.6, width: 0.3,
            postGain: 6, bass: 0.9, treble: 0.2,
            echo: 0.3, gateThreshold: 0.002, deEsser: 0.05
        },

        // === CẤP ĐỘ 6: BABY & GIỌNG TRẺ EM ===
        '🍼 Baby Dễ Thương': {
            desc: 'Giọng baby, trong trẻo, dễ thương',
            preGain: 15, drive: 0, crush: 0, width: 0.1,
            postGain: 1.2, bass: 0, treble: 0.6,
            echo: 0.05, gateThreshold: 0.008, deEsser: 0.5
        },
        '👶 Baby Siêu Cao': {
            desc: 'Giọng baby cực cao, như chuột chip',
            preGain: 20, drive: 0, crush: 0, width: 0,
            postGain: 1.5, bass: 0, treble: 1.0,
            echo: 0.08, gateThreshold: 0.005, deEsser: 0.6
        },
        '🧸 Baby Méo Tiếng': {
            desc: 'Baby nhưng méo tiếng, hài hước',
            preGain: 30, drive: 0.3, crush: 0, width: 0.1,
            postGain: 1.8, bass: 0, treble: 0.8,
            echo: 0.1, gateThreshold: 0.005, deEsser: 0.4
        },
        '🎀 Baby Vang': {
            desc: 'Baby + vang, đáng yêu nhưng ám ảnh',
            preGain: 25, drive: 0.1, crush: 0, width: 0.2,
            postGain: 1.6, bass: 0.1, treble: 0.7,
            echo: 0.4, gateThreshold: 0.005, deEsser: 0.5
        },

        // === CẤP ĐỘ 7: ĐẶC BIỆT ===
        '🚂 Âm Thanh Tàu Hỏa': {
            desc: 'Như tàu hỏa đang chạy, ồn ào',
            preGain: 250, drive: 0.7, crush: 0.5, width: 0.5,
            postGain: 5, bass: 0.5, treble: 0.5,
            echo: 0.6, gateThreshold: 0.001, deEsser: 0.02
        },
        '🌍 Động Đất': {
            desc: 'Rung, ồn như động đất',
            preGain: 600, drive: 0.8, crush: 0.7, width: 0.7,
            postGain: 9, bass: 1.0, treble: 0.3,
            echo: 0.4, gateThreshold: 0.001, deEsser: 0.01
        },
        '🌪️ Bão Cát': {
            desc: 'Ồn ào, như bão cát',
            preGain: 400, drive: 1.0, crush: 0.6, width: 0.8,
            postGain: 7, bass: 0.7, treble: 0.7,
            echo: 0.5, gateThreshold: 0.001, deEsser: 0
        },
        '⚡ Tiếng Sấm': {
            desc: 'Vang rền như tiếng sấm',
            preGain: 500, drive: 0.5, crush: 0.2, width: 0.6,
            postGain: 8, bass: 0.8, treble: 0.4,
            echo: 1.0, gateThreshold: 0.001, deEsser: 0.02
        },
        '🌊 Sóng Thần': {
            desc: 'Ầm ầm như sóng thần ập tới',
            preGain: 700, drive: 0.9, crush: 0.7, width: 0.9,
            postGain: 10, bass: 1.0, treble: 0.5,
            echo: 0.6, gateThreshold: 0.001, deEsser: 0.01
        },
        '🔥 Núi Lửa Phun': {
            desc: 'Giọng như núi lửa đang phun trào',
            preGain: 550, drive: 0.8, crush: 0.6, width: 0.7,
            postGain: 9, bass: 0.9, treble: 0.4,
            echo: 0.5, gateThreshold: 0.001, deEsser: 0.02
        },
        '🌀 Lốc Xoáy': {
            desc: 'Giọng như bị cuốn vào lốc xoáy',
            preGain: 300, drive: 0.9, crush: 0.5, width: 1.0,
            postGain: 6, bass: 0.5, treble: 0.8,
            echo: 0.7, gateThreshold: 0.001, deEsser: 0.01
        },
        '💀 Thần Chết': {
            desc: 'Giọng của thần chết, lạnh lùng, đáng sợ',
            preGain: 450, drive: 0.8, crush: 0.9, width: 0.4,
            postGain: 8, bass: 0.8, treble: 0.2,
            echo: 0.3, gateThreshold: 0.002, deEsser: 0.05
        },
    };

    // ═══════════════════════════════════════
    //  LƯU CONFIG CỦA MÀY
    // ═══════════════════════════════════════
    let savedConfigs = JSON.parse(localStorage.getItem('hellfire_configs') || '{}');

    function saveConfigToStorage(name) {
        if (!name || name.trim() === '') return false;
        savedConfigs[name] = { ...P };
        localStorage.setItem('hellfire_configs', JSON.stringify(savedConfigs));
        return true;
    }

    function loadConfigFromStorage(name) {
        if (!savedConfigs[name]) return false;
        Object.assign(P, savedConfigs[name]);
        return true;
    }

    function deleteConfigFromStorage(name) {
        if (!savedConfigs[name]) return false;
        delete savedConfigs[name];
        localStorage.setItem('hellfire_configs', JSON.stringify(savedConfigs));
        return true;
    }

    function getSavedConfigNames() {
        return Object.keys(savedConfigs);
    }

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

            for (let i=0; i<inp[0].length; i++) {
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
    const _NativeCtx = window.AudioContext || window.webkitAudioContext;
    let _ctx = null;

    class BODUYAudioContext extends _NativeCtx {
        constructor(...args) {
            super({ latencyHint: 'interactive', sampleRate: 48000 });
            if (!_ctx) {
                _ctx = this;
                const blob = new Blob([WORKLET], { type: 'application/javascript' });
                _ctx.audioWorklet.addModule(URL.createObjectURL(blob))
                    .then(() => UI.badge('SẴN SÀNG', '#0f0'));
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
            UI.badge('BẬT', '#0f0');
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
        }
    };

    // ═══════════════════════════════════════
    //  APPLY CONFIG
    // ═══════════════════════════════════════
    function applyConfig(config) {
        Object.assign(P, config);
        Core.push();
        syncUI();
        updateInputs();
        console.log('✅ Đã áp dụng config');
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
        };
        Object.keys(map).forEach(param => {
            const num = document.getElementById(map[param]);
            if (num) num.value = P[param].toFixed(4);
        });
        document.querySelectorAll('.suggestion-btn').forEach(b => {
            const isActive = b.dataset.config && JSON.stringify(P) === JSON.stringify(SUGGESTIONS[b.dataset.config]);
            b.style.background = isActive ? '#0f0' : '#0a1a0a';
            b.style.color = isActive ? '#000' : '#0f0';
            b.style.boxShadow = isActive ? '0 0 20px #0f0' : 'none';
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
            else lb.innerText = val.toFixed(2);
        });
    }

    // ═══════════════════════════════════════
    //  UI
    // ═══════════════════════════════════════
    const UI = {
        badge(t, c) {
            const e = document.getElementById('kh-st'),
                d = document.getElementById('kh-dot');
            if (e) { e.innerText = t;
                e.style.color = c; }
            if (d) { d.style.background = c;
                d.style.boxShadow = '0 0 10px ' + c; }
        },
        init() {
            // NÚT TRÒN
            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'kh-toggle';
            toggleBtn.textContent = '🎤';
            toggleBtn.style.cssText = `
                position:fixed;bottom:20px;left:20px;z-index:999999;
                width:56px;height:56px;border-radius:50%;
                background:linear-gradient(135deg,#0a0a12,#1a1a2e);
                border:2px solid #00ff88;color:#00ff88;font-size:24px;cursor:pointer;
                box-shadow:0 0 30px #00ff8840, inset 0 0 30px #00ff8820;
                transition:all 0.3s ease;
                display:flex;align-items:center;justify-content:center;
                font-family:'Segoe UI',sans-serif;user-select:none;
            `;
            document.body.appendChild(toggleBtn);

            // MAIN UI
            const el = document.createElement('div');
            el.id = 'kh-root';
            let html = `
            <div id="kh-head">
                <div id="kh-title"><span style="font-size:18px;">🎤</span><span id="kh-name">BỐ DUY KHÁNH</span></div>
                <div id="kh-right">
                    <div id="kh-badge"><span id="kh-dot"></span><span id="kh-st">CHỜ</span></div>
                    <button id="kh-close">✕</button>
                </div>
            </div>
            <div id="kh-body">
                <!-- LIST GỢI Ý -->
                <div class="kh-section-title">💀 CONFIG GÂY ỒN</div>
                <div id="kh-suggestions">
                    ${Object.keys(SUGGESTIONS).map(key => `
                        <button class="suggestion-btn" data-config="${key}">
                            ${key}
                            <span style="font-size:9px;color:#888;display:block;">${SUGGESTIONS[key].desc}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="kh-sep"></div>

                <!-- LƯU CONFIG -->
                <div class="kh-section-title">💾 LƯU CONFIG</div>
                <div style="display:flex;gap:6px;margin-bottom:8px;">
                    <input type="text" id="config-name-input" placeholder="Tên config..." style="flex:1;background:#0a1a0a;border:1px solid #00ff8840;color:#00ff88;border-radius:4px;padding:6px 8px;font-size:12px;">
                    <button id="save-config-btn" style="padding:6px 12px;background:#0a1a0a;border:1px solid #00ff8840;color:#00ff88;border-radius:4px;cursor:pointer;">💾 LƯU</button>
                </div>
                <div id="saved-configs-list" style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;">
                    ${getSavedConfigNames().map(name => `
                        <button class="saved-config-btn" data-name="${name}">
                            ${name}
                            <span style="font-size:10px;color:#ff3355;margin-left:4px;" class="del-config">✕</span>
                        </button>
                    `).join('')}
                </div>
                <div class="kh-sep"></div>

                <!-- SLIDERS -->
                ${[
                    ['sl-pg', 'lb-pg', 'num-pg', '🔊 TIỀN KHUẾCH', '1.0x', 'preGain'],
                    ['sl-dr', 'lb-dr', 'num-dr', '🔥 DRIVE', '0.00', 'drive'],
                    ['sl-cr', 'lb-cr', 'num-cr', '💥 NÉN', '0.00', 'crush'],
                    ['sl-wd', 'lb-wd', 'num-wd', '📢 MỞ RỘNG', '0.00', 'width'],
                    ['sl-po', 'lb-po', 'num-po', '⚡ HẬU KHUẾCH', '1.0x', 'postGain'],
                    ['sl-bs', 'lb-bs', 'num-bs', '🎸 BASS', '0.00', 'bass'],
                    ['sl-tr', 'lb-tr', 'num-tr', '🎵 TREBLE', '0.00', 'treble'],
                    ['sl-ec', 'lb-ec', 'num-ec', '🔊 VANG', '0.00', 'echo'],
                    ['sl-gt', 'lb-gt', 'num-gt', '🔇 LỌC NHIỄU', '0.000', 'gateThreshold'],
                    ['sl-de', 'lb-de', 'num-de', '🗣️ LỌC XÌ', '0.00', 'deEsser'],
                ].map(([slId, lbId, numId, label, defaultVal, param]) => `
                    <div class="kh-row">
                        <div class="kh-rowlabel">
                            <span>${label}</span>
                            <div style="display:flex;gap:6px;align-items:center;">
                                <span id="${lbId}">${defaultVal}</span>
                                <input type="number" id="${numId}" value="${defaultVal}" style="width:70px;background:#0a1a0a;border:1px solid #00ff8840;color:#00ff88;border-radius:4px;padding:2px 4px;font-size:11px;text-align:center;">
                            </div>
                        </div>
                        <input type="range" id="${slId}" min="0" max="1000" step="1" value="0" style="--v:0%">
                    </div>
                `).join('')}

                <div class="kh-sep"></div>
                <button id="kh-rst">↺ KHÔI PHỤC</button>
            </div>
            `;
            el.innerHTML = html;
            document.body.appendChild(el);

            // SỰ KIỆN
            let uiVisible = true;
            toggleBtn.onclick = () => {
                uiVisible = !uiVisible;
                el.style.display = uiVisible ? 'block' : 'none';
                toggleBtn.style.borderColor = uiVisible ? '#00ff88' : '#ff3355';
                toggleBtn.textContent = uiVisible ? '🎤' : '🔇';
            };

            this.css();
            this.events();
            this.badge('CHỜ', '#888');
            syncUI();
            updateInputs();

            // 7 MÀU
            let hue = 0;
            const root = document.getElementById('kh-root');
            setInterval(() => {
                hue = (hue + 0.005) % 1;
                root.style.borderColor = `hsl(${hue * 360}, 100%, 50%)`;
                root.style.boxShadow = `0 0 40px hsla(${hue * 360}, 100%, 50%, 0.3), inset 0 0 40px hsla(${hue * 360}, 100%, 50%, 0.1)`;
                const name = document.getElementById('kh-name');
                if (name) name.style.textShadow = `0 0 30px hsl(${hue * 360}, 100%, 50%)`;
                const dot = document.getElementById('kh-dot');
                if (dot) dot.style.background = `hsl(${hue * 360}, 100%, 50%)`;
            }, 50);
        },
        events() {
            document.getElementById('kh-close').onclick = () => {
                document.getElementById('kh-root').style.display = 'none';
                document.getElementById('kh-toggle').style.borderColor = '#ff3355';
                document.getElementById('kh-toggle').textContent = '🔇';
            };

            // GỢI Ý
            document.querySelectorAll('.suggestion-btn').forEach(btn => {
                btn.onclick = () => {
                    const key = btn.dataset.config;
                    if (SUGGESTIONS[key]) {
                        applyConfig(SUGGESTIONS[key]);
                        document.querySelectorAll('.suggestion-btn').forEach(b => {
                            b.style.background = b === btn ? '#0f0' : '#0a1a0a';
                            b.style.color = b === btn ? '#000' : '#0f0';
                            b.style.boxShadow = b === btn ? '0 0 20px #0f0' : 'none';
                        });
                    }
                };
            });

            // LƯU CONFIG
            document.getElementById('save-config-btn').onclick = () => {
                const nameInput = document.getElementById('config-name-input');
                const name = nameInput.value.trim();
                if (!name) {
                    console.warn('⚠️ Nhập tên config!');
                    return;
                }
                if (saveConfigToStorage(name)) {
                    console.log('✅ Đã lưu config:', name);
                    nameInput.value = '';
                    refreshSavedConfigs();
                }
            };

            // XÓA CONFIG
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('del-config')) {
                    const parent = e.target.closest('.saved-config-btn');
                    if (parent) {
                        const name = parent.dataset.name;
                        if (deleteConfigFromStorage(name)) {
                            console.log('🗑️ Đã xóa config:', name);
                            refreshSavedConfigs();
                        }
                    }
                }
            });

            // LOAD CONFIG ĐÃ LƯU
            document.addEventListener('click', (e) => {
                const btn = e.target.closest('.saved-config-btn');
                if (btn && !e.target.classList.contains('del-config')) {
                    const name = btn.dataset.name;
                    if (loadConfigFromStorage(name)) {
                        console.log('✅ Đã load config:', name);
                        syncUI();
                        updateInputs();
                    }
                }
            });

            // SLIDERS + INPUTS
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

                num.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') num.blur();
                });
            });

            document.getElementById('kh-rst').onclick = () => {
                applyConfig({ preGain: 1, drive: 0, crush: 0, width: 0, postGain: 1, bass: 0, treble: 0, echo: 0, gateThreshold: 0.005, deEsser: 0 });
                document.querySelectorAll('.suggestion-btn').forEach(b => {
                    b.style.background = '#0a1a0a';
                    b.style.color = '#0f0';
                    b.style.boxShadow = 'none';
                });
                console.log('🔄 Reset về mặc định');
            };
        },
        css() {
            const s = document.createElement('style');
            s.textContent = `
            #kh-root{position:fixed;top:20px;right:20px;width:380px;background:#0a0a12;border:3px solid #00ff88;border-radius:16px;box-shadow:0 0 40px #00ff8840, inset 0 0 40px #00ff8820;font-family:'Segoe UI',sans-serif;color:#00ff88;z-index:999998;user-select:none;max-height:95vh;overflow-y:auto;}
            #kh-head{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:#0f0f1a;border-bottom:1px solid #00ff8840;border-radius:16px 16px 0 0;}
            #kh-title{display:flex;align-items:center;gap:10px;}
            #kh-name{font-size:18px;font-weight:900;letter-spacing:1px;}
            #kh-badge{display:flex;align-items:center;gap:6px;background:#0a0a12;padding:4px 12px;border-radius:12px;border:1px solid #00ff8840;}
            #kh-dot{width:10px;height:10px;border-radius:50%;background:#888;}
            #kh-st{font-size:10px;color:#888;letter-spacing:1px;font-weight:bold;}
            #kh-close{background:none;border:1px solid #ff335540;color:#ff3355;border-radius:6px;width:28px;height:28px;font-size:14px;cursor:pointer;}
            #kh-close:hover{background:#ff335520;border-color:#ff3355;}
            #kh-body{padding:16px;}
            #kh-body::-webkit-scrollbar{width:4px;}
            #kh-body::-webkit-scrollbar-thumb{background:#00ff8840;border-radius:4px;}
            .kh-section-title{font-size:11px;font-weight:bold;color:#00ff88;margin:8px 0 6px;letter-spacing:1px;}
            #kh-suggestions{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:8px;}
            .suggestion-btn{padding:6px 8px;font-size:10px;font-weight:bold;background:#0a1a0a;border:1px solid #00ff8840;color:#0f0;border-radius:6px;cursor:pointer;transition:all .2s;text-align:left;line-height:1.3;}
            .suggestion-btn:hover{background:#00ff8820;border-color:#00ff88;transform:scale(1.02);}
            #saved-configs-list{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;}
            .saved-config-btn{flex:0 1 auto;padding:4px 8px;font-size:10px;font-weight:bold;background:#0a0a1a;border:1px solid #a78bfa40;color:#a78bfa;border-radius:4px;cursor:pointer;transition:all .2s;}
            .saved-config-btn:hover{background:#a78bfa20;border-color:#a78bfa;}
            .del-config{cursor:pointer;color:#ff3355;}
            .del-config:hover{color:#ff0000;}
            .kh-sep{height:1px;background:linear-gradient(90deg,transparent,#00ff8860,transparent);margin:6px 0;}
            .kh-rowlabel{display:flex;justify-content:space-between;font-size:11px;font-weight:bold;margin-bottom:3px;}
            .kh-rowlabel span:last-child{color:#fff;text-shadow:0 0 10px #00ff88;}
            .kh-rowlabel input[type=number]{width:70px;background:#0a1a0a;border:1px solid #00ff8840;color:#00ff88;border-radius:4px;padding:2px 4px;font-size:11px;text-align:center;}
            .kh-rowlabel input[type=number]:focus{outline:none;border-color:#00ff88;box-shadow:0 0 15px #00ff8840;}
            input[type=range]{-webkit-appearance:none;width:100%;height:4px;background:linear-gradient(90deg,#00ff88 var(--v,0%),#1a1a2e var(--v,0%));border-radius:4px;outline:none;}
            input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;background:#0a0a12;border:2px solid #00ff88;border-radius:50%;cursor:pointer;box-shadow:0 0 12px #00ff8840;}
            #kh-rst{width:100%;padding:8px;margin-top:8px;background:transparent;border:1px solid #00ff8840;color:#00ff88;font-size:12px;font-weight:bold;border-radius:6px;cursor:pointer;transition:all .2s;}
            #kh-rst:hover{background:#00ff8820;border-color:#00ff88;}
            @media (max-width:480px){#kh-root{width:320px;right:10px;top:10px;}}
            `;
            document.head.appendChild(s);
        }
    };

    function refreshSavedConfigs() {
        const container = document.getElementById('saved-configs-list');
        if (!container) return;
        const names = getSavedConfigNames();
        container.innerHTML = names.map(name => `
            <button class="saved-config-btn" data-name="${name}">
                ${name}
                <span style="font-size:10px;color:#ff3355;margin-left:4px;" class="del-config">✕</span>
            </button>
        `).join('');
    }

    // ═══════════════════════════════════════
    //  BOOT
    // ═══════════════════════════════════════
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => UI.init());
    else UI.init();

    console.log('✅ HELLFIRE TROLL - Bố Duy Khánh đã sẵn sàng!');
    console.log('💀 Config gây ồn, khó chịu, trolling');
    console.log('🍼 Đã thêm config giọng Baby!');
})();