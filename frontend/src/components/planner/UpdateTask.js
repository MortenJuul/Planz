import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, Grid } from "@material-ui/core";
import { useState } from "react";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import { usePlanStore } from "../../store/planContext";
import { runInAction } from "mobx";

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

export default function UpdateTask(props) {
  // const [value, setValue] = useState(false);
  const [formValues, setFormValues] = useState(props.currentTask);
  const planStore = usePlanStore();
  // setFormValues(props.currentTask)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let taskValues = { ...formValues };
    runInAction(() => planStore.updateTask(taskValues))
  };
  const reset = () => {
    setFormValues(defaultValues);
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
                    // placeholder={formValues.title}
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
                    // placeholder={formValues.description}
                    multiline
                    // rows={4}
                    value={formValues.description}
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
                      value={formValues.date}
                      onChange={(newDate) =>
                        handleInputChange({
                          target: { name: "date", value: newDate },
                        })
                      }
                      sx={{ my: 2, input: { color: "black" } }}
                      InputLabelProps={{
                        style: { color: "#000" },
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid>
                  <Button
                    variant="outlined"
                    color="error"
                    type="reset"
                    value="Reset"
                    sx={{ m: 1 }}
                    onClick={() => {
                      planStore.deleteTask(props.currentTask)
                      props.onClose()
                      reset()
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    type="submit"
                    sx={{ m: 1 }}
                    onClick={() => {
                      props.onClose()
                      reset()
                    }}
                  >
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
