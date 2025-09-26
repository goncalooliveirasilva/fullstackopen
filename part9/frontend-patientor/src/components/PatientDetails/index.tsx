import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import { Container, Divider } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const PatientDetails = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>
        {patient.name}{" "}
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h1>
      <Divider hidden />
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Divider hidden />
      <h3>entries</h3>
      {patient.entries.map((entry) => {
        return (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code}{" "}
                  {diagnoses.filter((d) => d.code === code).map((d) => d.name)}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </Container>
  );
};

export default PatientDetails;
