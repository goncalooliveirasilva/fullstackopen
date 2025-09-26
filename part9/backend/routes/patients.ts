import express, { NextFunction, Response, Request } from 'express';
import patientService from '../services/patientService';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { z } from 'zod';
import { NewEntrySchema, NewPatientSchema } from '../utils';

const router = express.Router();

const newPatienParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
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
  const patient = patientService.getPatient(req.params.id);
  res.json(patient);
});

router.post(
  '/:id/entries',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const newEntry = NewEntrySchema.parse(req.body);
      const addedEntry = patientService.addEntry(req.params.id, newEntry);
      if (!addedEntry) {
        res.status(404).json({ error: 'Patient not found.' });
      }
      res.json(addedEntry);
    } catch (error) {
      next(error);
    }
  },
);

router.use(errorMiddleware);

export default router;
