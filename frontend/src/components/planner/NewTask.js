import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Form } from "formik";
import { TextField, Grid } from "@material-ui/core";
import { useState } from "react";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.default",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const defaultValues = {
  title: "",
  description: "",
  date: moment().format(), //'MM-DD-YYYY'
};

export default function NewTask(props) {
  const [value, setValue] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
      console.log(e)
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formValues);
    let userId = 'test'
    let taskValues = {...formValues, userId: userId}
    axios.post('http://localhost:5000/task/post', taskValues)
        .then(response => console.log(response))
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        {...props}
        // open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
              >
                <Typography variant="h2" sx={{ py: 1 }}>
                  Add New Task
                </Typography>
                <Grid item>
                  <TextField
                    id="title-input"
                    name="title"
                    label="Title"
                    placeholder="Title"
                    value={formValues.title}
                    onChange={handleInputChange}
                    // size="small"
                    // variant="standard"
                    sx={{ my: 2, input: { color: "black" } }}
                    InputLabelProps={{
                      style: { color: "#000" },
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="desc-input"
                    name="description"
                    label="Description"
                    placeholder="Description"
                    multiline
                    // rows={4}
                    value={formValues.desc}
                    onChange={handleInputChange}
                    // size="small"
                    // variant="standard"
                    sx={{ my: 2, input: { color: "black" } }}
                    InputLabelProps={{
                      style: { color: "#000" },
                    }}
                  />
                </Grid>
                <Grid item>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      id="date-input"
                      label="Select date"
                      name="date"
                      value={formValues.Date}
                      onChange={(newDate) => handleInputChange({target: {name: 'date', value: newDate }})}
                      renderInput={(params) => <TextField {...params} />}
                      sx={{ my: 2, input: { color: "black" } }}
                      InputLabelProps={{
                        style: { color: "#000" },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid>
                  <Button variant="outlined" color="error" type="cancel" sx={{m: 1}}>
                    Cancel
                  </Button>
                  <Button variant="outlined" color="success" type="submit" sx={{m: 1}}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}