# CLONE REPOSITORY
```bash
git clone git@github.com:diegovera96/taller3.git
```
# INSTRUCTIONS
### MAKE SURE YOU HAVE
- [PHP v8.3.0](https://windows.php.net/download#php-8.3)

- [COMPOSER v2.6.6](https://getcomposer.org/download/)

- [MYSQL v8.0.35 ](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-35.html)

- [NODE v20.10.0](https://nodejs.org/dist/v20.10.0/)

- [NPM v10.2.3](https://www.npmjs.com/package/npm/v/10.2.3)

# BACKEND 
```bash
cd mobilehub/backend
composer install
```
Copy .env.example and rename to .env and open
### Configure DB Info

>DB_DATABASE= #Your DB name

>DB_USERNAME= #Your username

>DB_PASSWORD= #Your password

### Open terminal in backend folder
```bash
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
php artisan migrate
php artisan db:seed --class=UserSeeder
```

### Run in backend terminal
```bash
php artisan serve --host=0.0.0.0
```

# FRONTEND

Rename .env.copy and open

### Configure .env

> REACT_APP_PUBLIC_IP=your-ip

Example: REACT_APP_PUBLIC_IP=192.168.0.1

> GIT_TOKEN=your-token

Example: GIT_TOKEN=ghp_FDSAfDSAFdsaf32142dSAd
```bash
cd mobilehub/frontend
npm install
```
