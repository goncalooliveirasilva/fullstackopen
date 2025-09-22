import express, { NextFunction, Response, Request } from 'express';
import patientService from '../services/patientService';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { z } from 'zod';
import { NewEntrySchema } from '../utils';

const router = express.Router();

const newPatienParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getEntries());
});

router.post(
  '/',
  newPatienParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<NewPatient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  },
);

router.get('/:id', (req: Request, res: Response<Patient>) => {
  res.send(patientService.getPatient(req.params.id));
});

router.use(errorMiddleware);

export default router;
