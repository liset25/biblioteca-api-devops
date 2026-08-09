const express = require('express');
const cors = require('cors');
require('dotenv').config();
console.log('DATABASE_URL configurada:', !!process.env.DATABASE_URL);

const pool = require('./config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Bienvenido a la API Biblioteca DevOps'
  });
});

// Endpoint de monitoreo
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    mensaje: 'API funcionando correctamente',
    fecha: new Date().toISOString()
  });
});

// Obtener todos los libros
app.get('/libros', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM libros ORDER BY id'
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar los libros:', error);

    res.status(500).json({
      error: 'Error al consultar los libros'
    });
  }
});

// Agregar un libro
app.post('/libros', async (req, res) => {
  try {
    const { titulo, autor, categoria, anio } = req.body;

    const resultado = await pool.query(
      `INSERT INTO libros (titulo, autor, categoria, anio)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [titulo, autor, categoria, anio]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al agregar el libro:', error);

    res.status(500).json({
      error: 'Error al agregar el libro'
    });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});