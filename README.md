# Bun + ElysiaJS + Drizzle + MySQL REST API

Sebuah REST API boilerplate sederhana yang menggunakan Bun sebagai runtime, ElysiaJS sebagai framework web, Drizzle ORM sebagai ORM database, dan MySQL sebagai database.

## Prerequisites

Pastikan Anda telah menginstal:
- [Bun](https://bun.sh/)
- MySQL database (berjalan secara lokal atau cloud)

## Setup

1. Clone repository ini dan masuk ke foldernya.
2. Instal dependencies:
   ```bash
   bun install
   ```
3. Salin file `.env.example` menjadi `.env` dan sesuaikan kredensial database Anda:
   ```bash
   cp .env.example .env
   ```
4. Jalankan migrasi database menggunakan Drizzle Kit untuk membuat tabel `users`:
   ```bash
   # Generate file migrasi
   bun run db:generate
   
   # Jalankan migrasi ke database MySQL
   bun run db:migrate
   ```

## Development

Jalankan server development dengan mode auto-reload/watch:
```bash
bun run dev
```

Server akan berjalan pada [http://localhost:3000](http://localhost:3000) (atau port yang dispesifikasikan di file `.env`).

## API Endpoints

- `GET /` - Root endpoint
- `GET /users` - Mengambil daftar semua user
- `GET /users/:id` - Mengambil user berdasarkan ID
- `POST /users` - Membuat user baru (body payload: `{ "name": "Nama", "email": "email@example.com" }`)
- `PUT /users/:id` - Mengupdate data user (body payload: `{ "name": "Nama Baru", "email": "baru@example.com" }`)
- `DELETE /users/:id` - Menghapus user berdasarkan ID
