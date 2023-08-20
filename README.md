<div style="background-color: #00FF74; color: black; text-align:center;">
  <h1 style="padding-top: 5px;">TALLER ENDPOINTS CON NODE.JS</h1>
</div>

En este proyecto Backend se crean endpoints con los cuales podemos realizar consultas a bases de datos de MYSQL, a continuación la explicación de cada endpoint.

## USO Y CONSUMO DE LOS ENDPOINTS

## Installation

1. Clona este repositorio en tu computadora, usa el siguiente comando:

```bash
git clone https://github.com/Jean0405/mongoBodegas.git
```

2. Asegurate de tener Node.js instalado en tu computadora. De no ser así, descargalo e instala [Node js](https://nodejs.org/es/download)

3. Instala las dependecias necesarias de forma automatica con el siguiente comando, el cual tomara el archivo **package.json** y lo tomara de guía para dichas instalaciones.

```bash
  npm install
```

4. ejecuta el archivo db/atlas.mongodb

5. ejecuta npm run dev

### [BASE DE DATOS]

Al clonar, podrás ejecutar del archivo **db/atlas.mongodb** para crear, relacionar e insertar los datos para pruebas de ejemplo.

### [VARIABLES DE ENTORNO]

#### ⚠️ _Recuerda implementar tus propias variables de entorno_ ⚠️

```json
MY_CONFIG={"hostname": "","port":}
MY_CONNECTION={"host": "","user":"","database":"","password":"","port":}
```

### [ENDPOINTS]

Mediante el uso de los siguientes ENDPOINTS podrás realizar peticiones al servidor y la base de datos:

### 🟢 ENDPOINT PRINCIPAL

- http://127.20.24.1:3600 -> [ esta es una ruta de ejemplo ]

### 🔴 ENDPOINT BODEGAS

```json
{
  "winery_name": "Bodega Bucaros 22",
  "responsible_id": 1,
  "winery_state": "activo",
  "winery_created_by": 1,
  "winery_updated_by": null,
  "winery_created_at": "2023-10-10T08:15:26Z",
  "winery_updated_at": null,
  "winery_deleted_at": null
}
```

**POST:** http://127.20.24.1:3600/bodegas

**GET:** http://127.20.24.1:3600/bodegas

### 🔴 ENDPOINT INVENTARIOS

```json
{
  "inventory_winery_ID": 1,
  "inventory_product_ID": 1,
  "inventory_cantity": 26,
  "inventory_created_by": 1,
  "inventory_updated_by": null,
  "inventory_created_at": "2023-08-16",
  "inventory_updated_at": null,
  "inventory_deleted_at": null
}
```

**POST:** http://127.20.24.1:3600/inventarios

**GET:** http://127.20.24.1:3600/inventarios

#### ❗ El siguiente endpoint permite trasladar inventario de un producto de una bodega a otra.❗

```json
{
  "product_id": 1,
  "cantity": 20,
  "wineryOrigin_id": 1,
  "wineryDestiny_id": 2
}
```

**PUT:** http://127.20.24.1:3600/inventarios/trasladar

### 🔴 ENDPOINT PRODUCTOS

```json
{
  "product_name": "Cerveza Aguila",
  "product_description": "Es muy buena pa tomar SIUUUU",
  "product_state": "activo",
  "product_created_by": 1,
  "product_updated_by": null,
  "product_created_at": "2023-08-15",
  "product_updated_at": null,
  "product_deleted_at": null
}
```

**POST:** http://127.20.24.1:3600/inventarios

**GET:** http://127.20.24.1:3600/inventarios

## Tech Stack

**Server:** _Typescript, Node, Express, MongoDB_

## AUTORES

- [@Jean0405](https://github.com/Jean0405)
