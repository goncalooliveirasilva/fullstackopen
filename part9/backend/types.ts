import { z } from 'zod';
import { NewEntrySchema } from './utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
// export type NewPatient = Omit<Patient, 'id'>;
export type NewPatient = z.infer<typeof NewEntrySchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}
