# El Jard&iacute;n de los Recuerdos

Aplicaci&oacute;n web universitaria para guardar momentos especiales como flores en un jard&iacute;n digital. El proyecto es un laboratorio de Programaci&oacute;n Orientada a Eventos, construido con Vite y TypeScript y organizado con una arquitectura MVC.

## Tecnolog&iacute;as

- **Vite** para desarrollo local y compilaci&oacute;n de producci&oacute;n.
- **TypeScript** para la l&oacute;gica de la aplicaci&oacute;n.
- **SQL.js** para ejecutar SQLite real en el navegador mediante WebAssembly.
- **LocalStorage** para guardar la base SQLite exportada y conservar los recuerdos en el mismo navegador.
- **HTML y CSS** para una interfaz responsive con tema floral.

## Funcionalidades

- Crear recuerdos con t&iacute;tulo, descripci&oacute;n, fecha, emoci&oacute;n y color de flor.
- Ver recuerdos guardados como tarjetas en el jard&iacute;n.
- Editar y eliminar recuerdos.
- Filtrar el jard&iacute;n por emoci&oacute;n.
- Validar campos y mostrar mensajes de confirmaci&oacute;n.
- Conservar los datos al recargar la p&aacute;gina en el mismo navegador.

## Requisitos

- Node.js **20.19 o superior** o **22.12 o superior**.
- npm.

## Instalaci&oacute;n y ejecuci&oacute;n

Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Abre la URL local que muestra Vite.

Para comprobar la compilaci&oacute;n y previsualizar la versi&oacute;n de producci&oacute;n:

```bash
npm run build
npm run preview
```

El resultado se genera en `dist/`. El comando `build` ejecuta primero la comprobaci&oacute;n de TypeScript.

## Arquitectura del proyecto

- `src/models/Recuerdo.ts`: tipo de datos del recuerdo.
- `src/views/RecuerdoView.ts`: estructura de la interfaz.
- `src/controllers/RecuerdoController.ts`: eventos, validaci&oacute;n, filtro y operaciones CRUD.
- `src/db/database.ts`: inicializaci&oacute;n de SQL.js y persistencia de la base exportada.
- `src/styles/styles.css`: estilos, animaciones y adaptaci&oacute;n a pantallas peque&ntilde;as.
- `public/sql-wasm-browser.wasm`: archivo WebAssembly que solicita la compilaci&oacute;n browser de SQL.js usada por Vite. `public/sql-wasm.wasm` se conserva para la compilaci&oacute;n est&aacute;ndar de SQL.js.

## Publicaci&oacute;n en GitHub y Vercel

Sube el repositorio a GitHub y luego imp&oacute;rtalo desde Vercel. Usa estos valores de compilaci&oacute;n:

- Framework: **Vite**.
- Build command: `npm run build`.
- Output directory: `dist`.

No se requiere servidor, SQLite nativo ni almacenamiento de archivos en Vercel. Los archivos `public/sql-wasm-browser.wasm` y `public/sql-wasm.wasm` se publican como recursos est&aacute;ticos.

## Persistencia y privacidad

Los recuerdos se guardan en LocalStorage bajo la clave `jardin_recuerdos_db`. Permanecen en el perfil de navegador donde se crearon; no hay cuentas ni sincronizaci&oacute;n entre dispositivos. Borrar los datos del sitio elimina esa copia. No almacenes informaci&oacute;n sensible: la aplicaci&oacute;n no cifra los recuerdos.
