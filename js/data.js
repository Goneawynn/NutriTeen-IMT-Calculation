// ═══════════════════════════════════════════════════════
//  DATA & CALCULATION ENGINE
//  Aplikasi Perhitungan Gizi Remaja 18–19 Tahun
// ═══════════════════════════════════════════════════════

// ─── DATA WHO 2007: MEDIAN IMT PER USIA ─────────────────
// Sumber: WHO 2007 growth reference (IMT-for-age, 5–19 tahun)
// Satuan: kg/m², usia dalam bulan
// Kolom: median, -1SD, -2SD, -3SD, +1SD, +2SD, +3SD

const WHO_DATA = {
  male: [
    // usia_bulan, median, neg1SD, neg2SD, neg3SD, pos1SD, pos2SD, pos3SD
    { months: 216, median: 21.1, neg1SD: 18.5, neg2SD: 16.4, neg3SD: 14.7, pos1SD: 24.6, pos2SD: 29.4, pos3SD: 36.3 }, // 18y0m
    { months: 217, median: 21.1, neg1SD: 18.5, neg2SD: 16.4, neg3SD: 14.7, pos1SD: 24.6, pos2SD: 29.4, pos3SD: 36.3 },
    { months: 218, median: 21.2, neg1SD: 18.6, neg2SD: 16.4, neg3SD: 14.7, pos1SD: 24.7, pos2SD: 29.5, pos3SD: 36.5 },
    { months: 219, median: 21.2, neg1SD: 18.6, neg2SD: 16.5, neg3SD: 14.8, pos1SD: 24.8, pos2SD: 29.6, pos3SD: 36.6 },
    { months: 220, median: 21.3, neg1SD: 18.7, neg2SD: 16.5, neg3SD: 14.8, pos1SD: 24.9, pos2SD: 29.7, pos3SD: 36.7 },
    { months: 221, median: 21.3, neg1SD: 18.7, neg2SD: 16.5, neg3SD: 14.8, pos1SD: 24.9, pos2SD: 29.8, pos3SD: 36.8 },
    { months: 222, median: 21.4, neg1SD: 18.8, neg2SD: 16.6, neg3SD: 14.9, pos1SD: 25.0, pos2SD: 29.9, pos3SD: 37.0 },
    { months: 223, median: 21.4, neg1SD: 18.8, neg2SD: 16.6, neg3SD: 14.9, pos1SD: 25.1, pos2SD: 30.0, pos3SD: 37.1 },
    { months: 224, median: 21.5, neg1SD: 18.9, neg2SD: 16.7, neg3SD: 14.9, pos1SD: 25.1, pos2SD: 30.1, pos3SD: 37.2 },
    { months: 225, median: 21.5, neg1SD: 18.9, neg2SD: 16.7, neg3SD: 15.0, pos1SD: 25.2, pos2SD: 30.2, pos3SD: 37.3 },
    { months: 226, median: 21.6, neg1SD: 19.0, neg2SD: 16.7, neg3SD: 15.0, pos1SD: 25.3, pos2SD: 30.3, pos3SD: 37.4 },
    { months: 227, median: 21.6, neg1SD: 19.0, neg2SD: 16.8, neg3SD: 15.0, pos1SD: 25.3, pos2SD: 30.4, pos3SD: 37.5 },
    { months: 228, median: 21.7, neg1SD: 19.1, neg2SD: 16.8, neg3SD: 15.1, pos1SD: 25.4, pos2SD: 30.5, pos3SD: 37.6 }, // 19y0m
    { months: 229, median: 21.7, neg1SD: 19.1, neg2SD: 16.9, neg3SD: 15.1, pos1SD: 25.5, pos2SD: 30.6, pos3SD: 37.7 },
    { months: 230, median: 21.8, neg1SD: 19.2, neg2SD: 16.9, neg3SD: 15.1, pos1SD: 25.5, pos2SD: 30.6, pos3SD: 37.8 },
    { months: 231, median: 21.8, neg1SD: 19.2, neg2SD: 16.9, neg3SD: 15.2, pos1SD: 25.6, pos2SD: 30.7, pos3SD: 37.9 },
    { months: 232, median: 21.9, neg1SD: 19.2, neg2SD: 17.0, neg3SD: 15.2, pos1SD: 25.7, pos2SD: 30.8, pos3SD: 38.0 },
    { months: 233, median: 21.9, neg1SD: 19.3, neg2SD: 17.0, neg3SD: 15.2, pos1SD: 25.7, pos2SD: 30.9, pos3SD: 38.1 },
    { months: 234, median: 22.0, neg1SD: 19.3, neg2SD: 17.0, neg3SD: 15.3, pos1SD: 25.8, pos2SD: 31.0, pos3SD: 38.2 },
    { months: 235, median: 22.0, neg1SD: 19.4, neg2SD: 17.1, neg3SD: 15.3, pos1SD: 25.9, pos2SD: 31.1, pos3SD: 38.3 },
    { months: 236, median: 22.1, neg1SD: 19.4, neg2SD: 17.1, neg3SD: 15.3, pos1SD: 25.9, pos2SD: 31.2, pos3SD: 38.4 },
    { months: 237, median: 22.1, neg1SD: 19.5, neg2SD: 17.1, neg3SD: 15.4, pos1SD: 26.0, pos2SD: 31.2, pos3SD: 38.5 },
    { months: 238, median: 22.2, neg1SD: 19.5, neg2SD: 17.2, neg3SD: 15.4, pos1SD: 26.1, pos2SD: 31.3, pos3SD: 38.6 },
    { months: 239, median: 22.2, neg1SD: 19.5, neg2SD: 17.2, neg3SD: 15.4, pos1SD: 26.1, pos2SD: 31.4, pos3SD: 38.7 },
  ],
  female: [
    { months: 216, median: 21.4, neg1SD: 18.7, neg2SD: 16.6, neg3SD: 14.9, pos1SD: 24.7, pos2SD: 29.1, pos3SD: 35.4 },
    { months: 217, median: 21.4, neg1SD: 18.7, neg2SD: 16.7, neg3SD: 14.9, pos1SD: 24.8, pos2SD: 29.2, pos3SD: 35.5 },
    { months: 218, median: 21.5, neg1SD: 18.8, neg2SD: 16.7, neg3SD: 14.9, pos1SD: 24.8, pos2SD: 29.2, pos3SD: 35.5 },
    { months: 219, median: 21.5, neg1SD: 18.8, neg2SD: 16.7, neg3SD: 15.0, pos1SD: 24.9, pos2SD: 29.3, pos3SD: 35.6 },
    { months: 220, median: 21.5, neg1SD: 18.8, neg2SD: 16.8, neg3SD: 15.0, pos1SD: 24.9, pos2SD: 29.3, pos3SD: 35.7 },
    { months: 221, median: 21.6, neg1SD: 18.9, neg2SD: 16.8, neg3SD: 15.0, pos1SD: 25.0, pos2SD: 29.4, pos3SD: 35.7 },
    { months: 222, median: 21.6, neg1SD: 18.9, neg2SD: 16.8, neg3SD: 15.0, pos1SD: 25.0, pos2SD: 29.4, pos3SD: 35.8 },
    { months: 223, median: 21.6, neg1SD: 18.9, neg2SD: 16.8, neg3SD: 15.1, pos1SD: 25.0, pos2SD: 29.5, pos3SD: 35.8 },
    { months: 224, median: 21.7, neg1SD: 19.0, neg2SD: 16.9, neg3SD: 15.1, pos1SD: 25.1, pos2SD: 29.5, pos3SD: 35.9 },
    { months: 225, median: 21.7, neg1SD: 19.0, neg2SD: 16.9, neg3SD: 15.1, pos1SD: 25.1, pos2SD: 29.6, pos3SD: 35.9 },
    { months: 226, median: 21.7, neg1SD: 19.0, neg2SD: 16.9, neg3SD: 15.1, pos1SD: 25.2, pos2SD: 29.6, pos3SD: 36.0 },
    { months: 227, median: 21.8, neg1SD: 19.1, neg2SD: 16.9, neg3SD: 15.2, pos1SD: 25.2, pos2SD: 29.7, pos3SD: 36.0 },
    { months: 228, median: 21.8, neg1SD: 19.1, neg2SD: 17.0, neg3SD: 15.2, pos1SD: 25.2, pos2SD: 29.7, pos3SD: 36.1 },
    { months: 229, median: 21.8, neg1SD: 19.1, neg2SD: 17.0, neg3SD: 15.2, pos1SD: 25.3, pos2SD: 29.7, pos3SD: 36.1 },
    { months: 230, median: 21.9, neg1SD: 19.1, neg2SD: 17.0, neg3SD: 15.2, pos1SD: 25.3, pos2SD: 29.8, pos3SD: 36.2 },
    { months: 231, median: 21.9, neg1SD: 19.2, neg2SD: 17.0, neg3SD: 15.3, pos1SD: 25.3, pos2SD: 29.8, pos3SD: 36.2 },
    { months: 232, median: 21.9, neg1SD: 19.2, neg2SD: 17.1, neg3SD: 15.3, pos1SD: 25.4, pos2SD: 29.9, pos3SD: 36.3 },
    { months: 233, median: 22.0, neg1SD: 19.2, neg2SD: 17.1, neg3SD: 15.3, pos1SD: 25.4, pos2SD: 29.9, pos3SD: 36.3 },
    { months: 234, median: 22.0, neg1SD: 19.2, neg2SD: 17.1, neg3SD: 15.3, pos1SD: 25.4, pos2SD: 29.9, pos3SD: 36.4 },
    { months: 235, median: 22.0, neg1SD: 19.3, neg2SD: 17.1, neg3SD: 15.4, pos1SD: 25.5, pos2SD: 30.0, pos3SD: 36.4 },
    { months: 236, median: 22.1, neg1SD: 19.3, neg2SD: 17.2, neg3SD: 15.4, pos1SD: 25.5, pos2SD: 30.0, pos3SD: 36.5 },
    { months: 237, median: 22.1, neg1SD: 19.3, neg2SD: 17.2, neg3SD: 15.4, pos1SD: 25.5, pos2SD: 30.1, pos3SD: 36.5 },
    { months: 238, median: 22.1, neg1SD: 19.4, neg2SD: 17.2, neg3SD: 15.4, pos1SD: 25.6, pos2SD: 30.1, pos3SD: 36.6 },
    { months: 239, median: 22.2, neg1SD: 19.4, neg2SD: 17.2, neg3SD: 15.5, pos1SD: 25.6, pos2SD: 30.1, pos3SD: 36.6 },
  ]
};

