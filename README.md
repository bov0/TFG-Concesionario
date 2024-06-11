# GMC - Frontend

Bienvenido al repositorio del frontend de GMC, una aplicación web desarrollada con React para la compraventa de vehículos. Este proyecto surge como respuesta a la insatisfacción con las opciones existentes en línea para la compraventa de vehículos, ofreciendo una experiencia más cómoda y agradable.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribución](#contribución)
- [Licencia](#licencia)

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

gmc-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AuthContext.js
│   │   ├── FiltrosContext.js
│   │   ├── Parametro.js
│   │   └── ...
│   ├── pages/
│   │   ├── ComprasVentas.js
│   │   ├── NuestrosCoches.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
└── README.md