import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
