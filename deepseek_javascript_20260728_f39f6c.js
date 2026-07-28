// hellfire_tool_pro_fixed.js - Bố Duy Khánh PRO MAX
// FIX LỖI IFRAME MAIL10P + THÊM COPY ACC/PASS

(function () {
    'use strict';
    if (window.__BDK_TOOL_PRO_FIXED__) return;
    window.__BDK_TOOL_PRO_FIXED__ = true;

    console.log('%c🔥 HELLFIRE TOOL PRO FIXED - Bố Duy Khánh', 'font-size:24px;font-weight:bold;color:#ff6b6b;text-shadow:0 0 40px #ff6b6b;');

    // ============================================================
    //  UI TOOL
    // ============================================================
    const UI = {
        init() {
            // Nút toggle
            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'bdk-tool-toggle';
            toggleBtn.textContent = '🛠️';
            toggleBtn.style.cssText = `
                position:fixed;bottom:24px;left:94px;z-index:999999;
                width:56px;height:56px;border-radius:50%;
                background:linear-gradient(135deg,#0a0a12,#1a1a2e);
                border:2px solid #ffd93d;color:#ffd93d;font-size:24px;cursor:pointer;
                box-shadow:0 0 30px #ffd93d40, inset 0 0 30px #ffd93d20;
                transition:all 0.3s ease;
                display:flex;align-items:center;justify-content:center;
                font-family:'Segoe UI',sans-serif;user-select:none;
            `;
            toggleBtn.onmouseenter = () => {
                toggleBtn.style.transform = 'scale(1.1)';
                toggleBtn.style.boxShadow = '0 0 60px #ffd93d60, inset 0 0 60px #ffd93d40';
            };
            toggleBtn.onmouseleave = () => {
                toggleBtn.style.transform = 'scale(1)';
                toggleBtn.style.boxShadow = '0 0 30px #ffd93d40, inset 0 0 30px #ffd93d20';
            };
            document.body.appendChild(toggleBtn);

            // Main UI
            const el = document.createElement('div');
            el.id = 'bdk-tool-ui';
            el.style.cssText = `
                position:fixed;top:20px;right:20px;width:450px;
                background:rgba(10,10,18,0.95);
                backdrop-filter:blur(20px);
                border:2px solid #ffd93d;
                border-radius:16px;
                box-shadow:0 0 40px #ffd93d40, inset 0 0 40px #ffd93d20;
                font-family:'Segoe UI',system-ui,sans-serif;
                color:#ffd93d;
                z-index:999998;
                user-select:none;
                max-height:90vh;
                overflow-y:auto;
                display:none;
                transition:all 0.3s ease;
            `;
            el.innerHTML = this.html();
            document.body.appendChild(el);

            // Events
            let visible = false;
            toggleBtn.onclick = () => {
                visible = !visible;
                el.style.display = visible ? 'block' : 'none';
                toggleBtn.style.borderColor = visible ? '#ffd93d' : '#ffd93d';
            };

            document.getElementById('bdk-tool-close').onclick = () => {
                visible = false;
                el.style.display = 'none';
            };

            this.events();
        },

        html() {
            return `
            <div style="padding:16px 20px;border-bottom:1px solid rgba(255,217,61,0.2);display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:20px;font-weight:900;">🛠️ HELLFIRE TOOL PRO</span>
                <button id="bdk-tool-close" style="background:none;border:1px solid rgba(255,217,61,0.3);color:#ffd93d;border-radius:6px;padding:4px 12px;cursor:pointer;">✕</button>
            </div>
            <div style="padding:16px;">

                <!-- ===== SECTION 1: COPY MAIL 10P ===== -->
                <div style="background:rgba(255,217,61,0.05);border-radius:8px;padding:12px;margin-bottom:12px;border:1px solid rgba(255,217,61,0.1);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                        <span style="font-weight:bold;">📧 COPY MAIL 10P</span>
                        <div style="display:flex;gap:4px;">
                            <button id="bdk-copy-mail" style="padding:4px 10px;background:rgba(255,217,61,0.1);border:1px solid #ffd93d;color:#ffd93d;border-radius:4px;cursor:pointer;">📋 COPY</button>
                            <button id="bdk-refresh-mail" style="padding:4px 10px;background:rgba(79,172,254,0.1);border:1px solid #4facfe;color:#4facfe;border-radius:4px;cursor:pointer;">🔄 REFRESH</button>
                        </div>
                    </div>
                    <input id="bdk-mail-display" type="text" placeholder="Mail sẽ hiện ở đây..." style="width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,217,61,0.2);color:#ffd93d;border-radius:4px;padding:6px 8px;font-size:12px;font-family:monospace;">
                    <div style="margin-top:8px;display:flex;gap:6px;">
                        <button id="bdk-open-mail" style="flex:1;padding:4px;background:rgba(79,172,254,0.1);border:1px solid #4facfe;color:#4facfe;border-radius:4px;cursor:pointer;font-size:11px;">🌐 MỞ MAIL</button>
                        <button id="bdk-open-mail-new" style="flex:1;padding:4px;background:rgba(79,172,254,0.1);border:1px solid #4facfe;color:#4facfe;border-radius:4px;cursor:pointer;font-size:11px;">🆕 TAB MỚI</button>
                    </div>
                </div>

                <!-- ===== SECTION 2: RANDOM ACCOUNT ===== -->
                <div style="background:rgba(255,217,61,0.05);border-radius:8px;padding:12px;margin-bottom:12px;border:1px solid rgba(255,217,61,0.1);">
                    <div style="font-weight:bold;margin-bottom:6px;">👤 RANDOM ACCOUNT</div>
                    <div style="display:flex;gap:6px;margin-bottom:6px;">
                        <input id="bdk-name-input" type="text" placeholder="Nhập tên (VD: duy khánh)" style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(255,217,61,0.2);color:#ffd93d;border-radius:4px;padding:4px 8px;font-size:12px;">
                        <button id="bdk-gen-account" style="padding:4px 12px;background:rgba(255,217,61,0.1);border:1px solid #ffd93d;color:#ffd93d;border-radius:4px;cursor:pointer;">🎲 GEN</button>
                    </div>
                    <div style="display:flex;gap:6px;align-items:center;margin-top:4px;">
                        <span style="font-size:11px;color:#888;">📧 <span id="bdk-gen-email">---</span></span>
                        <span style="font-size:11px;color:#888;">🔑 <span id="bdk-gen-pass">---</span></span>
                        <button id="bdk-copy-account" style="padding:2px 10px;background:rgba(67,233,123,0.1);border:1px solid #43e97b;color:#43e97b;border-radius:4px;cursor:pointer;font-size:10px;margin-left:auto;">📋 COPY ACC</button>
                        <button id="bdk-copy-pass" style="padding:2px 10px;background:rgba(79,172,254,0.1);border:1px solid #4facfe;color:#4facfe;border-radius:4px;cursor:pointer;font-size:10px;">📋 COPY PASS</button>
                    </div>
                </div>

                <!-- ===== SECTION 3: GET TOKEN ===== -->
                <div style="background:rgba(255,217,61,0.05);border-radius:8px;padding:12px;margin-bottom:12px;border:1px solid rgba(255,217,61,0.1);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                        <span style="font-weight:bold;">🔑 LẤY TOKEN</span>
                        <button id="bdk-get-token" style="padding:4px 12px;background:rgba(255,217,61,0.1);border:1px solid #ffd93d;color:#ffd93d;border-radius:4px;cursor:pointer;">🚀 LẤY</button>
                    </div>
                    <input id="bdk-token-display" type="text" placeholder="Token sẽ hiện ở đây..." style="width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,217,61,0.2);color:#43e97b;border-radius:4px;padding:6px 8px;font-size:11px;font-family:monospace;">
                    <div style="margin-top:4px;display:flex;gap:6px;">
                        <button id="bdk-copy-token" style="flex:1;padding:2px;background:rgba(67,233,123,0.1);border:1px solid #43e97b;color:#43e97b;border-radius:4px;cursor:pointer;font-size:10px;">📋 COPY TOKEN</button>
                    </div>
                </div>

                <!-- ===== SECTION 4: LOGOUT ===== -->
                <div style="background:rgba(255,217,61,0.05);border-radius:8px;padding:12px;margin-bottom:12px;border:1px solid rgba(255,217,61,0.1);">
                    <div style="display:flex;gap:6px;">
                        <button id="bdk-logout" style="flex:1;padding:6px;background:rgba(255,107,107,0.1);border:1px solid #ff6b6b;color:#ff6b6b;border-radius:4px;cursor:pointer;">🚪 LOGOUT</button>
                        <button id="bdk-logout-all" style="flex:1;padding:6px;background:rgba(255,107,107,0.1);border:1px solid #ff6b6b;color:#ff6b6b;border-radius:4px;cursor:pointer;">🚪 LOGOUT ALL</button>
                    </div>
                </div>

                <!-- ===== SECTION 5: LOG ===== -->
                <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:8px;max-height:120px;overflow-y:auto;font-size:11px;font-family:monospace;color:#888;" id="bdk-tool-log">
                    ⏳ Sẵn sàng...
                </div>

                <!-- ===== SECTION 6: EXPORT ===== -->
                <div style="display:flex;gap:6px;margin-top:10px;">
                    <button id="bdk-export-profile" style="flex:1;padding:6px;background:rgba(255,217,61,0.05);border:1px solid rgba(255,217,61,0.2);color:#ffd93d;border-radius:4px;cursor:pointer;font-size:11px;">💾 EXPORT PROFILE</button>
                    <button id="bdk-export-token" style="flex:1;padding:6px;background:rgba(255,217,61,0.05);border:1px solid rgba(255,217,61,0.2);color:#ffd93d;border-radius:4px;cursor:pointer;font-size:11px;">💾 EXPORT TOKEN</button>
                </div>
            </div>
            `;
        },

        events() {
            const log = document.getElementById('bdk-tool-log');

            function addLog(msg, type = 'info') {
                const colors = {
                    info: '#888',
                    success: '#43e97b',
                    error: '#ff6b6b',
                    warn: '#ffd93d'
                };
                const time = new Date().toLocaleTimeString();
                log.innerHTML += `<div style="color:${colors[type] || '#888'};">[${time}] ${msg}</div>`;
                log.scrollTop = log.scrollHeight;
            }

            // ===== COPY MAIL 10P =====
            document.getElementById('bdk-copy-mail').onclick = async () => {
                try {
                    // Thử tìm iframe
                    let iframe = document.querySelector('iframe[src*="10minutemail"]');
                    if (!iframe) {
                        // Tạo iframe mới nếu chưa có
                        iframe = document.createElement('iframe');
                        iframe.src = 'https://10minutemail.one';
                        iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;';
                        document.body.appendChild(iframe);
                        await new Promise(r => setTimeout(r, 3000));
                    }
                    
                    const email = await getMailFromIframe(iframe);
                    if (email) {
                        document.getElementById('bdk-mail-display').value = email;
                        navigator.clipboard.writeText(email);
                        addLog(`📧 Đã copy mail: ${email}`, 'success');
                    } else {
                        addLog('❌ Không lấy được mail! Hãy mở mail thủ công.', 'error');
                    }
                } catch (e) {
                    addLog(`❌ Lỗi: ${e.message}`, 'error');
                }
            };

            // ===== REFRESH MAIL =====
            document.getElementById('bdk-refresh-mail').onclick = () => {
                const iframe = document.querySelector('iframe[src*="10minutemail"]');
                if (iframe) {
                    iframe.src = iframe.src;
                    addLog('🔄 Đang làm mới mail...', 'info');
                } else {
                    addLog('❌ Không tìm thấy iframe mail!', 'error');
                }
            };

            // ===== OPEN MAIL =====
            document.getElementById('bdk-open-mail').onclick = () => {
                const iframe = document.querySelector('iframe[src*="10minutemail"]');
                if (iframe) {
                    iframe.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:80%;height:80%;z-index:9999999;border:2px solid #ffd93d;border-radius:8px;';
                    addLog('🌐 Đã mở mail!', 'success');
                } else {
                    window.open('https://10minutemail.one', '_blank');
                    addLog('🌐 Đã mở mail trong tab mới!', 'success');
                }
            };

            document.getElementById('bdk-open-mail-new').onclick = () => {
                window.open('https://10minutemail.one', '_blank');
                addLog('🌐 Đã mở mail trong tab mới!', 'success');
            };

            // ===== RANDOM ACCOUNT =====
            document.getElementById('bdk-gen-account').onclick = () => {
                const name = document.getElementById('bdk-name-input').value.trim() || 'user';
                const { email, password } = generateAccount(name);
                document.getElementById('bdk-gen-email').textContent = email;
                document.getElementById('bdk-gen-pass').textContent = password;
                addLog(`👤 Đã tạo: ${email} | ${password}`, 'success');
                saveProfile({ email, password, name, time: new Date().toISOString() });
            };

            // ===== COPY ACCOUNT =====
            document.getElementById('bdk-copy-account').onclick = () => {
                const email = document.getElementById('bdk-gen-email').textContent;
                if (email && email !== '---') {
                    navigator.clipboard.writeText(email);
                    addLog(`📋 Đã copy email: ${email}`, 'success');
                } else {
                    addLog('⚠️ Chưa có email để copy!', 'warn');
                }
            };

            // ===== COPY PASSWORD =====
            document.getElementById('bdk-copy-pass').onclick = () => {
                const pass = document.getElementById('bdk-gen-pass').textContent;
                if (pass && pass !== '---') {
                    navigator.clipboard.writeText(pass);
                    addLog(`📋 Đã copy password: ${pass}`, 'success');
                } else {
                    addLog('⚠️ Chưa có password để copy!', 'warn');
                }
            };

            // ===== GET TOKEN =====
            document.getElementById('bdk-get-token').onclick = () => {
                const token = getToken();
                if (token) {
                    document.getElementById('bdk-token-display').value = token;
                    addLog(`🔑 Đã lấy token: ${token.substring(0, 20)}...`, 'success');
                    saveToken(token);
                } else {
                    addLog('❌ Không tìm thấy token!', 'error');
                }
            };

            // ===== COPY TOKEN =====
            document.getElementById('bdk-copy-token').onclick = () => {
                const token = document.getElementById('bdk-token-display').value;
                if (token && token !== 'Token sẽ hiện ở đây...') {
                    navigator.clipboard.writeText(token);
                    addLog('📋 Đã copy token!', 'success');
                } else {
                    addLog('⚠️ Chưa có token để copy!', 'warn');
                }
            };

            // ===== LOGOUT =====
            document.getElementById('bdk-logout').onclick = () => {
                if (confirm('Logout tài khoản hiện tại?')) {
                    logout();
                    addLog('🚪 Đã logout!', 'success');
                }
            };

            document.getElementById('bdk-logout-all').onclick = () => {
                if (confirm('Logout TẤT CẢ tài khoản?')) {
                    logoutAll();
                    addLog('🚪 Đã logout TẤT CẢ!', 'success');
                }
            };

            // ===== EXPORT =====
            document.getElementById('bdk-export-profile').onclick = () => {
                const profiles = JSON.parse(localStorage.getItem('bdk_profiles') || '[]');
                if (profiles.length === 0) {
                    addLog('⚠️ Chưa có profile nào!', 'warn');
                    return;
                }
                const content = profiles.map(p => `${p.email}|${p.password}|${p.name}`).join('\n');
                downloadFile(content, 'profile.txt', 'text/plain');
                addLog(`💾 Đã export ${profiles.length} profile`, 'success');
            };

            document.getElementById('bdk-export-token').onclick = () => {
                const tokens = JSON.parse(localStorage.getItem('bdk_tokens') || '[]');
                if (tokens.length === 0) {
                    addLog('⚠️ Chưa có token nào!', 'warn');
                    return;
                }
                const content = tokens.join('\n');
                downloadFile(content, 'regtoken.txt', 'text/plain');
                addLog(`💾 Đã export ${tokens.length} token`, 'success');
            };

            addLog('✅ Tool đã sẵn sàng!', 'success');
        }
    };

    // ============================================================
    //  FUNCTIONS
    // ============================================================

    // === GET MAIL FROM IFRAME ===
    function getMailFromIframe(iframe) {
        return new Promise((resolve) => {
            try {
                const doc = iframe.contentDocument || iframe.contentWindow.document;
                if (!doc) {
                    resolve(null);
                    return;
                }
                // Tìm email
                const selectors = [
                    '.email', '#email', 'input[type="email"]', '.mail-address',
                    '.mail', '.address', '.inbox-email', '.email-address',
                    '[data-testid="email"]', '.email-text'
                ];
                for (const sel of selectors) {
                    const el = doc.querySelector(sel);
                    if (el) {
                        resolve(el.value || el.textContent || el.innerText);
                        return;
                    }
                }
                // Thử lấy từ body text
                const bodyText = doc.body?.textContent || '';
                const match = bodyText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
                resolve(match ? match[0] : null);
            } catch (e) {
                resolve(null);
            }
        });
    }

    // === GENERATE ACCOUNT ===
    function generateAccount(name) {
        const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
        const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'mail10p.com', 'tempmail.com'];
        const suffix = Math.floor(Math.random() * 1000);
        const email = `${cleanName}${suffix}@${domains[Math.floor(Math.random() * domains.length)]}`;
        const password = generatePassword(name);
        return { email, password };
    }

    function generatePassword(name) {
        const specials = ['!', '@', '#', '$', '%', '&', '*'];
        const num = Math.floor(Math.random() * 999);
        const special = specials[Math.floor(Math.random() * specials.length)];
        const upper = name.toUpperCase().substring(0, 2) || 'A';
        return `${upper}${name}${num}${special}`.replace(/\s/g, '');
    }

    // === GET TOKEN ===
    function getToken() {
        try {
            let token = localStorage.getItem('token');
            if (token) return token;

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                if (value && value.length > 50 && !value.includes('{') && !value.includes('[')) {
                    return value;
                }
            }

            const webpack = window.webpackChunkdiscord_app || window.webpackChunkdiscord;
            if (webpack) {
                const str = JSON.stringify(webpack);
                const match = str.match(/"token":"([^"]+)"/);
                if (match) return match[1];
            }

            const cookies = document.cookie.split(';');
            for (const cookie of cookies) {
                if (cookie.includes('token')) {
                    return cookie.split('=')[1];
                }
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    // === LOGOUT ===
    function logout() {
        try {
            localStorage.removeItem('token');
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.includes('token') || key.includes('auth') || key.includes('session'))) {
                    localStorage.removeItem(key);
                }
            }
            document.cookie.split(';').forEach(c => {
                document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
            });
            window.location.reload();
        } catch (e) {
            console.error('Logout error:', e);
        }
    }

    function logoutAll() {
        try {
            localStorage.clear();
            document.cookie.split(';').forEach(c => {
                document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
            });
            window.location.reload();
        } catch (e) {
            console.error('Logout all error:', e);
        }
    }

    // === SAVE PROFILE ===
    function saveProfile(data) {
        let profiles = JSON.parse(localStorage.getItem('bdk_profiles') || '[]');
        profiles.push(data);
        localStorage.setItem('bdk_profiles', JSON.stringify(profiles));
    }

    // === SAVE TOKEN ===
    function saveToken(token) {
        let tokens = JSON.parse(localStorage.getItem('bdk_tokens') || '[]');
        if (!tokens.includes(token)) {
            tokens.push(token);
            localStorage.setItem('bdk_tokens', JSON.stringify(tokens));
        }
    }

    // === DOWNLOAD FILE ===
    function downloadFile(content, filename, mimeType = 'text/plain') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ============================================================
    //  BOOT
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => UI.init());
    } else {
        UI.init();
    }

    console.log('✅ HELLFIRE TOOL PRO FIXED - Bố Duy Khánh đã sẵn sàng!');
    console.log('🛠️ Chức năng: Copy mail | Random account | Copy ACC/PASS | Lấy token | Logout | Export');
})();