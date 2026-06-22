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
app.post('/movies', async (req, res) => {
  try {
    const { name, year_of_release, CLASSIFICATION } = req.body;

    const [result] = await pool.query(
      'INSERT INTO movies (name, year_of_release, CLASSIFICATION) VALUES (?, ?, ?)',
      [name, year_of_release, CLASSIFICATION]
    );

    res.status(201).json({ id: result.insertId, name, year_of_release, CLASSIFICATION });
  } catch (e) {
    console.log(e)
    res.status(500).json({ erro: "Falha ao criar filme", e });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT name FROM movies'
    );
    res.json(rows);
  } catch(e) {
    res.status(500).json({ erro: 'Não foi possível exibir a lista de filmes', e});
  }
});

app.put('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year_of_release, CLASSIFICATION } = req.body;

    const [result] = await pool.query(
      'UPDATE movies SET name = COALESCE(?, name), year_of_release = COALESCE(?, year_of_release), CLASSIFICATION = COALESCE(?, CLASSIFICATION) WHERE id = ?',
      [name || null, year_of_release || null, CLASSIFICATION || null, id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ erro: `O Filme ${name} não encontrado` });
    }

    res.json({ mensagem: 'Filme atualizado com sucesso' })
  } catch (e) {
    console.log(e)
    const name = req.body.name
    res.status(500).json({ erro: `Falha ao atualizar filme ${name}` });
  }
});

 app.delete('/movies/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const [result] = await pool.query(
        'DELETE FROM movies WHERE id = ?',
      [id]
      );

      if (!result.affectedRows) {
        return res.status(404).json({ erro:`Não foi possível excluir o filme, pois filme não encontrado`});
      }

      res.json({ mensagem: "Filme excluído com sucesso" });

    } catch (e) {
      console.log(e)
      const name = req.body;
      res.status(500).json({ erro: `Falha ao excluir o filme ${name}` })

    }
  });

app.listen(PORT, () => {
  console.log(`Servidor MySQL rodando em http://localhost:${PORT}`)
});