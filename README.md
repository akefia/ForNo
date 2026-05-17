# ForNo
🛡️ Web Guardian: Ekstensi Pemblokir Konten Negatif Real-Time
Deskripsi Singkat
Web Guardian adalah ekstensi peramban (browser extension) proaktif dan ringan yang dirancang untuk menciptakan lingkungan internet yang aman dan bersih. Ekstensi ini secara otomatis mencegah pengguna mengakses situs web atau melakukan pencarian yang berkaitan dengan konten tidak pantas, seperti pornografi dan perjudian online (judol). Berbeda dengan pemblokir tingkat DNS pada umumnya, Web Guardian beroperasi langsung di lapisan aplikasi (Document Object Model / DOM), sehingga mampu memberikan pencegahan seketika sebelum konten terlarang sempat dimuat.
✨ Fitur Utama

    ⌨️ Deteksi Keystroke Real-Time (Anti-Pencarian)
    Menggunakan Event Listener, sistem memantau setiap huruf yang diketikkan pengguna di berbagai kolom input, kotak pencarian, maupun elemen content-editable (seperti status media sosial). Jika sistem mendeteksi kecocokan dengan wordlist terlarang, input akan langsung dihapus dan pengguna akan menerima pop-up teguran visual.

    🔗 Inspeksi URL & Judul Halaman Lapis Ganda
    Mencegah teknik bypass navigasi (seperti mengklik tautan dari luar). Saat sebuah halaman dimuat, sistem akan memindai URL dan judul situs web. Jika terdeteksi mengandung kata kunci terlarang, proses pemuatan (loading) akan dibatalkan (window.stop()), elemen HTML akan dihapus paksa, dan layar akan dikunci secara permanen dengan peringatan akses diblokir.

    ✅ Sistem Whitelist Cerdas (Anti False-Positive)
    Dilengkapi dengan daftar putih (whitelist) untuk domain tepercaya yang memiliki struktur URL kompleks atau enkripsi token (seperti accounts.google.com). Fitur ini memastikan aktivitas penting seperti login ke akun email tidak ikut terblokir secara tidak sengaja oleh pembacaan URL.

    🛑 Peringatan Visual Dinamis
    Alih-alih hanya mengalihkan halaman, tools ini menyuntikkan pop-up overlay HTML/CSS murni berukuran penuh yang tidak bisa ditembus. Terdapat dua mode peringatan: mode teguran sementara (bisa ditutup dengan sekali klik) dan mode blokir permanen (tab harus ditutup).

🛠️ Arsitektur & Teknologi

    Bahasa: JavaScript (ES6+), HTML5, CSS3.

    API: WebExtensions API (Manifest V3) memastikan kompatibilitas lintas peramban, terutama untuk Mozilla Firefox (Gecko) dan peramban berbasis Chromium (Google Chrome, Microsoft Edge).

    Keamanan Eksekusi: Berjalan menggunakan Content Scripts dengan parameter "run_at": "document_start", memastikan skrip penjaga dieksekusi lebih awal daripada sumber daya (gambar/video) di situs web target.

🎯 Target Implementasi

Alat ini sangat ideal untuk diimplementasikan pada:

    Fasilitas komputer laboratorium sekolah atau kampus.

    Jaringan komputer organisasi atau instansi untuk menjaga produktivitas.

    Perangkat pribadi (Parental Control) guna melindungi anak di bawah umur dari paparan konten eksplisit.
