# Cara Menjalankan Aplikasi & Emulator (Fix DNS & Grafis)

Jika Anda mengalami masalah "Network Error" atau tampilan emulator yang lambat/crash, gunakan panduan ini.

## 1. Menjalankan Emulator (Fix DNS & GPU)
Gunakan perintah ini untuk memastikan emulator bisa terhubung ke internet/API dan memiliki performa grafis yang stabil di Mac:

```bash
emulator -avd Pixel_7_Pro_API_35 -dns-server 8.8.8.8 -gpu host
```
*Keterangan:*
- `-dns-server 8.8.8.8`: Mengatasi "Network Error" (DNS unknown host).
- `-gpu host`: Mengatasi masalah rendering/grafis di Mac Apple Silicon.

## 2. Memperbaiki Error Instalasi (Signature Conflict)
Jika muncul error `INSTALL_FAILED_UPDATE_INCOMPATIBLE`, jalankan perintah ini sebelum menginstal ulang:

```bash
adb uninstall com.xenter.rsudmsaleh
```

## 3. Menjalankan Aplikasi
Setelah emulator aktif, jalankan aplikasi dengan:

```bash
npm run android
```

---
*Catatan: Pastikan path Android SDK sudah terdaftar di environment variable Anda.*
