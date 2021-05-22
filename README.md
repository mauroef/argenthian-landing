# :crossed_swords: argenthian-landing

## Instalación

- Asegurarse de tener previamentes node js y npm instalado.
- Clonar repositorio y una vez en el directorio instalar las dependencias con `npm install`

## Comandos NPM

- `npm run build` sirve para deployar la aplicación, una vez ejecutado copiar los archivos de la carpeta _build_ al ambiente de producción.
- `npm run dev` levanta el ambiente de desarrollo local, permitiendo ver las modificaciones hechas en _src_ en tiempo real.

## Tecnologías

- _Gulp_ para la automatización de tareas del ambiente de desarrollo de y compilación de archivos a producción
- _Pug_ como motor de vistas y modularización de HTML
- _Scss_ preprocesador de CSS
- Minificador de imágenes

## A tener en cuenta

- En _./gulpfile.js_ existe una variable llamada _isProduction_ seteada en `false`. Al momento de deployar la aplicación debe pasarse a `true` para el minificado de archivos.

## Referencias

- https://gulpjs.com/
- https://pugjs.org/api/getting-started.html
- https://sass-lang.com/
