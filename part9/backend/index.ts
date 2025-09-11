import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import cors from 'cors';

const app = express();
app.use(express.json());
const PORT = 3001;

const corsOptions = {
  origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
