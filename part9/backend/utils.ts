import { Gender, NewPatient, HealthCheckRating } from './types';
import { z } from 'zod';

// // type guards
// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender)
//     .map((v) => v.toString())
//     .includes(param);
// };

// // parsing
// const parseName = (name: unknown): string => {
//   if (!isString(name)) {
//     throw new Error('Incorrect or missing name.');
//   }
//   return name;
// };

// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//     throw new Error('Incorrect or missing date: ' + date);
//   }
//   return date;
// };

// const parseSsn = (ssn: unknown): string => {
//   if (!isString(ssn)) {
//     throw new Error('Incorrect or missing ssn.');
//   }
//   return ssn;
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!isString(gender) || !isGender(gender)) {
//     throw new Error('Incorrect or missing gender.');
//   }
//   return gender;
// };

// const parseOccupation = (occupation: unknown): string => {
//   if (!isString(occupation)) {
//     throw new Error('Incorrect or missing occupation.');
//   }
//   return occupation;
// };

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

export const NewEntrySchema = z.union([
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

export type NewEntry = z.infer<typeof NewEntrySchema>;

// const toNewPatient = (object: unknown): NewPatient => {
//   if (!object || typeof object !== 'object') {
//     throw new Error('Incorrect or missing data.');
//   }

//   if (
//     'name' in object &&
//     'dateOfBirth' in object &&
//     'ssn' in object &&
//     'gender' in object &&
//     'occupation' in object
//   ) {
//     const newEntry: NewPatient = {
//       name: z.string().parse(object.name),
//       dateOfBirth: z.iso.date().parse(object.dateOfBirth),
//       ssn: z.string().parse(object.ssn),
//       gender: z.enum(Gender).parse(object.gender),
//       occupation: z.string().parse(object.occupation),
//     };
//     return newEntry;
//   }
//   throw new Error('Incorrect data: some fields are missing.');
// };

export default toNewPatient;
