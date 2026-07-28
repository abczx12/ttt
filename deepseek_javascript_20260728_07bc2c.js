// hellfire_tool_pro_fixed.js - Bố Duy Khánh PRO MAX
// TỰ ĐỘNG TẠO FILE KHI EXPORT

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
                        <span style="font-weight:bold;">📧 MAIL 10P</span>
                        <div style="display:flex;gap:4px;">
                            <button id="bdk-copy-mail" style="padding:4px 10px;background:rgba(255,217,61,0.1);border:1px solid #ffd93d;color:#ffd93d;border-radius:4px;cursor:pointer;">📋 COPY</button>
                            <button id="bdk-open-mail-new" style="padding:4px 10px;background:rgba(79,172,254,0.1);border:1px solid #4facfe;color:#4facfe;border-radius:4px;cursor:pointer;">📧 TẠO MAIL</button>
                        </div>
                    </div>
                    <input id="bdk-mail-display" type="text" placeholder="Click 'TẠO MAIL' để tạo email..." style="width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,217,61,0.2);color:#ffd93d;border-radius:4px;padding:6px 8px;font-size:12px;font-family:monospace;">
                    <div style="margin-top:4px;display:flex;gap:6px;">
                        <button id="bdk-gen-mail" style="flex:1;padding:4px;background:rgba(79,172,254,0.1);border:1px solid #4facfe;color:#4facfe;border-radius:4px;cursor:pointer;font-size:11px;">🔄 TẠO MAIL MỚI</button>
                        <span id="bdk-mail-status" style="font-size:10px;color:#888;display:flex;align-items:center;">⏳ Chưa có mail</span>
                    </div>
                </div>

                <!-- ===== SECTION 2: RANDOM ACCOUNT ===== -->
                <div style="background:rgba(255,217,61,0.05);border-radius:8px;padding:12px;margin-bottom:12px;border:1px solid rgba(255,217,61,0.1);">
                    <div style="font-weight:bold;margin-bottom:6px;">👤 RANDOM ACCOUNT</div>
                    <div style="display:flex;gap:6px;margin-bottom:6px;">
                        <input id="bdk-name-input" type="text" placeholder="Nhập tên (VD: duy khánh)" style="flex:1;background:rgba(0,0,0,0.3);border:1px solid rgba(255,217,61,0.2);color:#ffd93d;border-radius:4px;padding:4px 8px;font-size:12px;">
                        <button id="bdk-gen-account" style="padding:4px 12px;background:rgba(255,217,61,0.1);border:1px solid #ffd93d;color:#ffd93d;border-radius:4px;cursor:pointer;">🎲 GEN</button>
                    </div>
                    <div style="display:flex;gap:6px;align-items:center;margin-top:4px;flex-wrap:wrap;">
                        <span style="font-size:11px;color:#888;">👤 <span id="bdk-gen-username">---</span></span>
                        <span style="font-size:11px;color:#888;">📧 <span id="bdk-gen-email">---</span></span>
                        <span style="font-size:11px;color:#888;">🔑 <span id="bdk-gen-pass">---</span></span>
                        <button id="bdk-copy-account" style="padding:2px 8px;background:rgba(67,233,123,0.1);border:1px solid #43e97b;color:#43e97b;border-radius:4px;cursor:pointer;font-size:9px;">📋 COPY ALL</button>
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
                        <button id="bdk-check-token" style="flex:1;padding:2px;background:rgba(79,172,254,0.1);border:1px solid #4facfe;color:#4facfe;border-radius:4px;cursor:pointer;font-size:10px;">🔍 CHECK TOKEN</button>
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

            // ===== MAIL 10P =====
            let currentMail = '';

            document.getElementById('bdk-open-mail-new').onclick = () => {
                window.open('https://10minutemail.one', '_blank');
                addLog('📧 Đã mở tab mail 10p!', 'info');
                document.getElementById('bdk-mail-status').textContent = '📧 Đã mở tab mail';
                document.getElementById('bdk-mail-status').style.color = '#4facfe';
            };

            document.getElementById('bdk-gen-mail').onclick = () => {
                const random = Math.random().toString(36).substring(2, 10);
                const domains = ['mail10p.com', '10minutemail.com', 'tempmail.com'];
                const domain = domains[Math.floor(Math.random() * domains.length)];
                currentMail = `${random}@${domain}`;
                document.getElementById('bdk-mail-display').value = currentMail;
                document.getElementById('bdk-mail-status').textContent = `✅ ${currentMail}`;
                document.getElementById('bdk-mail-status').style.color = '#43e97b';
                addLog(`📧 Đã tạo mail: ${currentMail}`, 'success');
            };

            document.getElementById('bdk-copy-mail').onclick = () => {
                const mail = document.getElementById('bdk-mail-display').value;
                if (mail && mail.includes('@')) {
                    navigator.clipboard.writeText(mail);
                    addLog(`📋 Đã copy mail: ${mail}`, 'success');
                } else {
                    addLog('⚠️ Chưa có mail để copy! Hãy tạo mail trước.', 'warn');
                }
            };

            // ===== RANDOM ACCOUNT =====
            document.getElementById('bdk-gen-account').onclick = () => {
                const name = document.getElementById('bdk-name-input').value.trim() || 'user';
                const { username, email, password } = generateAccount(name);
                document.getElementById('bdk-gen-username').textContent = username;
                document.getElementById('bdk-gen-email').textContent = email;
                document.getElementById('bdk-gen-pass').textContent = password;
                addLog(`👤 Đã tạo: ${username} | ${email} | ${password}`, 'success');
                saveProfile({ username, email, password, name, time: new Date().toISOString() });
            };

            // ===== COPY ACCOUNT =====
            document.getElementById('bdk-copy-account').onclick = () => {
                const username = document.getElementById('bdk-gen-username').textContent;
                const email = document.getElementById('bdk-gen-email').textContent;
                const pass = document.getElementById('bdk-gen-pass').textContent;
                if (username && username !== '---' && email && email !== '---' && pass && pass !== '---') {
                    const text = `Username: ${username}\nEmail: ${email}\nPassword: ${pass}`;
                    navigator.clipboard.writeText(text);
                    addLog(`📋 Đã copy: ${username} | ${email} | ${pass}`, 'success');
                } else {
                    addLog('⚠️ Chưa có account để copy!', 'warn');
                }
            };

            // ===== GET TOKEN =====
            document.getElementById('bdk-get-token').onclick = () => {
                const token = getRealToken();
                if (token) {
                    document.getElementById('bdk-token-display').value = token;
                    addLog(`🔑 Đã lấy token: ${token.substring(0, 20)}...`, 'success');
                    saveToken(token);
                } else {
                    addLog('❌ Không tìm thấy token! Hãy đăng nhập Discord trước.', 'error');
                }
            };

            // ===== COPY TOKEN =====
            document.getElementById('bdk-copy-token').onclick = () => {
                const token = document.getElementById('bdk-token-display').value;
                if (token && token !== 'Token sẽ hiện ở đây...' && token.length > 10) {
                    navigator.clipboard.writeText(token);
                    addLog('📋 Đã copy token!', 'success');
                } else {
                    addLog('⚠️ Chưa có token để copy! Hãy lấy token trước.', 'warn');
                }
            };

            // ===== CHECK TOKEN =====
            document.getElementById('bdk-check-token').onclick = () => {
                const token = document.getElementById('bdk-token-display').value;
                if (!token || token.length < 10) {
                    addLog('⚠️ Chưa có token để check!', 'warn');
                    return;
                }
                checkToken(token).then(result => {
                    if (result) {
                        addLog(`✅ Token hợp lệ! User: ${result.username}`, 'success');
                    } else {
                        addLog('❌ Token không hợp lệ hoặc đã hết hạn!', 'error');
                    }
                });
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

            // ===== EXPORT PROFILE =====
            document.getElementById('bdk-export-profile').onclick = () => {
                const profiles = JSON.parse(localStorage.getItem('bdk_profiles') || '[]');
                if (profiles.length === 0) {
                    addLog('⚠️ Chưa có profile nào để export! Hãy tạo account trước.', 'warn');
                    return;
                }
                // Tạo nội dung file
                let content = '=== PROFILE LIST ===\n';
                content += `Generated: ${new Date().toLocaleString()}\n`;
                content += `Total: ${profiles.length}\n\n`;
                profiles.forEach((p, i) => {
                    content += `[${i+1}] Username: ${p.username || p.name}\n`;
                    content += `    Email: ${p.email}\n`;
                    content += `    Password: ${p.password}\n`;
                    content += `    Time: ${p.time || new Date().toISOString()}\n\n`;
                });
                // Tạo file mới
                downloadFile(content, `profile_${Date.now()}.txt`, 'text/plain');
                addLog(`💾 Đã export ${profiles.length} profile vào file mới!`, 'success');
            };

            // ===== EXPORT TOKEN =====
            document.getElementById('bdk-export-token').onclick = () => {
                const tokens = JSON.parse(localStorage.getItem('bdk_tokens') || '[]');
                if (tokens.length === 0) {
                    addLog('⚠️ Chưa có token nào để export! Hãy lấy token trước.', 'warn');
                    return;
                }
                // Tạo nội dung file
                let content = '=== TOKEN LIST ===\n';
                content += `Generated: ${new Date().toLocaleString()}\n`;
                content += `Total: ${tokens.length}\n\n`;
                tokens.forEach((t, i) => {
                    content += `[${i+1}] ${t}\n`;
                });
                // Tạo file mới
                downloadFile(content, `tokens_${Date.now()}.txt`, 'text/plain');
                addLog(`💾 Đã export ${tokens.length} token vào file mới!`, 'success');
            };

            addLog('✅ Tool đã sẵn sàng!', 'success');
        }
    };

    // ============================================================
    //  FUNCTIONS
    // ============================================================

    // === GENERATE ACCOUNT ===
    function generateAccount(name) {
        const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
        const random = Math.random().toString(36).substring(2, 6);
        const suffix = Math.floor(Math.random() * 1000);
        
        // Username (tên hiển thị)
        const username = `${cleanName}${suffix}`;
        
        // Email
        const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'mail10p.com', 'tempmail.com'];
        const domain = domains[Math.floor(Math.random() * domains.length)];
        const email = `${username}@${domain}`;
        
        // Password
        const password = generatePassword(name);
        
        return { username, email, password };
    }

    function generatePassword(name) {
        const specials = ['!', '@', '#', '$', '%', '&', '*'];
        const num = Math.floor(Math.random() * 999);
        const special = specials[Math.floor(Math.random() * specials.length)];
        const upper = name.toUpperCase().substring(0, 2) || 'A';
        return `${upper}${name}${num}${special}`.replace(/\s/g, '');
    }

    // === GET REAL TOKEN ===
    function getRealToken() {
        try {
            // Cách 1: LocalStorage
            let token = localStorage.getItem('token');
            if (token) return token;
            
            // Cách 2: Webpack
            const webpack = window.webpackChunkdiscord_app || window.webpackChunkdiscord;
            if (webpack) {
                const str = JSON.stringify(webpack);
                const match = str.match(/"token":"([^"]+)"/);
                if (match) return match[1];
            }
            
            // Cách 3: Quét localStorage
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                if (value && value.length > 50 && !value.includes('{') && !value.includes('[')) {
                    return value;
                }
            }
            
            // Cách 4: Cookie
            const cookies = document.cookie.split(';');
            for (const cookie of cookies) {
                if (cookie.includes('token')) {
                    return cookie.split('=')[1];
                }
            }
            
            return null;
        } catch (e) {
            console.error('Lỗi lấy token:', e);
            return null;
        }
    }

    // === CHECK TOKEN ===
    async function checkToken(token) {
        try {
            const response = await fetch('https://discord.com/api/v9/users/@me', {
                headers: { 'Authorization': token }
            });
            if (response.status === 200) {
                return await response.json();
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
        setTimeout(() => URL.revokeObjectURL(url), 5000);
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
    console.log('🛠️ Chức năng: Copy mail | Random account | Lấy token thật | Logout | Export file mới');
})();