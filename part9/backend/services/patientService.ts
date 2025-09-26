import patientEntries from '../data/patients';
import {
  NonSensitivePatient,
  NewPatient,
  Patient,
  EntryWithoutId,
  Entry,
} from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): NonSensitivePatient[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }),
  );
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
    entries: [],
  };
  patientEntries.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  const patient: Patient | undefined = patientEntries.find(
    (entry) => entry.id == id,
  );
  if (patient) {
    return patient;
  }
  return undefined;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry | undefined => {
  const patient = patientEntries.find((p) => p.id === id);
  if (!patient) {
    return undefined;
  }
  const newEntry = { ...entry, id: uuid() };
  patient.entries.push(newEntry);
  return newEntry;
};

export default { getEntries, addPatient, getPatient, addEntry };
