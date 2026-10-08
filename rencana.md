# 📋 BLUEPRINT & RENCANA PENGEMBANGAN FITUR XENTER MOBILE
## RSUD dr. Mohamad Saleh Kota Probolinggo
**Status Dokumen:** Master Plan / Roadmap  
**Target Pengguna:** Pegawai RSUD dr. Mohamad Saleh (Dokter DPJP, Perawat/Bidan, Nakes Lain, Staf Umum/Manajemen)  
**Backend:** `api.laborat` (Laravel) & `www/chatbot` (AI Engine)  

---

## 🎯 Tujuan Transformasi
Mengembangkan aplikasi **Xenter Mobile** dari yang semula hanya berfokus pada **Presensi/Absensi** dan **Upload Berkas Poli** menjadi **Hospital Employee Companion Super-App** terintegrasi, yang membantu operasional nakes, manajemen SDM, logistik ruangan, dan monitoring eksekutif.

---

## 🏗️ Klaster Fitur Utama

### 1. Modul Kepegawaian & SDM (Database: `kepegx`)
*Mempermudah administrasi mandiri pegawai tanpa perlu antre di bagian kepegawaian.*

1. **E-Cuti & Perizinan Online**
   - Cek kuota sisa cuti tahunan real-time.
   - Pengajuan cuti (tahunan, sakit, bersalin, alasan penting) + lampiran foto surat dokter/bukti.
   - Approval berjenjang (Kepala Ruangan -> Kasi -> Kabid/Wadir) via notifikasi.
   - *Tabel Acuan:* `kepegx.master_cutis`, `kepegx.reg_ijin`.

2. **Kalender Dinas & Tukar Jadwal Jaga (Shift Exchange)**
   - Kalender kerja interaktif per ruangan (Pagi, Siang, Malam, Libur).
   - Pengajuan tukar dinas antar rekan kerja dalam satu unit dengan validasi Kepala Ruangan.
   - Reminder otomatis 1 jam sebelum shift kerja dimulai.
   - *Tabel Acuan:* `kepegx.m_shift`, `kepegx.jadwal_absens`, `kepegx.jams`.

3. **Slip Remunerasi & Jasa Pelayanan (Jaspel)**
   - Akses rincian slip jaspel bulanan aman dengan proteksi Biometrik (Fingerprint / FaceID).
   - Transparansi poin kinerja, potongan, dan nominal bersih yang diterima.
   - *Tabel Acuan:* Database `siasik`, modul `jasa.php`.

4. **E-Kinerja & Logbook Harian Pegawai**
   - Pengisian capaian kinerja harian atau indikator SKP pegawai via mobile.
   - *Tabel Acuan:* `kepegx.evkin`, `kepegx.uraiantugas`.

---

### 2. Clinical Mobile Companion (Database: `rs`)
*Membantu Dokter DPJP dan Perawat saat visit bangsal rawat inap atau bertugas on-call.*

1. **Daftar Pasien Binaan DPJP (Doctor Mobile Ward)**
   - Daftar seluruh pasien yang dirawat per bangsal/ruangan beserta status diagnosa & DPJP utama/konsul.
   - Ringkasan klinis: TTV terakhir, hasil penunjang terakhir, status alergi, dan terapi berjalan.
   - *Tabel Acuan:* `rs23` (Ranap), `rs17` (Rajal), `rs24` (Ruangan), `rs15` (Pasien).

2. **Notifikasi Konsul Antar DPJP (Konsultasi Klinis On-Call)**
   - Push notification instan saat dokter spesialis menerima lembar konsul baru dari IGD atau Bangsal.
   - Dokter spesialis dapat membaca lembar konsul dan memberikan jawaban konsul langsung dari smartphone.
   - *Tabel Acuan:* Modul `v1/simrs/ranap/layanan/konsultasi.php`.

3. **Peringatan Nilai Kritis Laboratorium (LIS Panic Value Alert)**
   - Push notification prioritas tinggi jika hasil lab pasien menunjukkan nilai kritis (misal: Troponin reaktif, Hipoglikemia berat, Kalium kritis).
   - *Tabel Acuan:* Modul LIS di `routes/v1/lis.php`.

