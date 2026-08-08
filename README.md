# Biblioteca API DevOps

API REST desarrollada con Node.js, Express y PostgreSQL como parte de una actividad de aplicación de prácticas DevOps.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- CORS
- Nodemon
- Git y GitHub
- Google Cloud
- GitHub Actions

## Funcionalidades

La API permite:

- Consultar información de la biblioteca.
- Agregar nuevos libros.
- Verificar el estado de funcionamiento de la API mediante un endpoint de monitoreo.

## Endpoints

### GET /

Muestra un mensaje de bienvenida.

```text
GET /
```

### GET /health

Permite verificar que la API se encuentra funcionando correctamente.

```text
GET /health
```

### GET /libros

Permite consultar los libros almacenados en PostgreSQL.

```text
GET /libros
```

### POST /libros

Permite agregar un nuevo libro a la base de datos.

```text
POST /libros
```

Ejemplo:

```json
{
  "titulo": "La sombra del viento",
  "autor": "Carlos Ruiz Zafón",
  "categoria": "Novela",
  "anio": 2001
}
```