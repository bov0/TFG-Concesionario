# GMC - Frontend

Bienvenido al repositorio del frontend de GMC, una aplicación web desarrollada con React para la compraventa de vehículos. Este proyecto surge como respuesta a la insatisfacción con las opciones existentes en línea para la compraventa de vehículos, ofreciendo una experiencia más cómoda y agradable.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribución](#contribución)

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/bov0/TFG-Concesionario.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd .\TFG-Concesionario\
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

## Uso

Para iniciar la aplicación en modo de desarrollo, ejecuta:

    ```bash
    npm start
    ```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación en el navegador. La página se recargará automáticamente si realizas cambios en el código.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

gmc-frontend/ ██
├── public/ ██
│   ├── index.html ██
│   └── ... ██
├── src/ ██
│   ├── components/ ██
│   │   ├── AuthContext.js ██
│   │   ├── FiltrosContext.js ██
│   │   ├── Parametro.js ██
│   │   └── ... ██
│   ├── pages/ ██
│   │   ├── ComprasVentas.js ██
│   │   ├── NuestrosCoches.js ██
│   │   └── ... ██
│   ├── App.js ██
│   ├── index.js ██
│   └── ... ██
├── .gitignore ██
├── package.json ██
└── README.md ██

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

    npm start: Inicia la aplicación en modo de desarrollo.
    npm test: Inicia el corredor de pruebas.
    npm run build: Construye la aplicación para producción en la carpeta build.

## Tecnologías Utilizadas

    React: Biblioteca principal para la construcción de la interfaz de usuario.
    Axios: Cliente HTTP para realizar peticiones al backend.
    NextUI: Biblioteca de componentes UI para React.
    React Router: Manejo de rutas en la aplicación.

## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto, por favor sigue estos pasos:

    Haz un fork del proyecto.
    Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
    Realiza tus cambios y haz commit (git commit -m 'Agrega nueva funcionalidad').
    Empuja tus cambios a la rama (git push origin feature/nueva-funcionalidad).
    Abre un Pull Request.