// ─── KLASIFIKASI IMT ──────────────────────────────────────
const IMT_KLASIFIKASI = [
  { label: 'Berat Badan Kurang',      min: 0,    max: 18.5,  class: 'buruk',    desc: 'Underweight (Kekurangan berat badan)' },
  { label: 'Berat Badan Normal',      min: 18.5, max: 22.9,  class: 'normal',   desc: 'Berat badan ideal (Normal)' },
  { label: 'Kelebihan Berat Badan',   min: 23.0, max: 24.9,  class: 'lebih',    desc: 'Overweight (Kelebihan berat badan)' },
  { label: 'Obesitas I',              min: 25.0, max: 29.9,  class: 'obesitas', desc: 'Obesitas tingkat I' },
  { label: 'Obesitas II',             min: 30.0, max: 999,   class: 'obesitas', desc: 'Obesitas tingkat II (berat)' },
];

// ─── AKTIVITAS FISIK ──────────────────────────────────────
const AKTIVITAS_DATA = [
  {
    key: 'minimal',
    label: 'Minimal',
    icon: '💼',
    factor: 1.2,
    desc: 'Minimal bergerak atau kerja kantoran',
    contoh: 'Pekerjaan kantor, duduk lama, aktivitas minimal'
  },
  {
    key: 'ringan',
    label: 'Ringan',
    icon: '🚶',
    factor: 1.375,
    desc: 'Aktivitas ringan, olahraga 1–2 kali/minggu',
    contoh: 'Jalan kaki, kegiatan rumah tangga ringan, pekerjaan ringan'
  },
  {
    key: 'sedang',
    label: 'Sedang',
    icon: '🏃',
    factor: 1.55,
    desc: 'Kegiatan/aktivitas sedang, olahraga 3–5 hari/minggu',
    contoh: 'Jogging, bersepeda, renang santai, pelajar aktif'
  },
  {
    key: 'berat',
    label: 'Berat',
    icon: '🏋️',
    factor: 1.725,
    desc: 'Aktivitas berat, olahraga 6–7 hari/minggu',
    contoh: 'Latihan intensif, atlet, pekerjaan fisik berat setiap hari'
  },
  {
    key: 'ekstrem',
    label: 'Ekstrem',
    icon: '⚡',
    factor: 1.9,
    desc: 'Kegiatan/aktivitas ekstrem, olahraga 2 kali sehari atau lebih',
    contoh: 'Atlet profesional, latihan dua kali sehari, pekerjaan sangat fisik dengan olahraga intensif'
  },
];