4. **Input Catatan Perkembangan (CPPT SOAP Mobile / Voice-to-Text)**
   - Pengisian CPPT singkat atau voice-to-text saat dokter/perawat berada di samping tempat tidur pasien.
   - *Tabel Acuan:* `cppts`, modul `v1/simrs/ranap/layanan/cppt.php`.

---

### 3. Asisten AI Pegawai & Regulasi RS (Engine: `www/chatbot`)
*Mengadopsi mesin AI chatbot internal yang sudah memiliki kamus skema 1.033 tabel.*

1. **Pocket AI Assistant Pegawai**
   - Tanya jawab internal RS berbasis bahasa alami:
     - *"Dokter anak yang praktek hari ini siapa saja?"*
     - *"Berapa bed rawat inap kelas 1 dan ICU yang masih kosong?"*
     - *"Bagaimana alur klaim pasien JKN kecelakaan lalu lintas?"*
   - *Integrasi:* API FastAPI di `www/chatbot` (`app_fastapi.py`).

2. **E-SPO (Buku Saku Standar Prosedur Operasional)**
   - Akses cepat ribuan SOP pelayanan dan medis per unit kerja RSUD dr. Mohamad Saleh.
   - Pencarian instan untuk kebutuhan akreditasi (STARKES/KARS) dan tata laksana klinis.
   - *Tabel Acuan:* `routes/v1/spo/spo` (`/getsoplist`, `/units`).

3. **Widget Monitoring Satu Sehat (Bagi Tim Casemix / IT)**
   - Indikator real-time antrean pengiriman berkas Satu Sehat Kemenkes (Rajal, Ranap, IGD) dan notifikasi jika ada bridging error.
   - *Tabel Acuan:* `satset_dictionary.json`.

---

### 4. Logistik, Aset & Helpdesk Fasilitas (Database: `sigarang`)
*Pelaporan cepat dan manajemen inventaris ruangan.*

1. **Permintaan Barang Habis Pakai (BHP) Ruangan**
   - Pengajuan amprah BHP/ATK ruangan langsung dari smartphone ke gudang logistik.
   - *Tabel Acuan:* Database `sigarang` (`detail_pemesanans`, `barang108s`).

2. **Helpdesk & Pelaporan Kerusakan Fasilitas/IT**
   - Foto alat medis/fasilitas yang rusak (AC, tensimeter, printer, komputer) dan kirim tiket ke tim IPSRS / IT SIMRS.
   - Notifikasi status progres perbaikan.

---

### 5. Executive Dashboard (Direksi & Kepala Ruangan)
*Dashboard ringkas indikator mutu & pelayanan rumah sakit.*

1. **Indikator Efisiensi Rawat Inap:** BOR (Bed Occupancy Rate), ALOS, TOI real-time.
2. **Trafik Kunjungan:** Pasien IGD hari ini, Poli Rawat Jalan, dan Bed Kosong.
3. **Penerimaan Keuangan:** Realisasi billing & kasir harian.
* *Tabel Acuan:* Modul `routes/v1/dashboardexecutive/dashboard.php`.

---

## 🗓️ Tahapan Implementasi (Roadmap)

| Tahap | Modul Prioritas | Target Output |
|---|---|---|
| **Fase 1** | E-Cuti & Kalender Shift Jaga | Pengajuan cuti online, kalender dinas perawat/dokter |
| **Fase 2** | E-SPO & Slip Jaspel Digital | Buku saku SOP digital, slip jaspel aman biometrik |
| **Fase 3** | Doctor Mobile Ward & Notif Konsul | Daftar pasien ranap DPJP, alert konsul ruangan |
| **Fase 4** | Pocket AI Pegawai & Satu Sehat Monitor | Chatbot operasional RS, pemantauan bridging Satu Sehat |
| **Fase 5** | Logistik BHP & Executive Dashboard | Ticketing kerusakan alat, dashboard BOR & pendapatan |
