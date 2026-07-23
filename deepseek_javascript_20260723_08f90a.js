// hellfire_sieupham.js - Bố Duy Khánh SIÊU PHẨM EDITION
// Tab điều hướng + Spam chat + Lấy token + 3D Glassmorphism + Drag & Drop

(function () {
    'use strict';
    if (window.__BDK_SIEUPHAM__) return;
    window.__BDK_SIEUPHAM__ = true;

    console.log('%c🔥 HELLFIRE SIÊU PHẨM - Bố Duy Khánh', 'font-size:24px;font-weight:bold;color:#ff6b6b;text-shadow:0 0 40px #ff6b6b;');

    // ============================================================
    //  PARAMETERS
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
        musicVolume: 0.5,
    };

    // ============================================================
    //  CONFIG LIST
    // ============================================================
    const CONFIG_LIST = [
        { name: '🔥 Lấn Át (Cơ Bản)', desc: 'To, dày, át đối phương', preGain: 200, drive: 0.8, crush: 0.4, width: 0.6, postGain: 5, bass: 0.9, treble: 0.5, echo: 0.2, gateThreshold: 0.002, deEsser: 0.05 },
        { name: '💀 Lấn Át Cực Đỉnh', desc: 'Bão hòa max, át hết mọi thứ', preGain: 500, drive: 1.0, crush: 0.6, width: 0.9, postGain: 8, bass: 1.0, treble: 0.7, echo: 0.35, gateThreshold: 0.001, deEsser: 0.02 },
        { name: '⚡ Lấn Át Tối Thượng', desc: 'Át hoàn toàn, không cho đối phương thở', preGain: 700, drive: 1.0, crush: 0.8, width: 1.0, postGain: 10, bass: 1.0, treble: 0.8, echo: 0.5, gateThreshold: 0.001, deEsser: 0.01 },
        { name: '🔊 Loa Phường', desc: 'Giọng loa phường, cực to, vang xa', preGain: 400, drive: 0.6, crush: 0.3, width: 0.8, postGain: 7, bass: 0.8, treble: 0.6, echo: 0.4, gateThreshold: 0.002, deEsser: 0.02 },
        { name: '💥 Bom Nổ', desc: 'Cực to, cực bão hòa, cực vang', preGain: 800, drive: 1.0, crush: 0.8, width: 1.0, postGain: 10, bass: 1.0, treble: 0.8, echo: 0.5, gateThreshold: 0.001, deEsser: 0.01 },
        { name: '😈 Giọng Ác Quỷ', desc: 'Trầm, bão hòa, đáng sợ', preGain: 300, drive: 0.9, crush: 0.7, width: 0.4, postGain: 6, bass: 1.0, treble: 0.1, echo: 0.25, gateThreshold: 0.002, deEsser: 0.08 },
        { name: '🌀 Echo Siêu Vang', desc: 'Vang dài, như trong hang động', preGain: 100, drive: 0.3, crush: 0, width: 0.5, postGain: 3, bass: 0.3, treble: 0.4, echo: 0.8, gateThreshold: 0.005, deEsser: 0.1 },
        { name: '💀 Thần Chết', desc: 'Giọng của thần chết, lạnh lùng, đáng sợ', preGain: 450, drive: 0.8, crush: 0.9, width: 0.4, postGain: 8, bass: 0.8, treble: 0.2, echo: 0.3, gateThreshold: 0.002, deEsser: 0.05 },
    ];

    // ============================================================
    //  WORKLET - GIỮ NGUYÊN HELLFIRE
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
                    .then(() => UI.badge('SẴN SÀNG', '#fff'));
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

    // ============================================================
    //  APPLY CONFIG
    // ============================================================
    function applyConfig(config) {
        Object.assign(P, config);
        Core.push();
        syncUI();
        updateInputs();
        showToast(`✅ Đã áp dụng: ${config.name || 'Custom'}`, 'success');
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

    // ============================================================
    //  TOAST NOTIFICATION
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
    //  SPAM CHAT
    // ============================================================
    let spamRunning = false;
    let spamStop = false;

    async function spamChat(token, channelId, content, count, delay) {
        spamStop = false;
        let sent = 0;
        let failed = 0;
        
        for (let i = 0; i < count; i++) {
            if (spamStop) break;
            try {
                const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: content })
                });
                if (response.status === 200) {
                    sent++;
                    document.getElementById('spam-status').textContent = `✅ Đã gửi: ${sent}/${count}`;
                } else {
                    failed++;
                    document.getElementById('spam-status').textContent = `❌ Lỗi: ${response.status} | Thành công: ${sent}/${count}`;
                }
            } catch (e) {
                failed++;
                document.getElementById('spam-status').textContent = `❌ Lỗi kết nối | Thành công: ${sent}/${count}`;
            }
            await new Promise(r => setTimeout(r, delay * 1000));
        }
        spamRunning = false;
        document.getElementById('spam-status').textContent = `✅ Hoàn thành! Gửi: ${sent}, Lỗi: ${failed}`;
        showToast(`✅ Spam hoàn thành! Gửi: ${sent}, Lỗi: ${failed}`, 'success');
    }

    // ============================================================
    //  LẤY TOKEN USER
    // ============================================================
    function getToken() {
        try {
            let token = localStorage.getItem('token');
            if (!token) {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    const value = localStorage.getItem(key);
                    if (value && value.length > 50 && !value.includes('{')) {
                        token = value;
                        break;
                    }
                }
            }
            if (!token) {
                const webpack = window.webpackChunkdiscord_app || window.webpackChunkdiscord;
                if (webpack) {
                    const str = JSON.stringify(webpack);
                    const match = str.match(/"token":"([^"]+)"/);
                    if (match) token = match[1];
                }
            }
            return token;
        } catch (e) {
            return null;
        }
    }

    // ============================================================
    //  UI - GLASSMORPHISM + 3D + DRAG & DROP + TABS
    // ============================================================
    const UI = {
        badge(t, c) {
            const e = document.getElementById('kh-st'),
                d = document.getElementById('kh-dot');
            if (e) { e.innerText = t; e.style.color = c; }
            if (d) { d.style.background = c; d.style.boxShadow = '0 0 10px ' + c; }
        },
        init() {
            // Nút toggle
            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'kh-toggle';
            toggleBtn.textContent = '🔥';
            toggleBtn.style.cssText = `
                position:fixed;bottom:24px;left:24px;z-index:999999;
                width:60px;height:60px;border-radius:50%;
                background:rgba(255,255,255,0.05);
                backdrop-filter:blur(20px);
                border:1px solid rgba(255,255,255,0.1);
                color:#fff;font-size:28px;cursor:pointer;
                box-shadow:0 8px 32px rgba(0,0,0,0.3);
                transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                display:flex;align-items:center;justify-content:center;
                font-family:'Segoe UI',sans-serif;user-select:none;
            `;
            toggleBtn.onmouseenter = () => {
                toggleBtn.style.transform = 'scale(1.1)';
                toggleBtn.style.boxShadow = '0 8px 48px rgba(255,255,255,0.1)';
            };
            toggleBtn.onmouseleave = () => {
                toggleBtn.style.transform = 'scale(1)';
            };
            document.body.appendChild(toggleBtn);

            // Main UI
            const el = document.createElement('div');
            el.id = 'kh-root';
            el.style.cssText = `
                position:fixed;top:20px;right:20px;width:450px;
                background:rgba(10,10,10,0.7);
                backdrop-filter:blur(40px);
                border:1px solid rgba(255,255,255,0.08);
                border-radius:20px;
                box-shadow:0 8px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
                font-family:'Segoe UI',system-ui,sans-serif;
                color:#fff;
                z-index:999998;
                user-select:none;
                max-height:90vh;
                overflow:hidden;
                transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                display:none;
            `;
            let html = `
            <div id="kh-head" style="display:flex;justify-content:space-between;align-items:center;padding:16px 20px;background:rgba(0,0,0,0.3);border-bottom:1px solid rgba(255,255,255,0.05);cursor:move;">
                <div id="kh-title" style="display:flex;align-items:center;gap:12px;">
                    <span style="font-size:20px;">🔥</span>
                    <span id="kh-name" style="font-size:18px;font-weight:900;letter-spacing:1px;text-shadow:0 0 20px rgba(255,255,255,0.1);">SIÊU PHẨM</span>
                </div>
                <div id="kh-right" style="display:flex;align-items:center;gap:12px;">
                    <div id="kh-badge" style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.03);padding:4px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.05);">
                        <span id="kh-dot" style="width:8px;height:8px;border-radius:50%;background:#888;display:inline-block;"></span>
                        <span id="kh-st" style="font-size:10px;color:#666;letter-spacing:1px;font-weight:bold;">CHỜ</span>
                    </div>
                    <button id="kh-close" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);color:#666;border-radius:8px;width:28px;height:28px;font-size:14px;cursor:pointer;transition:all 0.3s;">✕</button>
                </div>
            </div>
            <div style="display:flex;gap:4px;padding:8px 16px;background:rgba(0,0,0,0.2);border-bottom:1px solid rgba(255,255,255,0.05);">
                <button class="kh-tab active" data-tab="audio" style="flex:1;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.05);color:#fff;border-radius:6px;cursor:pointer;font-size:11px;transition:all 0.3s;">🎵 Âm thanh</button>
                <button class="kh-tab" data-tab="spam" style="flex:1;padding:6px 8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.02);color:#666;border-radius:6px;cursor:pointer;font-size:11px;transition:all 0.3s;">💬 Spam</button>
                <button class="kh-tab" data-tab="token" style="flex:1;padding:6px 8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.02);color:#666;border-radius:6px;cursor:pointer;font-size:11px;transition:all 0.3s;">🔑 Token</button>
            </div>
            <div id="kh-body" style="padding:16px;overflow-y:auto;max-height:calc(90vh - 140px);">
                <!-- TAB AUDIO -->
                <div id="tab-audio" class="kh-tab-content">
                    <div style="margin-bottom:12px;">
                        <div style="font-size:11px;color:#666;margin-bottom:6px;">🎯 CHỌN CONFIG</div>
                        <select id="config-select" style="width:100%;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#fff;border-radius:8px;font-size:13px;cursor:pointer;">
                            <option value="">-- Chọn config --</option>
                            ${CONFIG_LIST.map((c, i) => `
                                <option value="${i}">${c.name} - ${c.desc}</option>
                            `).join('')}
                        </select>
                        <div id="config-info" style="font-size:10px;color:#444;margin-top:6px;padding:6px 10px;background:rgba(255,255,255,0.02);border-radius:6px;border:1px solid rgba(255,255,255,0.03);">
                            💡 Chọn config để áp dụng hiệu ứng
                        </div>
                    </div>
                    <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:8px;margin-bottom:12px;border:1px solid rgba(255,255,255,0.05);">
                        <canvas id="kh-visualizer" style="width:100%;height:60px;display:block;border-radius:4px;"></canvas>
                    </div>
                    <!-- SLIDERS -->
                    ${[
                        ['sl-pg', 'lb-pg', 'num-pg', '🔊 PRE GAIN', '1.0x', 'preGain'],
                        ['sl-dr', 'lb-dr', 'num-dr', '🔥 DRIVE', '0.00', 'drive'],
                        ['sl-cr', 'lb-cr', 'num-cr', '💥 CRUSH', '0.00', 'crush'],
                        ['sl-po', 'lb-po', 'num-po', '⚡ POST GAIN', '1.0x', 'postGain'],
                    ].map(([slId, lbId, numId, label, defaultVal, param]) => `
                        <div style="margin-bottom:10px;">
                            <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:bold;margin-bottom:2px;">
                                <span style="opacity:0.6;">${label}</span>
                                <span id="${lbId}" style="color:#fff;">${defaultVal}</span>
                            </div>
                            <input type="range" id="${slId}" min="0" max="1000" step="1" value="0" style="width:100%;-webkit-appearance:none;height:3px;background:linear-gradient(90deg,rgba(255,255,255,0.1) var(--v,0%),rgba(255,255,255,0.02) var(--v,0%));border-radius:10px;outline:none;">
                            <input type="number" id="${numId}" value="${defaultVal}" style="width:100%;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);color:#fff;border-radius:4px;padding:2px 6px;font-size:10px;text-align:center;margin-top:2px;">
                        </div>
                    `).join('')}
                    <button id="kh-rst" style="width:100%;padding:8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);color:#888;border-radius:8px;cursor:pointer;font-size:12px;transition:all 0.3s;">↺ RESET</button>
                </div>
                
                <!-- TAB SPAM -->
                <div id="tab-spam" class="kh-tab-content" style="display:none;">
                    <div style="margin-bottom:10px;">
                        <div style="font-size:11px;color:#666;margin-bottom:4px;">🔑 Token (để trống dùng token hiện tại)</div>
                        <input id="spam-token" type="text" placeholder="Nhập token..." style="width:100%;padding:6px 10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#fff;border-radius:6px;font-size:12px;">
                    </div>
                    <div style="margin-bottom:10px;">
                        <div style="font-size:11px;color:#666;margin-bottom:4px;">📢 Channel ID</div>
                        <input id="spam-channel" type="text" placeholder="Nhập Channel ID..." style="width:100%;padding:6px 10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#fff;border-radius:6px;font-size:12px;">
                    </div>
                    <div style="margin-bottom:10px;">
                        <div style="font-size:11px;color:#666;margin-bottom:4px;">📝 Nội dung</div>
                        <textarea id="spam-content" rows="2" placeholder="Nhập nội dung spam..." style="width:100%;padding:6px 10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#fff;border-radius:6px;font-size:12px;resize:vertical;"></textarea>
                    </div>
                    <div style="display:flex;gap:8px;margin-bottom:10px;">
                        <div style="flex:1;">
                            <div style="font-size:11px;color:#666;margin-bottom:4px;">🔢 Số lần</div>
                            <input id="spam-count" type="number" value="10" min="1" style="width:100%;padding:6px 10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#fff;border-radius:6px;font-size:12px;">
                        </div>
                        <div style="flex:1;">
                            <div style="font-size:11px;color:#666;margin-bottom:4px;">⏱️ Delay (s)</div>
                            <input id="spam-delay" type="number" value="1" min="0.1" step="0.1" style="width:100%;padding:6px 10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#fff;border-radius:6px;font-size:12px;">
                        </div>
                    </div>
                    <div style="display:flex;gap:8px;margin-bottom:10px;">
                        <button id="spam-start" style="flex:1;padding:8px;background:rgba(76,175,80,0.2);border:1px solid #4caf50;color:#4caf50;border-radius:6px;cursor:pointer;font-weight:bold;">🚀 START</button>
                        <button id="spam-stop" style="flex:1;padding:8px;background:rgba(255,107,107,0.2);border:1px solid #ff6b6b;color:#ff6b6b;border-radius:6px;cursor:pointer;font-weight:bold;">⏹ STOP</button>
                    </div>
                    <div id="spam-status" style="font-size:11px;color:#666;padding:6px 10px;background:rgba(255,255,255,0.02);border-radius:6px;border:1px solid rgba(255,255,255,0.03);">⏳ Chưa bắt đầu</div>
                </div>
                
                <!-- TAB TOKEN -->
                <div id="tab-token" class="kh-tab-content" style="display:none;">
                    <div style="margin-bottom:10px;">
                        <button id="token-get" style="width:100%;padding:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:8px;cursor:pointer;font-weight:bold;transition:all 0.3s;">🔑 LẤY TOKEN</button>
                    </div>
                    <div style="margin-bottom:10px;">
                        <div style="font-size:11px;color:#666;margin-bottom:4px;">📋 Token của bạn:</div>
                        <textarea id="token-result" rows="3" readonly style="width:100%;padding:8px 10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);color:#888;border-radius:6px;font-size:11px;font-family:monospace;resize:vertical;"></textarea>
                    </div>
                    <div style="display:flex;gap:8px;">
                        <button id="token-copy" style="flex:1;padding:6px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);color:#888;border-radius:6px;cursor:pointer;font-size:11px;">📋 COPY</button>
                        <button id="token-clear" style="flex:1;padding:6px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);color:#888;border-radius:6px;cursor:pointer;font-size:11px;">🗑 XÓA</button>
                    </div>
                </div>
            </div>
            `;
            el.innerHTML = html;
            document.body.appendChild(el);

            // ===== TABS =====
            document.querySelectorAll('.kh-tab').forEach(tab => {
                tab.onclick = function() {
                    document.querySelectorAll('.kh-tab').forEach(t => {
                        t.style.background = 'rgba(255,255,255,0.02)';
                        t.style.color = '#666';
                        t.style.borderColor = 'rgba(255,255,255,0.02)';
                    });
                    this.style.background = 'rgba(255,255,255,0.05)';
                    this.style.color = '#fff';
                    this.style.borderColor = 'rgba(255,255,255,0.1)';
                    
                    const tabName = this.dataset.tab;
                    document.querySelectorAll('.kh-tab-content').forEach(c => c.style.display = 'none');
                    document.getElementById(`tab-${tabName}`).style.display = 'block';
                };
            });

            // ===== TOGGLE UI =====
            let uiVisible = false;
            toggleBtn.onclick = () => {
                uiVisible = !uiVisible;
                el.style.display = uiVisible ? 'block' : 'none';
                toggleBtn.style.transform = uiVisible ? 'scale(1.1)' : 'scale(1)';
            };

            document.getElementById('kh-close').onclick = () => {
                uiVisible = false;
                el.style.display = 'none';
                toggleBtn.style.transform = 'scale(1)';
            };

            // ===== DRAG & DROP =====
            let isDragging = false;
            let dragOffsetX, dragOffsetY;
            const header = document.getElementById('kh-head');
            header.onmousedown = (e) => {
                isDragging = true;
                const rect = el.getBoundingClientRect();
                dragOffsetX = e.clientX - rect.left;
                dragOffsetY = e.clientY - rect.top;
                el.style.cursor = 'grabbing';
            };
            document.onmousemove = (e) => {
                if (!isDragging) return;
                const x = e.clientX - dragOffsetX;
                const y = e.clientY - dragOffsetY;
                el.style.left = x + 'px';
                el.style.top = y + 'px';
                el.style.right = 'auto';
                el.style.bottom = 'auto';
            };
            document.onmouseup = () => {
                isDragging = false;
                el.style.cursor = '';
            };

            // ===== CONFIG SELECT =====
            document.getElementById('config-select').onchange = function() {
                const idx = parseInt(this.value);
                if (isNaN(idx)) return;
                const config = CONFIG_LIST[idx];
                if (config) {
                    applyConfig(config);
                    document.getElementById('config-info').innerHTML = `✅ Đã áp dụng: <b style="color:#fff;">${config.name}</b> - ${config.desc}`;
                }
            };

            // ===== SLIDERS =====
            const paramMap = {
                'preGain': { sl: 'sl-pg', lb: 'lb-pg', num: 'num-pg' },
                'drive': { sl: 'sl-dr', lb: 'lb-dr', num: 'num-dr' },
                'crush': { sl: 'sl-cr', lb: 'lb-cr', num: 'num-cr' },
                'postGain': { sl: 'sl-po', lb: 'lb-po', num: 'num-po' },
            };
            Object.keys(paramMap).forEach(param => {
                const ids = paramMap[param];
                const sl = document.getElementById(ids.sl);
                const num = document.getElementById(ids.num);
                if (!sl || !num) return;
                sl.oninput = () => {
                    let val = parseFloat(sl.value);
                    if (param === 'postGain') val = val * 20;
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
                    if (param === 'postGain') sliderVal = val / 20;
                    else if (param === 'preGain') sliderVal = val / 1000;
                    else sliderVal = val * 1000;
                    sl.value = Math.min(1000, Math.max(0, sliderVal));
                    Core.push();
                    syncUI();
                };
            });

            // ===== RESET =====
            document.getElementById('kh-rst').onclick = () => {
                applyConfig({ preGain: 1, drive: 0, crush: 0, postGain: 1 });
                document.getElementById('config-select').value = '';
                document.getElementById('config-info').innerHTML = '💡 Chọn config để áp dụng hiệu ứng';
                showToast('🔄 Đã reset về mặc định', 'info');
            };

            // ===== SPAM =====
            document.getElementById('spam-start').onclick = async function() {
                if (spamRunning) {
                    showToast('⚠️ Đang spam, vui lòng đợi!', 'warning');
                    return;
                }
                const token = document.getElementById('spam-token').value.trim() || getToken();
                if (!token) {
                    showToast('❌ Không có token!', 'error');
                    return;
                }
                const channel = document.getElementById('spam-channel').value.trim();
                if (!channel) {
                    showToast('❌ Nhập Channel ID!', 'error');
                    return;
                }
                const content = document.getElementById('spam-content').value.trim();
                if (!content) {
                    showToast('❌ Nhập nội dung spam!', 'error');
                    return;
                }
                const count = parseInt(document.getElementById('spam-count').value) || 10;
                const delay = parseFloat(document.getElementById('spam-delay').value) || 1;
                
                spamRunning = true;
                this.textContent = '⏳ ĐANG SPAM...';
                this.disabled = true;
                await spamChat(token, channel, content, count, delay);
                this.textContent = '🚀 START';
                this.disabled = false;
                spamRunning = false;
            };

            document.getElementById('spam-stop').onclick = () => {
                spamStop = true;
                spamRunning = false;
                document.getElementById('spam-status').textContent = '⏹ Đã dừng spam';
                document.getElementById('spam-start').textContent = '🚀 START';
                document.getElementById('spam-start').disabled = false;
                showToast('⏹ Đã dừng spam', 'info');
            };

            // ===== TOKEN =====
            document.getElementById('token-get').onclick = function() {
                const token = getToken();
                if (token) {
                    document.getElementById('token-result').value = token;
                    document.getElementById('token-result').style.color = '#4caf50';
                    showToast('✅ Đã lấy token thành công!', 'success');
                } else {
                    document.getElementById('token-result').value = '❌ Không tìm thấy token!';
                    document.getElementById('token-result').style.color = '#ff6b6b';
                    showToast('❌ Không tìm thấy token!', 'error');
                }
            };

            document.getElementById('token-copy').onclick = () => {
                const text = document.getElementById('token-result').value;
                if (text && !text.includes('❌')) {
                    navigator.clipboard.writeText(text);
                    showToast('📋 Đã copy token!', 'success');
                }
            };

            document.getElementById('token-clear').onclick = () => {
                document.getElementById('token-result').value = '';
                document.getElementById('token-result').style.color = '#888';
            };

            // ===== VISUALIZER =====
            this.initVisualizer();
            this.badge('CHỜ', '#888');
            syncUI();
            updateInputs();
            showToast('🔥 HELLFIRE SIÊU PHẨM - Sẵn sàng!', 'info', 3000);
        },

        initVisualizer() {
            const canvas = document.getElementById('kh-visualizer');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let width = canvas.width = canvas.clientWidth;
            let height = canvas.height = 60;
            
            function resize() {
                width = canvas.width = canvas.clientWidth;
                height = canvas.height = 60;
            }
            window.addEventListener('resize', resize);

            let running = true;
            function draw() {
                if (!running) return;
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
                    ctx.shadowBlur = value > 0.6 ? 6 : 0;
                    ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
                    ctx.shadowBlur = 0;
                }
                ctx.font = '12px Arial';
                ctx.fillStyle = 'rgba(255,255,255,0.05)';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('☯', width / 2, height / 2);
                requestAnimationFrame(draw);
            }
            draw();
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

    console.log('✅ HELLFIRE SIÊU PHẨM - Bố Duy Khánh đã sẵn sàng!');
    console.log('🔥 Tabs: Âm thanh | Spam chat | Lấy token');
    console.log('🔊 3D Glassmorphism + Drag & Drop');
})();