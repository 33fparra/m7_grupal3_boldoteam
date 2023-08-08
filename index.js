import express from 'express';
import pkg from 'pg';

const { Pool } = pkg;

const app = express();
app.use(express.json());

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'pipe1234',
  database: 'grupal3',
  port: 5432,
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })) // envio de post
app.use(express.json()) // envío de post

app.get('/', (req, res) => {
  // Aquí debes enviar el archivo HTML que mencionas
  res.sendFile('index.html');
});

app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT email, password FROM usuarios');
  res.json(result.rows);
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
  res.json(result.rows[0]);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND password = $2', [email, password]);
  if (result.rows.length > 0) {
    res.json({ message: 'Login successful', user: result.rows[0] });
  } else {
    res.status(401).json({ message: 'Email o password incorrecto' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
