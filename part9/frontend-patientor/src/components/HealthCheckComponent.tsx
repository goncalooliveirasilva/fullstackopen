import { Diagnosis, HealthCheckEntry } from "../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getHeartColor } from "../utils";

const HealthCheckComponent = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div style={{ borderStyle: "solid", marginBottom: "10px", padding: "2px" }}>
      <div>
        {entry.date} {<MedicalServicesIcon />}
      </div>
      <div>{entry.description}</div>
      {<FavoriteIcon htmlColor={getHeartColor(entry.healthCheckRating)} />}
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
    </div>
  );
};

export default HealthCheckComponent;
