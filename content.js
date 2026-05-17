// 1. Daftar Kata Terlarang
const kataTerlarang = [
    "porno", "porn", "seks", "sex", "dewasa", "bugil", "telanjang", 
    "mesum", "cabul", "nsfw", "18+", "erotis", "bokep", "bf", 
    "vidio panas", "video panas", "skandal", "open bo", "vcs", 
    "xxx", "jav", "hentai", "onlyfans", "p0rn", "nudes",
    "judi", "taruhan", "kasino", "casino", "poker", "togel", 
    "judol", "slot", "gacor", "maxwin", "rtp slot", "pola slot", 
    "scatter", "depo", "situs gacor", "parlay", "sbobet", "jud1", "sl0t"
];

// 2. Daftar Domain Aman (Whitelist) - Pengecualian dari blokir URL
const domainAman = [
    "accounts.google.com", // Halaman Login Google
    "myaccount.google.com", // Pengaturan Akun Google
    "mail.google.com"       // Gmail
];

const urlGambarPeringatan = "https://animealert.net/wp-content/uploads/2025/07/20250721_142018-1024x576.jpg"; 

// 3. FITUR BLOKIR HALAMAN OTOMATIS (Dengan pengecekan Whitelist)
function periksaHalaman() {
    const urlSaatIni = window.location.href.toLowerCase();
    const hostnameSaatIni = window.location.hostname.toLowerCase(); // Hanya mengambil nama domain (misal: accounts.google.com)
    const judulHalaman = document.title.toLowerCase();
    
    // Cek apakah situs saat ini ada di dalam daftar domain aman
    const isAman = domainAman.some(domain => hostnameSaatIni.includes(domain));
    
    // Jika situs ada di Whitelist, hentikan pengecekan URL dan biarkan halaman terbuka
    if (isAman) {
        return; 
    }

    // Jika bukan situs aman, lakukan pengecekan kata terlarang seperti biasa
    const terdeteksi = kataTerlarang.some(kata => urlSaatIni.includes(kata) || judulHalaman.includes(kata));

    if (terdeteksi) {
        window.stop(); 
        
        if (document.body) {
            document.body.innerHTML = "";
            document.body.style.overflow = "hidden";
        } else {
            document.documentElement.innerHTML = "<body></body>";
        }
        
        tampilkanPopupGambar(true); 
    }
}
periksaHalaman();


// 4. FITUR DETEKSI MENGETIK (Tetap berjalan di semua situs)
document.addEventListener('input', function(event) {
    const elemenInput = event.target;
    const isEditable = elemenInput.tagName?.toLowerCase() === 'input' || 
                       elemenInput.tagName?.toLowerCase() === 'textarea' || 
                       elemenInput.isContentEditable;
    
    if (isEditable) {
        const teksDiketik = (elemenInput.value || elemenInput.innerText || "").toLowerCase();
        const terdeteksi = kataTerlarang.some(kata => teksDiketik.includes(kata));

        if (terdeteksi) {
            if (elemenInput.value !== undefined) elemenInput.value = ""; 
            if (elemenInput.innerText !== undefined) elemenInput.innerText = "";
            
            tampilkanPopupGambar(false); 
        }
    }
});


// 5. FUNGSI PEMBUAT POP-UP GAMBAR
function tampilkanPopupGambar(kunciPermanen) {
    if (document.getElementById('popup-peringatan-gambar')) return;

    const overlay = document.createElement('div');
    overlay.id = 'popup-peringatan-gambar';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
        background: rgba(0, 0, 0, 0.95); z-index: 2147483647; 
        display: flex; justify-content: center; align-items: center; flex-direction: column;
    `;

    const gambar = document.createElement('img');
    gambar.src = urlGambarPeringatan;
    gambar.style.cssText = `
        max-width: 50%; max-height: 50%; border: 5px solid #e74c3c; 
        border-radius: 15px; box-shadow: 0 0 30px rgba(231, 76, 60, 0.8);
    `;

    const teksTeguran = document.createElement('h2');
    teksTeguran.innerText = kunciPermanen ? "Akses Situs Diblokir!" : "Teguran: Kata Terlarang Dihapus!";
    teksTeguran.style.cssText = "color: white; font-family: sans-serif; margin-top: 20px;";

    const teksBantuan = document.createElement('p');
    teksBantuan.innerText = kunciPermanen ? "Sistem keamanan mencegah Anda membuka halaman ini." : "(Klik di mana saja untuk melanjutkan)";
    teksBantuan.style.cssText = "color: #bdc3c7; font-family: sans-serif; font-size: 14px;";

    overlay.appendChild(gambar);
    overlay.appendChild(teksTeguran);
    overlay.appendChild(teksBantuan);

    if(document.body) {
        document.body.appendChild(overlay);
    } else {
        document.documentElement.appendChild(overlay);
    }

    if (!kunciPermanen) {
        overlay.addEventListener('click', function() {
            overlay.remove();
        });
    }
}
