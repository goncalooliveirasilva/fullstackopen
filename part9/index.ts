import express from 'express';
import qs from 'qs';
import { calculateBmi, validateArguments } from './bmiCalculator';

const app = express();
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
    validateArguments(height, weight)
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
