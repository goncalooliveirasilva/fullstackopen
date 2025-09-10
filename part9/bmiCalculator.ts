const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 25.0) {
    return 'Normal range';
  } else if (bmi < 30.0) {
    return 'Overweight';
  }
  return 'Obese';
};

console.log(calculateBmi(180, 74));
