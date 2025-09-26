import { OccupationalHealthcarecareEntry, Diagnosis } from "../types";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthcareComponent = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcarecareEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div style={{ borderStyle: "solid", marginBottom: "10px", padding: "2px" }}>
      <div>
        {entry.date} {<WorkIcon />}
      </div>
      <div>{entry.description}</div>
      <div>specialist: {entry.specialist}</div>
      <div>employer: {entry.employerName}</div>
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
      {entry.sickLeave ? (
        <div>
          <div>start date: {entry.sickLeave?.startDate}</div>
          <div>end date: {entry.sickLeave?.endDate}</div>
        </div>
      ) : null}
    </div>
  );
};

export default OccupationalHealthcareComponent;
