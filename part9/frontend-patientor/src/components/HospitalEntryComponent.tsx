import { Diagnosis, HospitalEntry } from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntryComponent = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div style={{ borderStyle: "solid", marginBottom: "10px", padding: "2px" }}>
      <div>
        {entry.date} {<LocalHospitalIcon />}
      </div>
      <div>{entry.description}</div>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          return (
            <li key={code}>
              {code}{" "}
              {diagnoses
                .filter((d) => d.code === code)
                .map((d) => (
                  <div key={d.code}>{d.name}</div>
                ))}
            </li>
          );
        })}
      </ul>
      <div>diagnose by {entry.specialist}</div>
      <div>discharge date: {entry.discharge.date}</div>
      <div>discharge criteria: {entry.discharge.criteria}</div>
    </div>
  );
};

export default HospitalEntryComponent;
