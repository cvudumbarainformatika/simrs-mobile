# ==============================================================================
# Makefile - SIMRS Mobile (Xenter RSUD Dr. Mohamad Saleh)
# ==============================================================================

.PHONY: help emu emulator list-emu start dev android run open clean uninstall fix-install devices reverse doctor build-apk build-bundle

# Konfigurasi Default Emulator
AVD ?= Pixel_7_Pro_API_35
DNS ?= 8.8.8.8
GPU ?= host
PACKAGE ?= com.xenter.rsudmsaleh

help:
	@echo "\n========================================================"
	@echo "  🛠️   COMMAND HELPER - SIMRS MOBILE (EXPO / REACT NATIVE)"
	@echo "========================================================"
	@echo "  make emu          - Buka emulator Android (Fix DNS 8.8.8.8 & GPU Host)"
	@echo "  make list-emu     - Tampilkan daftar emulator yang tersedia"
	@echo "  make start        - Jalankan Expo Dev Server (Metro bundler)"
	@echo "  make android      - Jalankan aplikasi ke Android (expo run:android)"
	@echo "  make open         - [All-in-One] Buka emulator & langsung jalankan app"
	@echo "--------------------------------------------------------"
	@echo "  make devices      - Cek perangkat / emulator yang tersambung"
	@echo "  make reverse      - Forward port Metro bundler (adb reverse)"
	@echo "  make fix-install  - Uninstall app jika ada error signature conflict"
	@echo "  make clean        - Bersihkan cache build Android & Expo"
	@echo "  make doctor       - Cek kesehatan dependencies & Expo SDK"
	@echo "  make build-bundle - Build Android App Bundle (.aab) lokal via Gradle"
	@echo "  make build-apk    - Build file APK Release secara lokal"
	@echo "--------------------------------------------------------"
	@echo "  make eas-login    - Login ke akun Expo / EAS CLI"
	@echo "  make eas-build    - Build Production .aab di Cloud EAS"
	@echo "  make eas-submit   - Submit/Upload .aab ke Google Play Console"
	@echo "  make eas-release  - [Build + Submit] Build AAB & otomatis kirim ke Play Store"
	@echo "========================================================\n"

# 1. Jalankan Emulator di background dengan setting DNS & GPU stabil
emu emulator:
	@echo "🚀 Menjalankan emulator: $(AVD) (DNS: $(DNS), GPU: $(GPU))..."
	@nohup emulator -avd $(AVD) -dns-server $(DNS) -gpu $(GPU) > /dev/null 2>&1 &
	@echo "✅ Emulator sedang booting di latar belakang."

# 2. Cek daftar emulator yang terpasang di Android SDK
list-emu:
	@echo "📱 Daftar emulator (AVD) yang tersedia:"
	@emulator -list-avds

# 3. Jalankan server Expo (Metro Bundler)
start dev:
	@echo "⚡ Menjalankan Expo development server..."
	npx expo start -c

# 4. Jalankan aplikasi ke Android
android run:
	@echo "📲 Memasang dan menjalankan aplikasi ke Android..."
	npx expo run:android

# 5. All-in-One: Buka emulator, tunggu siap, lalu jalankan aplikasi
open:
	@echo "🚀 Menyiapkan emulator $(AVD)..."
	@nohup emulator -avd $(AVD) -dns-server $(DNS) -gpu $(GPU) > /dev/null 2>&1 &
	@echo "⏳ Menunggu emulator online..."
	@adb wait-for-device
	@echo "✅ Emulator terdeteksi! Menjalankan aplikasi..."
	npx expo run:android

# 6. Cek perangkat terhubung
devices:
	@adb devices

# 7. Reverse port Metro (8081)
reverse:
	@adb reverse tcp:8081 tcp:8081
	@echo "✅ Port 8081 berhasil di-reverse ke emulator."

# 8. Hapus aplikasi dari emulator/HP jika ada konflik signature instalasi
fix-install uninstall:
	@echo "🗑️  Menghapus package $(PACKAGE)..."
	adb uninstall $(PACKAGE) || true
	@echo "✅ Selesai."

# 9. Bersihkan cache build
clean:
	@echo "🧹 Membersihkan cache build Android dan Expo..."
	cd android && ./gradlew clean
	rm -rf .expo
	@echo "✅ Cache berhasil dibersihkan."

# 10. Validasi environment & dependencies Expo
doctor:
	npx expo-doctor

# 11. Build Release Lokal (Gradle)
build-bundle:
	@echo "📦 Membangun Android App Bundle (.aab) secara lokal via Gradle..."
	cd android && ./gradlew bundleRelease

build-apk:
	@echo "📦 Membangun APK Release secara lokal..."
	cd android && ./gradlew assembleRelease

# 12. EAS Cloud Build & Submit ke Google Play Console
eas-login:
	@echo "🔑 Login ke akun Expo EAS..."
	eas login

eas-build:
	@echo "🚀 Memulai Cloud Build EAS (Production Android)..."
	eas build --platform android --profile production

eas-submit:
	@echo "📤 Mengunggah AAB ke Google Play Console..."
	eas submit --platform android --latest

eas-release:
	@echo "🚀 Memulai Build Production EAS dan otomatis Submit ke Google Play Console..."
	eas build --platform android --profile production --auto-submit
