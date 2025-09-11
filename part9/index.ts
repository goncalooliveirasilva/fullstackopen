import express from 'express';
import qs from 'qs';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { validateHeightAndWeight } from './utils';

const app = express();
app.use(express.json());

app.set('query parser', (str: string) =>
  qs.parse(str, {
    ignoreQueryPrefix: true,
    delimiter: '&',
    allowDots: true,
  }),
);

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (
    typeof height === 'string' &&
    typeof weight === 'string' &&
    validateHeightAndWeight(height, weight)
  ) {
    const w: number = Number(weight);
    const h: number = Number(height);
    res.send({
      weight: w,
      height: h,
      bmi: calculateBmi(h, w),
    });
  }
  res.status(400).json({ error: 'malformatted parameters' });
});

app.post('/exercises', (req, res) => {
  interface ExercisesRequest {
    daily_exercises: number[];
    target: number;
  }

  const { daily_exercises, target } = req.body as ExercisesRequest;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: 'malformed parameters' });
  }

  if (isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformed parameters' });
  }

  if (daily_exercises.some((x) => isNaN(Number(x)))) {
    return res.status(400).json({ error: 'mallformed parameters' });
  }

  return res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