// ═══════════════════════════════════════════════════════
//  FUNGSI KALKULASI
// ═══════════════════════════════════════════════════════

/**
 * Hitung total usia dalam bulan
 */
function hitungUsiaBulan(tahun, bulan) {
  return (tahun * 12) + bulan;
}

/**
 * Ambil data WHO sesuai usia & jenis kelamin
 */
function getWHOData(usiaBulan, jenisKelamin) {
  const dataset = WHO_DATA[jenisKelamin];
  // Clamp ke range 216–239 bulan (18–19 tahun)
  const clampedMonths = Math.max(216, Math.min(239, usiaBulan));
  return dataset.find(d => d.months === clampedMonths) || dataset[0];
}

/**
 * Hitung IMT
 * IMT = BB (kg) / TB² (m²)
 */
function hitungIMT(beratKg, tinggiM) {
  return beratKg / (tinggiM * tinggiM);
}

/**
 * Klasifikasi IMT standar WHO
 */
function klasifikasiIMT(imt) {
  for (const k of IMT_KLASIFIKASI) {
    if (imt >= k.min && imt < k.max) return k;
  }
  return IMT_KLASIFIKASI[IMT_KLASIFIKASI.length - 1];
}

/**
 * Hitung Standar Deviasi
 * SD = Median - (tabel -1SD)  (menggunakan sisi bawah dari median)
 * atau menggunakan interpolasi antara SD
 */
