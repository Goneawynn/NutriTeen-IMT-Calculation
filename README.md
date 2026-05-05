# 🥗 GiziRemaja — Kalkulator IMT, BMR & TEE
### Aplikasi Web Perhitungan Gizi Remaja 18–19 Tahun

---

## 📁 Struktur Folder

```
gizi-remaja/
├── index.html        ← Halaman 1: Form input + IMT + Z-score + BB Normal/Ideal
├── halaman2.html     ← Halaman 2: BMR (Mifflin-St Jeor) + TEE
├── halaman3.html     ← Halaman 3: Contoh perhitungan step-by-step + referensi rumus
├── css/
│   └── style.css     ← Seluruh styling (design system, animasi, responsive, print)
└── js/
    └── data.js       ← Data WHO 2007, semua fungsi kalkulasi, sessionStorage
```

---

## 🚀 Cara Menjalankan (Live Server — Disarankan)

### ✅ Opsi 1 — VS Code Live Server (Paling Mudah)
1. Buka folder `gizi-remaja/` di **VS Code**
2. Install extension **Live Server** (oleh Ritwick Dey) jika belum ada
3. Klik kanan file `index.html` → **"Open with Live Server"**
4. Browser otomatis terbuka di `http://127.0.0.1:5500`

### ✅ Opsi 2 — Python (Tidak Perlu Install Apapun)
```bash
cd gizi-remaja
python -m http.server 8080
# Buka: http://localhost:8080
```

### ✅ Opsi 3 — Node.js (npx)
```bash
cd gizi-remaja
npx serve .
# Buka URL yang muncul di terminal
```

### ⚠️ Mengapa Harus Live Server?
File ini menggunakan `sessionStorage` untuk menyimpan data antar halaman.
Jika dibuka langsung via `file://` (double-click), beberapa browser
memblokir sessionStorage sehingga data tidak tersimpan saat berpindah halaman.
Live Server berjalan di `http://` sehingga sessionStorage berfungsi penuh.

---

## 📊 Fitur Lengkap

### Halaman 1 — IMT & Analisis Gizi (`index.html`)
| Fitur | Detail |
|-------|--------|
| Form Input | Nama, jenis kelamin, usia (thn+bln), TB, BB, aktivitas fisik |
| Validasi | Semua field, range usia 18–19 thn, range TB/BB, error inline |
| Auto-konversi | cm → meter ditampilkan real-time saat mengetik |
| Hitung IMT | Rumus langkah-demi-langkah ditampilkan |
| Klasifikasi IMT | Tabel 5 kategori, baris posisi user di-highlight |
| Tabel WHO | ±3 bulan kontekstual, tombol toggle tampilkan semua 24 baris |
| SD & Z-score | Formula lengkap + angka perhitungan |
| Gauge Z-score | Visualisasi garis bilangan dengan pointer animasi |
| Status Gizi | Badge + deskripsi berdasarkan Z-score |
| BB Normal | Rentang dari data WHO −2SD hingga +2SD |
| BB Ideal | Formula Broca dengan perhitungan |
| Reset | Tombol "Hitung Ulang" — form bersih, hasil hilang, session dihapus |
| Cetak / PDF | `window.print()` dengan print stylesheet khusus |
| Navbar progress | Step 1 aktif, step 2/3 menyala saat sudah dikunjungi |

### Halaman 2 — BMR & TEE (`halaman2.html`)
| Fitur | Detail |
|-------|--------|
| Demo Mode | Jika sessionStorage kosong, tampilkan data contoh + banner kuning |
| Ringkasan Data | Stats dari halaman 1 ditampilkan ulang |
| BMR Mifflin-St Jeor | Rumus berbeda laki-laki/perempuan, perhitungan langkah-demi-langkah |
| Tabel Aktivitas | 3 level, baris aktivitas user di-highlight |
| TEE | Rumus + hasil + breakdown komponen |
| Perbandingan | Tabel TEE untuk semua 3 level aktivitas |
| Cetak / PDF | Print stylesheet aktif |

