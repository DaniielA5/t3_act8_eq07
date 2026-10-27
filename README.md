# t3_act8_eq07 — Plataforma de Asesorías

Mini sistema en React: login con DummyJSON, panel con sidebar/navbar y tabla de asesores con filtros, paginación y CRUD.

## Integrantes
- Daniel Juarez — [@DaniielA5](https://github.com/DaniielA5)
- [Tu nombre completo] — [@Isaac051225](https://github.com/Isaac051225)

## API utilizada
- Login: DummyJSON Auth (`https://dummyjson.com/auth/login`)
- Tabla: DummyJSON Users (`https://dummyjson.com/users`), mostrados como asesores

Usuario de prueba: `emilys` / `emilyspass`

## Despliegue
http://165.22.188.79/t3_act8_eq07

## Cómo correrlo en local
```bash
git clone https://github.com/DaniielA5/t3_act8_eq07.git
cd t3_act8_eq07
npm install
npm run dev
```
Abrir http://localhost:5173/t3_act8_eq07/

## Funcionalidades

- Login con validación de campos y mensajes de error.
- Sistema protegido: sin sesión solo se ve el login.
- Sidebar y navbar con foto, nombre y cerrar sesión.
- Tabla con filtros, paginación reflejada en la URL (`?page=2&limit=20`), indicador de carga y manejo de errores.
- Agregar, editar y eliminar registros con confirmación.
