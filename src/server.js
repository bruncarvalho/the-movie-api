import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT

// Middleware
app.use(cors()); //comunicação entre domínios
app.use(express.json());

// Rota para criar filmes
app.post('/', async (req, res) => {
  try {
    const { name, year, rating } = req.body;

    const [result] = await pool.query(
      'INSERT INTO movies (name, year, rating) (?, ?, ?)',
      [name, year, rating]
    );

    res.status(201).json({ id: result.insertId, name, year, rating });
  } catch (e) {
    res.status(500).json({ erro: "Falha ao criar filme" });
  }
})