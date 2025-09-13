import { Gender, NewPatient } from './types';
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

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

const toNewPatient = (object: unknown): NewPatient => {
  return NewEntrySchema.parse(object);
};

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
