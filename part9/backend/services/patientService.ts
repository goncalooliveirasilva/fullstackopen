import patientEntries from '../data/patients';
import { NonSensitivePatient, NewPatient, Patient } from '../types';
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
    return { ...patient, entries: [] };
  }
  return undefined;
};

export default { getEntries, addPatient, getPatient };