function hitungSD(whoRow) {
  // SD = median - nilai pada -1SD
  return whoRow.median - whoRow.neg1SD;
}

/**
 * Hitung Z-score
 * Z = (IMT - Median) / SD
 */
function hitungZScore(imt, median, sd) {
  return (imt - median) / sd;
}

/**
 * Status gizi berdasarkan Z-score (WHO 2007)
 */
function statusGizi(zscore) {
  if (zscore < -3)        return { label: 'Gizi Buruk',   class: 'buruk',    emoji: '⚠️', desc: 'Sangat kekurangan gizi, perlu penanganan segera' };
  if (zscore < -2)        return { label: 'Gizi Kurang',  class: 'kurang',   emoji: '📉', desc: 'Kekurangan gizi, perlu peningkatan asupan' };
  if (zscore <= 1)        return { label: 'Gizi Normal',  class: 'normal',   emoji: '✅', desc: 'Status gizi baik, pertahankan pola makan sehat' };
  if (zscore <= 2)        return { label: 'Gizi Lebih',   class: 'lebih',    emoji: '📈', desc: 'Kelebihan gizi ringan, perlu kontrol pola makan' };
  if (zscore <= 3)        return { label: 'Obesitas',     class: 'obesitas', emoji: '🔴', desc: 'Obesitas, disarankan konsultasi tenaga gizi' };
  return                         { label: 'Obesitas II',  class: 'obesitas', emoji: '🔴', desc: 'Obesitas berat, segera konsultasi dokter/ahli gizi' };
}

/**
 * Berat badan normal menggunakan IMT
 * BB Normal = Median IMT × TB² (m²)
 * Range: BB pada -2SD hingga +2SD
 */
function hitungBBNormal(whoRow, tinggiM) {
  const bbMin  = whoRow.neg2SD * (tinggiM * tinggiM);
  const bbMax  = whoRow.pos2SD * (tinggiM * tinggiM);
  const bbMed  = whoRow.median * (tinggiM * tinggiM);
  return { min: bbMin, max: bbMax, median: bbMed };
}

/**
 * Berat badan ideal (Broca formula)
 * BB Ideal = (TB cm - 100) - ((TB cm - 100) × 15%)
 *          = (TB cm - 100) × 0.85
 */
function hitungBBIdeal(tinggiCm) {
  const base = tinggiCm - 100;
  return base * 0.85;
}

/**
 * BMR — Mifflin-St Jeor
 * Laki-laki:   BMR = (10 × BB) + (6.25 × TB) - (5 × Umur) + 5
 * Perempuan:   BMR = (10 × BB) + (6.25 × TB) - (5 × Umur) - 161
 */
