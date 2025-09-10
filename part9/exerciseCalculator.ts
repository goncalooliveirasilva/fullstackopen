interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Arguments {
  dailyHours: number[];
  targetAmount: number;
}

const getArguments = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments.');

  if (args.slice(2).filter((s) => isNaN(Number(s))).length > 0) {
    throw new Error('Provided values were not just numbers.');
  }
  return {
    dailyHours: args.slice(3).map((s) => Number(s)),
    targetAmount: Number(args[2]),
  };
};

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

try {
  const { dailyHours, targetAmount } = getArguments(process.argv);
  console.log(calculateExercises(dailyHours, targetAmount));
} catch (error: unknown) {
  let errorMessage: string;
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  console.log(errorMessage);
}