### Halaman 3 — Contoh Perhitungan (`halaman3.html`)
| Fitur | Detail |
|-------|--------|
| Kasus Budi | Laki-laki 18 thn 5 bln, TB 152 cm, BB 44.2 kg |
| Tabel WHO Dinamis | Di-render dari `data.js` (bukan hardcoded) → data selalu akurat |
| IMT step-by-step | Konversi → kalkulasi → klasifikasi |
| Median WHO | Tabel ±3 bulan sekitar usia contoh (218–224 bulan) |
| SD & Z-score | Rumus + angka → gauge visualisasi |
| BB Normal & Ideal | Formula Broca + rentang WHO |
| BMR & TEE | Penjelasan selisih dengan PDF ilustrasi |
| Referensi Rumus | Semua 8 rumus dalam satu kartu |
| Tabel Z-score | Klasifikasi 6 kategori dengan tindakan yang disarankan |

---

## 🧮 Rumus yang Digunakan

| # | Rumus | Formula |
|---|-------|---------|
| 1 | IMT | `BB (kg) ÷ TB² (m²)` |
| 2 | Standar Deviasi | `Median − Nilai (−1 SD)` |
| 3 | Z-score | `(IMT − Median) ÷ SD` |
| 4 | BB Normal | `Nilai SD × TB²`, rentang −2SD s/d +2SD |
| 5 | BB Ideal (Broca) | `(TB cm − 100) × 0.85` |
| 6 | BMR Laki-laki | `(10×BB) + (6.25×TB) − (5×Umur) + 5` |
| 7 | BMR Perempuan | `(10×BB) + (6.25×TB) − (5×Umur) − 161` |
| 8 | TEE | `BMR × Faktor Aktivitas` |

### Faktor Aktivitas Fisik
| Level | Faktor |
|-------|--------|
| Ringan (1–3 hari/minggu) | × 1.375 |
| Sedang (3–5 hari/minggu) | × 1.55 |
| Berat (6–7 hari/minggu) | × 1.725 |

---

## 🐛 Bug yang Sudah Difix (Final)

| Bug | Fix |
|-----|-----|
| `--neutral-600` & `--neutral-800` tidak ada di `:root` | Ditambahkan di CSS variables |
| `no-print` tidak di-hide saat `@media print` | Rule `display:none !important` ditambahkan |
| Stagger animation konflik dengan `.hidden` | Diganti ke selector `:not(.hidden)` |
| Animation tidak retrigger saat submit ulang | Force reflow via `offsetHeight` sebelum unhide |
| `table-scroll-inner` tidak di-override saat print | `max-height: none` ditambahkan di print media |
| Tabel WHO di halaman3 hardcoded (tidak akurat) | Dirender dinamis dari `data.js` |
| `tandaiSelesai(3)` tidak dipanggil di halaman3 | Ditambahkan di `<script>` inisialisasi |

---

## 🎨 Design System

| Token | Nilai |
|-------|-------|
| Font Display | DM Serif Display (judul) |
| Font Body | Plus Jakarta Sans |
| Warna Primer | `--green-600` (#2a9d5c) |
| Warna Sekunder | `--teal-400` (#2abfb8) |
| Border Radius | sm: 8px · md: 14px · lg: 20px |
| Breakpoint Mobile | max-width: 640px |

---

## 📖 Sumber Data & Referensi

- **Data WHO 2007** — WHO Growth Reference (BMI-for-age, usia 18–19 tahun = 216–239 bulan)
- **Rumus BMR** — Mifflin MD, St Jeor ST, Hill LA et al. (1990). *A new predictive equation for resting energy expenditure in healthy individuals.* Am J Clin Nutr.
- **Klasifikasi IMT** — WHO Global Database on Body Mass Index
- **BB Ideal** — Formula Broca yang dimodifikasi untuk populasi Asia

---

## ⚠️ Disclaimer

Aplikasi ini dibuat untuk **keperluan edukasi dan latihan**. Hasil perhitungan
bersifat estimasi berdasarkan referensi WHO 2007. Untuk penanganan masalah
gizi yang serius, selalu konsultasikan dengan **dokter atau ahli gizi** terdaftar.
