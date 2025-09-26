import { Box, Grid, TextField, Alert, Typography, Button } from "@mui/material";
import { Entry } from "../../types";
import { useState } from "react";
import patientService from "../../services/patients";
import axios from "axios";

interface Props {
  patientId: string;
  onEntryAdded: (entry: Entry) => void;
}

const NewEntryForm = ({ patientId, onEntryAdded }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("0");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await patientService.addEntry(patientId, {
        type: "HealthCheck",
        description,
        date,
        specialist,
        healthCheckRating: Number(healthCheckRating),
        diagnosisCodes: diagnosisCodes
          .split(",")
          .map((code) => code.trim())
          .filter(Boolean),
      });
      onEntryAdded(response);
      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthCheckRating("0");
      setDiagnosisCodes("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        // console.log(err);
        setError(err.response.data.error[0].message || "Invalid Input");
      }
    }
  };

  const onCancel = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("0");
    setDiagnosisCodes("");
  };

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2, mt: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Add Health Check Entry
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
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
            type="number"
            fullWidth
            label="Health Check Rating (0–3)"
            inputProps={{ min: 0, max: 3 }}
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(e.target.value)}
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
