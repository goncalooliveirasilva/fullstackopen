import {
  Box,
  Grid,
  TextField,
  Alert,
  Typography,
  Button,
  MenuItem,
} from "@mui/material";
import { Entry, EntryWithoutId } from "../../types";
import { useState } from "react";
import patientService from "../../services/patients";
import axios from "axios";

interface Props {
  patientId: string;
  onEntryAdded: (entry: Entry) => void;
}

const entryTypes = [
  "HealthCheck",
  "Hospital",
  "OccupationalHealthcare",
] as const;

const NewEntryForm = ({ patientId, onEntryAdded }: Props) => {
  const [type, setType] = useState<(typeof entryTypes)[number]>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("0");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    // Build entry object based on type
    let newEntry: EntryWithoutId;

    try {
      if (type === "HealthCheck") {
        newEntry = {
          type,
          description,
          date,
          specialist,
          healthCheckRating: Number(healthCheckRating),
          diagnosisCodes: diagnosisCodes
            .split(",")
            .map((code) => code.trim())
            .filter(Boolean),
        };
      } else if (type === "Hospital") {
        newEntry = {
          type,
          description,
          date,
          specialist,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
          diagnosisCodes: diagnosisCodes
            .split(",")
            .map((code) => code.trim())
            .filter(Boolean),
        };
      } else {
        // OccupationalHealthcare
        newEntry = {
          type,
          description,
          date,
          specialist,
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
          diagnosisCodes: diagnosisCodes
            .split(",")
            .map((code) => code.trim())
            .filter(Boolean),
        };
      }

      const response = await patientService.addEntry(patientId, newEntry);
      onEntryAdded(response);
      onCancel();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        // console.log(err);
        setError(err.response.data.error[0].message || "Invalid Input");
      }
    }
  };

  const onCancel = () => {
    setType("HealthCheck");
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("0");
    setDiagnosisCodes("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
    setDischargeDate("");
    setDischargeCriteria("");
    setError(null);
  };

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2, mt: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Add Entry
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            label="Type"
            value={type}
            onChange={(e) =>
              setType(e.target.value as (typeof entryTypes)[number])
            }
            fullWidth
          >
            {entryTypes.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="date"
            fullWidth
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Specialist"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Diagnosis Codes (comma separated)"
            value={diagnosisCodes}
            onChange={(e) => setDiagnosisCodes(e.target.value)}
          />
        </Grid>

        {type === "HealthCheck" && (
          <Grid item xs={12}>
            <TextField
              type="number"
              fullWidth
              label="Health Check Rating (0–3)"
              inputProps={{ min: 0, max: 3 }}
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(e.target.value)}
            />
          </Grid>
        )}

        {type === "Hospital" && (
          <>
            <Grid item xs={6}>
              <TextField
                type="date"
                fullWidth
                label="Discharge Date"
                InputLabelProps={{ shrink: true }}
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Discharge Criteria"
                value={dischargeCriteria}
                onChange={(e) => setDischargeCriteria(e.target.value)}
              />
            </Grid>
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employer Name"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                fullWidth
                label="Sick Leave Start"
                InputLabelProps={{ shrink: true }}
                value={sickLeaveStart}
                onChange={(e) => setSickLeaveStart(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                fullWidth
                label="Sick Leave End"
                InputLabelProps={{ shrink: true }}
                value={sickLeaveEnd}
                onChange={(e) => setSickLeaveEnd(e.target.value)}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <Button variant="contained" color="error" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewEntryForm;
