import express from 'express';
import pkg from 'pg';

const { Pool } = pkg;

const app = express();
app.use(express.json());

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'pipe1234',
  database: 'softlife',
  port: 5432,
});

app.get('/', (req, res) => {
  // Aquí debes enviar el archivo HTML que mencionas
  res.sendFile('index.html');
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
  res.json(result.rows[0]);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND password = $2', [email, password]);
  if (result.rows.length > 0) {
    res.json({ message: 'Login successful', user: result.rows[0] });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
