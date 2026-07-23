// hellfire_ultimate.js - Bố Duy Khánh ULTIMATE EDITION
// GUI gọn gàng + Dropdown config + Hoa rơi + Sao băng + Audio Viz
// Copy toàn bộ, paste là dùng

(function () {
    'use strict';
    if (window.__BDK_ULTIMATE__) return;
    window.__BDK_ULTIMATE__ = true;

    console.log('%c🔥 HELLFIRE ULTIMATE - Bố Duy Khánh', 'font-size:24px;font-weight:bold;color:#ff6b6b;text-shadow:0 0 40px #ff6b6b;');

    // ═══════════════════════════════════════
    //  PARAMETERS
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
    //  CONFIG LIST - KHÔNG CÓ BABY
    // ═══════════════════════════════════════
    const CONFIG_LIST = [
        { 
            name: '🔥 Lấn Át', 
            desc: 'To, dày, át đối phương',
            preGain: 200, drive: 0.8, crush: 0.4, width: 0.6,
            postGain: 5, bass: 0.9, treble: 0.5,
            echo: 0.2, gateThreshold: 0.002, deEsser: 0.05
        },
        { 
            name: '💀 Lấn Át Cực Đỉnh', 
            desc: 'Bão hòa max, át hết mọi thứ',
            preGain: 500, drive: 1.0, crush: 0.6, width: 0.9,
            postGain: 8, bass: 1.0, treble: 0.7,
            echo: 0.35, gateThreshold: 0.001, deEsser: 0.02
        },
        { 
            name: '⚡ Lấn Át Tối Thượng', 
            desc: 'Át hoàn toàn, không cho đối phương thở',
            preGain: 700, drive: 1.0, crush: 0.8, width: 1.0,
            postGain: 10, bass: 1.0, treble: 0.8,
            echo: 0.5, gateThreshold: 0.001, deEsser: 0.01
        },
        { 
            name: '📢 Siêu To Không Lọc', 
            desc: 'To cực, ồn ào, không lọc nhiễu',
            preGain: 1000, drive: 0.5, crush: 0, width: 0.5,
            postGain: 12, bass: 1.0, treble: 0.5,
            echo: 0.2, gateThreshold: 0, deEsser: 0
        },
        { 
            name: '😈 Giọng Ác Quỷ', 
            desc: 'Trầm, bão hòa, đáng sợ',
            preGain: 300, drive: 0.9, crush: 0.7, width: 0.4,
            postGain: 6, bass: 1.0, treble: 0.1,
            echo: 0.25, gateThreshold: 0.002, deEsser: 0.08
        },
        { 
            name: '👹 Ác Quỷ Tối Thượng', 
            desc: 'Quỷ dữ nhất, cực trầm, cực đục',
            preGain: 600, drive: 1.0, crush: 0.9, width: 0.5,
            postGain: 9, bass: 1.0, treble: 0.05,
            echo: 0.3, gateThreshold: 0.001, deEsser: 0.01
        },
        { 
            name: '💀 Ác Quỷ Địa Ngục', 
            desc: 'Địa ngục, méo tiếng, cực đáng sợ',
            preGain: 900, drive: 1.0, crush: 1.0, width: 0.6,
            postGain: 12, bass: 1.0, treble: 0,
            echo: 0.4, gateThreshold: 0.001, deEsser: 0
        },
        { 
            name: '🌀 Echo Siêu Vang', 
            desc: 'Vang dài, như trong hang động',
            preGain: 100, drive: 0.3, crush: 0, width: 0.5,
            postGain: 3, bass: 0.3, treble: 0.4,
            echo: 0.8, gateThreshold: 0.005, deEsser: 0.1
        },
        { 
            name: '🌊 Echo Sấm Sét', 
            desc: 'Vang rền, echo siêu dài',
            preGain: 150, drive: 0.4, crush: 0, width: 0.7,
            postGain: 4, bass: 0.4, treble: 0.5,
            echo: 1.0, gateThreshold: 0.003, deEsser: 0.05
        },
        { 
            name: '🌀 Bão Echo', 
            desc: 'Echo chồng echo, cực vang, cực loạn',
            preGain: 200, drive: 0.5, crush: 0, width: 0.8,
            postGain: 5, bass: 0.5, treble: 0.5,
            echo: 1.5, gateThreshold: 0.001, deEsser: 0
        },
        { 
            name: '🔊 Loa Phường', 
            desc: 'Giọng loa phường, cực to, vang xa',
            preGain: 400, drive: 0.6, crush: 0.3, width: 0.8,
            postGain: 7, bass: 0.8, treble: 0.6,
            echo: 0.4, gateThreshold: 0.002, deEsser: 0.02
        },
        { 
            name: '💥 Bom Nổ', 
            desc: 'Cực to, cực bão hòa, cực vang',
            preGain: 800, drive: 1.0, crush: 0.8, width: 1.0,
            postGain: 10, bass: 1.0, treble: 0.8,
            echo: 0.5, gateThreshold: 0.001, deEsser: 0.01
        },
        { 
            name: '🤖 Robot Bão Tố', 
            desc: 'Robot nhưng cực bão hòa, điên loạn',
            preGain: 350, drive: 1.0, crush: 0.9, width: 0,
            postGain: 6, bass: 0, treble: 1.0,
            echo: 0.3, gateThreshold: 0.001, deEsser: 0
        },
        { 
            name: '🐺 Quái Vật', 
            desc: 'Giọng quái vật, đáng sợ, méo mó',
            preGain: 400, drive: 0.9, crush: 0.8, width: 0.4,
            postGain: 7, bass: 0.7, treble: 0.6,
            echo: 0.4, gateThreshold: 0.001, deEsser: 0.02
        },
        { 
            name: '🚂 Tàu Hỏa', 
            desc: 'Như tàu hỏa đang chạy, ồn ào',
            preGain: 250, drive: 0.7, crush: 0.5, width: 0.5,
            postGain: 5, bass: 0.5, treble: 0.5,
            echo: 0.6, gateThreshold: 0.001, deEsser: 0.02
        },
        { 
            name: '🌊 Sóng Thần', 
            desc: 'Ầm ầm như sóng thần ập tới',
            preGain: 700, drive: 0.9, crush: 0.7, width: 0.9,
            postGain: 10, bass: 1.0, treble: 0.5,
            echo: 0.6, gateThreshold: 0.001, deEsser: 0.01
        },
        { 
            name: '💀 Thần Chết', 
            desc: 'Giọng của thần chết, lạnh lùng, đáng sợ',
            preGain: 450, drive: 0.8, crush: 0.9, width: 0.4,
            postGain: 8, bass: 0.8, treble: 0.2,
            echo: 0.3, gateThreshold: 0.002, deEsser: 0.05
        },
        { 
            name: '🌪️ Bão Cát', 
            desc: 'Ồn ào, như bão cát',
            preGain: 400, drive: 1.0, crush: 0.6, width: 0.8,
            postGain: 7, bass: 0.7, treble: 0.7,
            echo: 0.5, gateThreshold: 0.001, deEsser: 0
        },
        { 
            name: '🔥 Núi Lửa Phun', 
            desc: 'Giọng như núi lửa đang phun trào',
            preGain: 550, drive: 0.8, crush: 0.6, width: 0.7,
            postGain: 9, bass: 0.9, treble: 0.4,
            echo: 0.5, gateThreshold: 0.001, deEsser: 0.02
        },
    ];

    // ═══════════════════════════════════════
    //  WORKLET
    // ═══════════════════════════════════════
    const WORKLET = `
    class BODUYKHANH extends AudioWorkletProcessor {
        static get parameterDescriptors() {
            return [
                { name:'preGain', defaultValue:1, min:0, max:99999999 },
                { name:'drive', defaultValue:0, min:0, max:99999999 },
                { name:'crush', defaultValue:0, min:0, max:99999999 },
                { name:'width', defaultValue:0, min:0, max:99999999 },
                { name:'postGain', defaultValue:1, min:0, max:99999999 },
                { name:'bass', defaultValue:0, min:0, max:99999999 },
                { name:'treble', defaultValue:0, min:0, max:99999999 },
                { name:'echo', defaultValue:0, min:0, max:99999999 },
                { name:'gateThreshold', defaultValue:0.005, min:0, max:99999999 },
                { name:'deEsser', defaultValue:0, min:0, max:99999999 },
            ];
        }
        constructor() { super(); this.SR = sampleRate || 48000; this._echoBufL = 0; this._echoBufR = 0; this._gateL = 1; this._gateR = 1; this._deEsserL = 0; this._deEsserR = 0; }
        _sat(x,k) { if(k<0.001)return x; const d=k*20; return Math.atan(x*d)/Math.atan(d); }
        _bassBoost(x,a) { if(a<0.001)return x; return x*(1+a*1.5); }
        _trebleBoost(x,a) { if(a<0.001)return x; return x*(1+a*2); }
        _deEsser(x,a) { if(a<0.001)return x; const h=x*0.3+this._deEsserL*0.7; this._deEsserL=h; const r=1-Math.min(a,Math.abs(h)*a*4); return x*Math.max(0.3,r); }
        _noiseGate(x,t) { if(t<0.0001)return x; const rms=Math.abs(x); if(rms>t){this._gateL=Math.min(1,this._gateL+0.01);}else{this._gateL=Math.max(0,this._gateL-0.001);} return x*this._gateL; }
        _softLimit(x) { if(Math.abs(x)>0.95){const s=x>0?1:-1; const e=Math.abs(x)-0.95; return s*(0.95+e*0.5);} return x; }
        _echo(x,a) { if(a<0.001)return x; const w=a*0.4; const f=0.3; const out=x+this._echoBufL*w; this._echoBufL=x*f+this._echoBufL*(1-f*0.3); return out; }
        process(i,o,p) {
            const inp=i[0]; if(!inp||inp.length===0)return true;
            const out=o[0]; const pg=p.preGain[0], dr=p.drive[0], cr=p.crush[0], wd=p.width[0], po=p.postGain[0], bs=p.bass[0], tr=p.treble[0], ec=p.echo[0], gt=p.gateThreshold[0], de=p.deEsser[0];
            for(let idx=0; idx<inp.length; idx++) {
                let L=inp[idx]*pg; let R=(inp.length>1?inp[idx]:inp[idx])*pg;
                L=this._noiseGate(L,gt); R=this._noiseGate(R,gt);
                L=this._deEsser(L,de); R=this._deEsser(R,de);
                L=this._bassBoost(L,bs); R=this._bassBoost(R,bs);
                L=this._trebleBoost(L,tr); R=this._trebleBoost(R,tr);
                L=this._sat(L,dr); R=this._sat(R,dr);
                if(cr>0){const th=Math.max(0.001,1.0-cr*0.98); L=Math.max(-th,Math.min(th,L))/th; R=Math.max(-th,Math.min(th,R))/th;}
                if(wd>0){const mid=(L+R)*0.5; const side=(L-R)*0.5*(1+wd*1.5); L=mid+side; R=mid-side;}
                L=this._echo(L,ec); R=this._echo(R,ec);
                L*=po; R*=po;
                L=this._softLimit(L); R=this._softLimit(R);
                out[idx]=L||0; if(o[1])o[1][idx]=R||0;
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
        };
        Object.keys(map).forEach(param => {
            const num = document.getElementById(map[param]);
            if (num) num.value = P[param].toFixed(4);
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
    //  EFFECTS - HOA RƠI + SAO BĂNG
    // ═══════════════════════════════════════
    function createEffects() {
        // Canvas cho hiệu ứng
        const canvas = document.createElement('canvas');
        canvas.id = 'kh-effects';
        canvas.style.cssText = `
            position:fixed;top:0;left:0;width:100%;height:100%;
            pointer-events:none;z-index:999997;
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
        
        // ===== HOA RƠI =====
        const flowers = [];
        const flowerColors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6fb7', '#a66cff'];
        
        class Flower {
            constructor() {
                this.x = Math.random() * width;
                this.y = -20;
                this.size = 8 + Math.random() * 12;
                this.speed = 1 + Math.random() * 3;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.05;
                this.color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
                this.petals = 5 + Math.floor(Math.random() * 4);
                this.wobble = Math.random() * 2;
                this.wobbleSpeed = 0.02 + Math.random() * 0.03;
            }
            
            update() {
                this.y += this.speed;
                this.x += Math.sin(this.y * this.wobbleSpeed) * this.wobble;
                this.rotation += this.rotSpeed;
                
                if (this.y > height + 20) {
                    this.y = -20;
                    this.x = Math.random() * width;
                }
            }
            
            draw(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                
                const s = this.size;
                for (let i = 0; i < this.petals; i++) {
                    const angle = (i / this.petals) * Math.PI * 2;
                    ctx.beginPath();
                    ctx.ellipse(Math.cos(angle) * s * 0.6, Math.sin(angle) * s * 0.6, s * 0.4, s * 0.6, angle, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = 0.8;
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
                
                // Nhụy hoa
                ctx.beginPath();
                ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2);
                ctx.fillStyle = '#ffd93d';
                ctx.globalAlpha = 0.9;
                ctx.fill();
                
                ctx.restore();
            }
        }
        
        // ===== SAO BĂNG =====
        const stars = [];
        
        class ShootingStar {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.active = false;
                this.x = Math.random() * width * 0.8;
                this.y = Math.random() * height * 0.4;
                this.speed = 8 + Math.random() * 12;
                this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
                this.length = 60 + Math.random() * 100;
                this.opacity = 0.8 + Math.random() * 0.2;
                this.trail = [];
                this.life = 0;
                this.maxLife = 60 + Math.random() * 40;
            }
            
            start() {
                this.active = true;
                this.x = Math.random() * width * 0.8;
                this.y = Math.random() * height * 0.3;
                this.life = 0;
            }
            
            update() {
                if (!this.active) {
                    if (Math.random() < 0.001) this.start();
                    return;
                }
                
                this.life++;
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                
                // Trail
                this.trail.push({x: this.x, y: this.y});
                if (this.trail.length > 20) this.trail.shift();
                
                if (this.life > this.maxLife || this.x > width || this.y > height) {
                    this.active = false;
                    this.trail = [];
                }
            }
            
            draw(ctx) {
                if (!this.active || this.trail.length < 2) return;
                
                const gradient = ctx.createLinearGradient(
                    this.trail[0].x, this.trail[0].y,
                    this.trail[this.trail.length-1].x, this.trail[this.trail.length-1].y
                );
                gradient.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
                gradient.addColorStop(1, 'rgba(255,255,255,0)');
                
                ctx.beginPath();
                ctx.moveTo(this.trail[0].x, this.trail[0].y);
                for (let i = 1; i < this.trail.length; i++) {
                    ctx.lineTo(this.trail[i].x, this.trail[i].y);
                }
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2 + Math.random() * 0.5;
                ctx.shadowColor = 'rgba(255,255,255,0.5)';
                ctx.shadowBlur = 20;
                ctx.stroke();
                ctx.shadowBlur = 0;
                
                // Đầu sao băng
                const last = this.trail[this.trail.length-1];
                ctx.beginPath();
                ctx.arc(last.x, last.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
                ctx.shadowColor = 'rgba(255,255,255,0.8)';
                ctx.shadowBlur = 30;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
        
        // ===== KHỞI TẠO =====
        for (let i = 0; i < 30; i++) {
            const f = new Flower();
            f.y = Math.random() * height;
            flowers.push(f);
        }
        
        for (let i = 0; i < 5; i++) {
            stars.push(new ShootingStar());
        }
        
        // ===== ANIMATION =====
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Vẽ hoa
            flowers.forEach(f => {
                f.update();
                f.draw(ctx);
            });
            
            // Vẽ sao băng
            stars.forEach(s => {
                s.update();
                s.draw(ctx);
            });
            
            requestAnimationFrame(animate);
        }
        animate();
        
        return { canvas, ctx };
    }

    // ═══════════════════════════════════════
    //  UI - GỌN GÀNG, DROPDOWN CONFIG
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
            // Tạo hiệu ứng
            createEffects();
            
            // NÚT TRÒN TOGGLE
            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'kh-toggle';
            toggleBtn.textContent = '🎵';
            toggleBtn.style.cssText = `
                position:fixed;bottom:24px;left:24px;z-index:999999;
                width:60px;height:60px;border-radius:50%;
                background:linear-gradient(135deg,#0a0a12,#1a1a2e);
                border:2px solid #00ff88;color:#00ff88;font-size:28px;cursor:pointer;
                box-shadow:0 0 40px #00ff8840, inset 0 0 40px #00ff8820;
                transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                display:flex;align-items:center;justify-content:center;
                font-family:'Segoe UI',sans-serif;user-select:none;
                backdrop-filter:blur(10px);
            `;
            toggleBtn.onmouseenter = () => {
                toggleBtn.style.transform = 'scale(1.1)';
                toggleBtn.style.boxShadow = '0 0 60px #00ff8860, inset 0 0 60px #00ff8840';
            };
            toggleBtn.onmouseleave = () => {
                toggleBtn.style.transform = 'scale(1)';
                toggleBtn.style.boxShadow = '0 0 40px #00ff8840, inset 0 0 40px #00ff8820';
            };
            document.body.appendChild(toggleBtn);

            // MAIN UI
            const el = document.createElement('div');
            el.id = 'kh-root';
            let html = `
            <div id="kh-head">
                <div id="kh-title">
                    <span style="font-size:20px;animation:pulse 2s infinite;">🎵</span>
                    <span id="kh-name">BỐ DUY KHÁNH</span>
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
                <!-- DROPDOWN CONFIG -->
                <div class="kh-section-title">🎯 CHỌN CONFIG</div>
                <select id="config-select" style="width:100%;padding:10px 12px;background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.2);color:#00ff88;border-radius:8px;font-size:14px;cursor:pointer;margin-bottom:10px;">
                    <option value="">-- Chọn config --</option>
                    ${CONFIG_LIST.map((c, i) => `
                        <option value="${i}">${c.name} - ${c.desc}</option>
                    `).join('')}
                </select>
                <div id="config-info" style="font-size:11px;color:#888;margin-bottom:10px;padding:8px;background:rgba(0,255,136,0.03);border-radius:6px;border:1px solid rgba(0,255,136,0.05);">
                    💡 Chọn config để áp dụng hiệu ứng
                </div>
                <div class="kh-sep"></div>

                <!-- SLIDERS -->
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
                ].map(([slId, lbId, numId, label, defaultVal, param]) => `
                    <div class="kh-row">
                        <div class="kh-rowlabel">
                            <span>${label}</span>
                            <div style="display:flex;gap:8px;align-items:center;">
                                <span id="${lbId}" style="min-width:50px;">${defaultVal}</span>
                                <input type="number" id="${numId}" value="${defaultVal}" style="width:80px;background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.2);color:#00ff88;border-radius:6px;padding:4px 8px;font-size:12px;text-align:center;">
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
                toggleBtn.style.borderColor = uiVisible ? '#00ff88' : '#ff3355';
                toggleBtn.textContent = uiVisible ? '🎵' : '🔇';
            };

            // Close
            document.getElementById('kh-close').onclick = () => {
                el.style.display = 'none';
                toggleBtn.style.borderColor = '#ff3355';
                toggleBtn.textContent = '🔇';
            };

            // ===== DROPDOWN CONFIG =====
            document.getElementById('config-select').onchange = function() {
                const idx = parseInt(this.value);
                if (isNaN(idx)) return;
                const config = CONFIG_LIST[idx];
                if (config) {
                    applyConfig(config);
                    document.getElementById('config-info').innerHTML = `✅ Đã áp dụng: <b style="color:#00ff88;">${config.name}</b> - ${config.desc}`;
                    document.getElementById('config-info').style.borderColor = 'rgba(0,255,136,0.3)';
                }
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
                applyConfig({ preGain: 1, drive: 0, crush: 0, width: 0, postGain: 1, bass: 0, treble: 0, echo: 0, gateThreshold: 0.005, deEsser: 0 });
                document.getElementById('config-select').value = '';
                document.getElementById('config-info').innerHTML = '💡 Chọn config để áp dụng hiệu ứng';
                document.getElementById('config-info').style.borderColor = 'rgba(0,255,136,0.05)';
                console.log('🔄 Reset về mặc định');
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
                    console.log('✅ Đã lưu config:', name);
                }
            };

            this.css();
            this.badge('CHỜ', '#888');
            syncUI();
            updateInputs();

            // 7 MÀU VIỀN
            let hue = 0;
            const root = document.getElementById('kh-root');
            setInterval(() => {
                hue = (hue + 0.003) % 1;
                if (root) {
                    root.style.borderColor = `hsl(${hue * 360}, 100%, 50%)`;
                    root.style.boxShadow = `0 0 60px hsla(${hue * 360}, 100%, 50%, 0.3), inset 0 0 60px hsla(${hue * 360}, 100%, 50%, 0.1)`;
                }
                const name = document.getElementById('kh-name');
                if (name) name.style.textShadow = `0 0 40px hsl(${hue * 360}, 100%, 50%)`;
                const dot = document.getElementById('kh-dot');
                if (dot) dot.style.background = `hsl(${hue * 360}, 100%, 50%)`;
            }, 50);
        },
        css() {
            const s = document.createElement('style');
            s.textContent = `
            @keyframes pulse {
                0%,100%{transform:scale(1);}
                50%{transform:scale(1.1);}
            }
            @keyframes glow {
                0%,100%{text-shadow:0 0 20px #00ff88;}
                50%{text-shadow:0 0 40px #00ff88,0 0 80px #00ff8840;}
            }
            #kh-root {
                position:fixed;top:20px;right:20px;width:400px;
                background:rgba(10,10,18,0.92);
                backdrop-filter:blur(20px);
                border:2px solid #00ff88;
                border-radius:20px;
                box-shadow:0 0 60px #00ff8840, inset 0 0 60px #00ff8820;
                font-family:'Segoe UI',system-ui,sans-serif;
                color:#00ff88;
                z-index:999998;
                user-select:none;
                max-height:90vh;
                overflow-y:auto;
                transition:all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            #kh-root::-webkit-scrollbar{width:6px;}
            #kh-root::-webkit-scrollbar-track{background:rgba(0,255,136,0.05);border-radius:10px;}
            #kh-root::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#00ff88,#00cc66);border-radius:10px;}
            #kh-head {
                display:flex;justify-content:space-between;align-items:center;
                padding:16px 20px;
                background:rgba(15,15,26,0.8);
                border-bottom:1px solid rgba(0,255,136,0.1);
                border-radius:20px 20px 0 0;
                backdrop-filter:blur(10px);
            }
            #kh-title{display:flex;align-items:center;gap:12px;}
            #kh-name{font-size:20px;font-weight:900;letter-spacing:1px;animation:glow 3s infinite;}
            #kh-right{display:flex;align-items:center;gap:12px;}
            #kh-badge{display:flex;align-items:center;gap:8px;background:rgba(0,255,136,0.05);padding:6px 14px;border-radius:12px;border:1px solid rgba(0,255,136,0.1);}
            #kh-dot{width:10px;height:10px;border-radius:50%;background:#888;transition:all 0.3s;}
            #kh-st{font-size:11px;color:#888;letter-spacing:1px;font-weight:bold;}
            #kh-close{background:rgba(255,51,85,0.1);border:1px solid rgba(255,51,85,0.2);color:#ff3355;border-radius:8px;width:32px;height:32px;font-size:16px;cursor:pointer;transition:all 0.3s;}
            #kh-close:hover{background:rgba(255,51,85,0.2);border-color:#ff3355;transform:scale(1.1);}
            #kh-body{padding:20px;}
            .kh-section-title{font-size:12px;font-weight:bold;color:#00ff88;margin:12px 0 8px;letter-spacing:2px;text-transform:uppercase;opacity:0.7;}
            #config-select{width:100%;padding:10px 12px;background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.2);color:#00ff88;border-radius:8px;font-size:14px;cursor:pointer;margin-bottom:10px;}
            #config-select:focus{outline:none;border-color:#00ff88;box-shadow:0 0 20px rgba(0,255,136,0.1);}
            #config-select option{background:#0a0a12;color:#00ff88;}
            #config-info{font-size:11px;color:#888;margin-bottom:10px;padding:8px;background:rgba(0,255,136,0.03);border-radius:6px;border:1px solid rgba(0,255,136,0.05);transition:all 0.3s;}
            .kh-sep{height:1px;background:linear-gradient(90deg,transparent,rgba(0,255,136,0.3),transparent);margin:12px 0;}
            .kh-row{margin-bottom:12px;}
            .kh-rowlabel{display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:bold;margin-bottom:4px;}
            .kh-rowlabel span:first-child{opacity:0.8;}
            .kh-rowlabel span:last-child{color:#fff;text-shadow:0 0 20px #00ff88;}
            .kh-rowlabel input[type=number]{width:80px;background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.15);color:#00ff88;border-radius:6px;padding:4px 8px;font-size:12px;text-align:center;transition:all 0.3s;}
            .kh-rowlabel input[type=number]:focus{outline:none;border-color:#00ff88;box-shadow:0 0 20px rgba(0,255,136,0.1);}
            input[type=range]{-webkit-appearance:none;width:100%;height:6px;background:linear-gradient(90deg,#00ff88 var(--v,0%),rgba(0,255,136,0.1) var(--v,0%));border-radius:10px;outline:none;transition:all 0.3s;}
            input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;background:radial-gradient(circle at 30% 30%, #00ff88, #00cc66);border:2px solid #0a0a12;border-radius:50%;cursor:pointer;box-shadow:0 0 20px rgba(0,255,136,0.3);transition:all 0.3s;}
            input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.15);box-shadow:0 0 30px rgba(0,255,136,0.5);}
            #kh-rst,#kh-save{width:100%;padding:12px;margin-top:8px;background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.15);color:#00ff88;font-size:13px;font-weight:bold;border-radius:10px;cursor:pointer;transition:all 0.3s;}
            #kh-rst:hover,#kh-save:hover{background:rgba(0,255,136,0.1);border-color:#00ff88;transform:scale(1.02);box-shadow:0 0 30px rgba(0,255,136,0.1);}
            @media (max-width:480px){#kh-root{width:340px;right:10px;top:10px;}}
            `;
            document.head.appendChild(s);
        }
    };

    // ═══════════════════════════════════════
    //  BOOT
    // ═══════════════════════════════════════
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => UI.init());
    else UI.init();

    console.log('✅ HELLFIRE ULTIMATE - Bố Duy Khánh đã sẵn sàng!');
    console.log('🎯 Config dạng dropdown - KHÔNG BABY');
    console.log('🌸 Hoa rơi + ⭐ Sao băng + 🎵 Audio Visualizer');
    console.log('🌈 Viền 7 màu siêu đẹp');
})();