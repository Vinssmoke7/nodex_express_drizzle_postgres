# Mi Backend - Node.js + Express + Drizzle ORM + PostgreSQL

API REST desarrollada con **Node.js**, **Express**, **Drizzle ORM** y **PostgreSQL**, con autenticación mediante **JWT** y contraseñas encriptadas con **bcryptjs**. El proyecto está dockerizado para facilitar su despliegue.

---

## Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Base de Datos y Drizzle ORM](#-base-de-datos-y-drizzle-orm)
  - [¿Cómo funcionan las migraciones?](#-cómo-funcionan-las-migraciones)
  - [Comandos de Drizzle Kit](#-comandos-de-drizzle-kit)
- [Docker](#-docker)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Ejemplo de Uso](#-ejemplo-de-uso)
- [Autor](#-autor)

---

## ✨ Características

- 🔐 Autenticación con **JWT** (JSON Web Tokens).
- 🔒 Encriptación de contraseñas con **bcryptjs**.
- 🐘 Base de datos **PostgreSQL** gestionada con **Drizzle ORM** y driver `pg`.
- ⚡ Migraciones SQL automáticas y reproducibles con **drizzle-kit**.
- 🐳 Configuración con **Docker** y **docker-compose**.
- 🧩 Arquitectura modular por capas (routes, controllers, models, middlewares).
- 🌐 CORS habilitado.
- ⚙️ Manejo centralizado de errores.
- 🔄 Recarga automática en desarrollo con **nodemon**.

---

## 🛠 Tecnologías

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| Node.js | >= 18 | Entorno de ejecución |
| Express | ^4.18.3 | Framework web |
| Drizzle ORM | ^0.39.0 | ORM TypeScript/JavaScript para PostgreSQL |
| Drizzle Kit | ^0.30.0 | CLI de migraciones y administración |
| pg | ^8.13.3 | Driver nativo de PostgreSQL |
| PostgreSQL | 15+ | Base de datos relacional |
| JWT | ^9.0.2 | Autenticación |
| bcryptjs | ^2.4.3 | Hash de contraseñas |
| dotenv | ^16.4.5 | Variables de entorno |
| cors | ^2.8.5 | Control de acceso HTTP |
| Docker | - | Contenedores |

---

## 📁 Estructura del Proyecto

```
.
├── docker-compose.yml
├── Dockerfile
├── drizzle/                    # Migraciones SQL generadas
├── drizzle.config.js           # Configuración de Drizzle Kit
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── app.js
    ├── config
    │   └── db.js               # Conexión Pool pg y cliente Drizzle
    ├── controllers
    │   ├── auth.controller.js
    │   ├── pets.controller.js
    │   └── user.controller.js
    ├── db
    │   └── schema.js           # Definición de tablas y relaciones
    ├── index.js                # Punto de entrada
    ├── middlewares
    │   ├── auth.middleware.js
    │   └── error.middleware.js
    ├── models
    │   ├── pet.model.js
    │   └── user.model.js
    └── routes
        ├── auth.routes.js
        ├── pets.routes.js
        └── user.routes.js
```

---

## ✅ Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (o usar Docker)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) (opcional, recomendado)

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd node_express_drizzle_postgres
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto (ver sección [Variables de Entorno](#-variables-de-entorno)).

### 4. Generar y aplicar migraciones

```bash
# Genera el archivo SQL de migración a partir de src/db/schema.js
npm run db:generate

# Aplica las migraciones pendientes en PostgreSQL
npm run db:migrate
```

> Alternativamente, en desarrollo puedes sincronizar los esquemas directamente sin archivos intermedios con:
> ```bash
> npm run db:push
> ```

### 5. Iniciar el servidor

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado).

---

## 🔑 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Servidor
PORT=3000

# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:password@localhost:5432/mi_backend"

# JWT
JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRES_IN=24h
```

---

## 📜 Scripts Disponibles

En el `package.json` se definen los siguientes scripts:

| Script | Comando | Descripción |
|--------|---------|-------------|
| `start` | `node src/index.js` | Inicia el servidor en producción |
| `dev` | `nodemon src/index.js` | Inicia el servidor en desarrollo con nodemon |
| `db:generate` | `drizzle-kit generate` | Genera archivos `.sql` de migración en `./drizzle` |
| `db:migrate` | `drizzle-kit migrate` | Ejecuta las migraciones pendientes en la base de datos |
| `db:push` | `drizzle-kit push` | Aplica cambios del esquema directamente a la BD (rápido en dev) |
| `db:studio` | `drizzle-kit studio` | Abre una interfaz visual web para gestionar datos |

---

## 🗄 Base de Datos y Drizzle ORM

### ¿Cómo funcionan las migraciones?

1. **Defines tus tablas en código JS**: Las tablas se definen en `src/db/schema.js` usando las funciones de `drizzle-orm/pg-core` (`pgTable`, `uuid`, `text`, etc.).
2. **Generas las migraciones (`npm run db:generate`)**: `drizzle-kit` compara tu código con el estado anterior y crea un archivo SQL en la carpeta `drizzle/` con las sentencias `CREATE TABLE`, `ALTER TABLE`, etc.
3. **Aplicas las migraciones (`npm run db:migrate`)**: Drizzle ejecuta las sentencias SQL en tu base de datos y mantiene un registro en una tabla `__drizzle_migrations` para no repetir migraciones ya ejecutadas.

### Comandos de Drizzle Kit

```bash
# Generar archivos SQL de migración
npm run db:generate

# Aplicar migraciones a la BD
npm run db:migrate

# Prototipado rápido (aplica esquema directamente sin generar SQL)
npm run db:push

# Abrir panel gráfico web para ver y editar datos
npm run db:studio
```

---

## 🐳 Docker

El proyecto incluye `Dockerfile` y `docker-compose.yml` para levantar la aplicación y la base de datos PostgreSQL en contenedores.

```bash
# Levantar todo
docker compose up --build

# En segundo plano
docker compose up -d --build

# Ver logs
docker compose logs -f api

# Detener contenedores (mantiene datos)
docker compose down

# Detener y borrar TODO (incluida la BD)
docker compose down -v
```

---

## 🌐 Endpoints de la API

### 🔐 Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar nuevo usuario | ❌ |
| POST | `/api/auth/login` | Iniciar sesión y obtener token | ❌ |
| GET | `/api/auth/profile` | Obtener perfil del usuario actual | ✅ |

### 👤 Usuarios (`/api/users`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/getUsers` | Listar usuarios | ✅ |
| GET | `/api/users/getUserById/:id` | Obtener usuario por ID | ✅ |
| PUT | `/api/users/updateUser/:id` | Actualizar usuario | ✅ |
| DELETE | `/api/users/deleteUser/:id` | Eliminar usuario | ✅ |

### 🐶 Mascotas (`/api/pets`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/pets/getPets` | Listar mascotas | ✅ |
| GET | `/api/pets/getPetById/:id` | Obtener mascota por ID | ✅ |
| POST | `/api/pets/createPet` | Crear nueva mascota | ✅ |
| PUT | `/api/pets/updatePet/:id` | Actualizar mascota | ✅ |
| DELETE | `/api/pets/deletePet/:id` | Eliminar mascota | ✅ |

---

## 👨‍💻 Autor

Desarrollado por **[Ingeniero. Andres Godoy]**

- GitHub: [@andres.1dgm7](https://github.com/andres.1dgm7)
- Email: andres.1dgm7@gmail.com