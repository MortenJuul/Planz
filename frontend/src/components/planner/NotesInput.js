import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

const NotesInput = (props) => {
  const [values, setValues] = useState({
    notes: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card sx={{minHeight: "400px"}}>
        <CardHeader subheader="A place to reflect and remember" title="Notes" />
        {/* <Divider /> */}
        <CardContent>
          <Grid container spacing={3}>
            <Grid
              item
              md={12}
              xs={12}
              style={{ minHeight: 200, maxHeight: 300, overflow: "auto", backgroundColor: "background.card" }}
            >
              <TextField
                fullWidth
                multiline
                minRows={6}
                // helperText="Notes"
                label="Notes"
                name="notes"
                onChange={handleChange}
                value={values.notes}
                variant="outlined"
                // sx={{border: "2px solid white"}}
              />
            </Grid>
          </Grid>
        </CardContent>
        {/* <Divider /> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Save Notes
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default NotesInput;