function hitungBMR(beratKg, tinggiCm, umurTahun, jenisKelamin) {
  const base = (10 * beratKg) + (6.25 * tinggiCm) - (5 * umurTahun);
  return jenisKelamin === 'male' ? base + 5 : base - 161;
}

/**
 * TEE = BMR × Faktor Aktivitas
 */
function hitungTEE(bmr, aktivitasKey) {
  const ak = AKTIVITAS_DATA.find(a => a.key === aktivitasKey);
  if (!ak) return bmr;
  return bmr * ak.factor;
}

// ═══════════════════════════════════════════════════════
//  PENYIMPANAN DATA ANTAR HALAMAN
// ═══════════════════════════════════════════════════════

const STORAGE_KEY      = 'giziRemaja_data';
const STORAGE_PROGRESS = 'giziRemaja_progress';

function simpanData(data) {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
  tandaiSelesai(1);
}

function ambilData() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function resetData() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_PROGRESS);
  } catch(e) {}
}

// ─── PROGRESS TRACKING ───────────────────────────────────
function tandaiSelesai(step) {
  try {
    const raw = sessionStorage.getItem(STORAGE_PROGRESS);
    const prog = raw ? JSON.parse(raw) : {};
    prog[step] = true;
    sessionStorage.setItem(STORAGE_PROGRESS, JSON.stringify(prog));
  } catch(e) {}
}

function getProgress() {
  try {
    const raw = sessionStorage.getItem(STORAGE_PROGRESS);
    return raw ? JSON.parse(raw) : {};
  } catch(e) { return {}; }
}

/**
 * Update navbar step indicators berdasarkan progress
 * Panggil di setiap halaman setelah DOM siap
 * @param {number} currentStep - halaman aktif (1, 2, atau 3)
 */
function updateNavProgress(currentStep) {
  const prog = getProgress();
  const steps = document.querySelectorAll('.navbar-step');
  const connectors = document.querySelectorAll('.navbar-connector');

  steps.forEach((el, i) => {
    const stepNum = i + 1;
    el.classList.remove('active', 'done');
    if (stepNum === currentStep) {
      el.classList.add('active');
    } else if (prog[stepNum] || stepNum < currentStep) {
      el.classList.add('done');
    }
    // Update inner number span visibility
    const span = el.querySelector('.step-num-txt');
    // span hides via CSS .done rule
  });

  // Light up connectors between completed steps
  connectors.forEach((el, i) => {
    // connector[0] = between step1 & step2, connector[1] = between step2 & step3
    const leftStep = i + 1;
    if (prog[leftStep] || leftStep < currentStep) {
      el.classList.add('done');
    } else {
      el.classList.remove('done');
    }
  });
}

// ─── DEMO DATA ────────────────────────────────────────────
// Dipakai saat halaman 2/3 diakses tanpa sessionStorage
function getDemoData() {
  const tbCm   = 165;
  const tbM    = tbCm / 100;
  const bbKg   = 58;
  const thn    = 18;
  const bln    = 6;
  const jk     = 'male';
  const usiaBln = hitungUsiaBulan(thn, bln);
  const whoRow  = getWHOData(usiaBln, jk);
  const imt     = hitungIMT(bbKg, tbM);
  const klasif  = klasifikasiIMT(imt);
  const sd      = hitungSD(whoRow);
  const zscore  = hitungZScore(imt, whoRow.median, sd);
  const status  = statusGizi(zscore);
  const bbNorm  = hitungBBNormal(whoRow, tbM);
  const bbIdeal = hitungBBIdeal(tbCm);

  return {
    _isDemo: true,
    nama: 'Contoh (Demo)',
    jk, jkLabel: 'Laki-laki',
    thn, bln, usiaBln,
    tbCm, tbM, bbKg,
    aktivitas: 'ringan',
    imt, klasif, sd, zscore, status, whoRow, bbNorm, bbIdeal
  };
}

// ═══════════════════════════════════════════════════════
//  HELPER FORMAT
// ═══════════════════════════════════════════════════════

function fmt(num, dec = 2) {
  return parseFloat(num).toFixed(dec);
}

function fmtKal(num) {
  return Math.round(num).toLocaleString('id-ID');
}

function usiaBulanLabel(totalBulan) {
  const thn = Math.floor(totalBulan / 12);
  const bln = totalBulan % 12;
  return `${thn} tahun${bln > 0 ? ` ${bln} bulan` : ''}`;
}
