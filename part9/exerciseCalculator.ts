interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyHours: number[],
  targetAmount: number,
): Result => {
  const average =
    dailyHours.reduce((total, current) => total + current, 0) /
    dailyHours.length;

  let rating: number;
  let ratingDescription: string;

  if (average < targetAmount * 0.75) {
    rating = 1;
    ratingDescription = 'too bad';
  } else if (average < targetAmount) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'amazing work';
  }

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((h) => h > 0).length,
    success: average >= targetAmount,
    rating,
    ratingDescription,
    target: targetAmount,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
