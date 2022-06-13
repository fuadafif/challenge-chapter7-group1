Dibuat dengan ExpressJS , EJS, Sequelize & Postgres

### Dependencies

Library yang digunakan adalah

- `sequelize-cli`: untuk membuat database, migration, dan operasi sejenisnya.
- `sequelize`: untuk ORM sebagai pembantu pengelolaan data database di javascript.
- `pg`: untuk menghubungkan antara project ini dengan database postgres.
- `ejs`: untuk template engine yang digunakan menampilkan halaman web.

### Cara menggunakan

1. Clone repository ini via terminal

```
git clone https://github.com/fuadafif/challenge-chapter7-group1
```

2. Setelah selesai, masuk ke dalam direktori repository

3. Install module yang dibutuhkan

```
npm install
```

4. Edit `config/config.json`

5. Buat database (Pastikan sudah menginstall `sequelize-cli` secara global)

```
sequelize db:create
```

6. Migrasikan tabel (Pastikan sudah menginstall `sequelize-cli` secara global)

```
sequelize db:migrate
```

7. Jalankan program

```
node index.js
```
