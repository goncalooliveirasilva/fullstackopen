import { Diagnosis, Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthCheckComponent from "../HealthCheckComponent";
import HospitalEntryComponent from "../HospitalEntryComponent";
import OccupationalHealthcareComponent from "../OccupationalHealthcareComponent";

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent diagnoses={diagnoses} entry={entry} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareComponent diagnoses={diagnoses} entry={entry} />
      );
    case "HealthCheck":
      return <HealthCheckComponent diagnoses={diagnoses} entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
