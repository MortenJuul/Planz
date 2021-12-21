import * as React from "react";
import {
  // Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { usePlanStore } from "../../store/planContext";
import { observer, useObserver } from "mobx-react";
import UpdateTask from "./UpdateTask";

const defaultValues = {
  title: "",
  description: "",
  date: moment().format(), //'MM-DD-YYYY'
};
let firstLoad = 0;

export default function Tasks(props) {
  const planStore = usePlanStore();
  if(firstLoad = 0){
    planStore.getTasks();
    console.log("Tksjdnf", planStore.tasks)
    firstLoad = 1
  }
  const [checked, setChecked] = React.useState([1]);
  const [tasks, setTasks] = React.useState();
  const [currentTask, setCurrentTask] = React.useState(defaultValues);
  const [openTask, setOpenTask] = React.useState(false);

  const handleOpen = () => {
    setOpenTask(true);
  }
  const handleClose = () => {
    setOpenTask(false);
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const GenerateTasks = observer(() => {
    if (planStore.tasks) {
      return planStore.tasks.map((task) => {
        const labelId = `checkbox-list-secondary-label-${task.title}`;
        return (
          <ListItem
            key={task._id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(task)}
                checked={checked.indexOf(task) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton onClick={() => {
              setCurrentTask(task);
              // console.log(task)
              handleOpen();
            }}>
              <ListItemText id={labelId} primary={`${task.title}`} />
            </ListItemButton>
          </ListItem>
        );
      });
    } else {
      return <Typography variant="h4">No tasks today... Add tasks to see them here.</Typography>;
    }
  });

  return (
    <Card {...props} style={{ minHeight: 400 }}>
      <Grid>
        <CardHeader title="Tasks" sx={{ paddingBottom: 0 }} />
        <Button />
      </Grid>
      <CardContent>
        <Grid container spacing={3}>
          <Grid
            item
            md={12}
            xs={12}
            style={{ maxHeight: 280, overflow: "auto", paddingBottom: 2 }}
          >
            <List
              //   fullWidth
              dense
              sx={{ width: "100%", bgcolor: "background.paper" }}
            >
              <GenerateTasks />
            </List>
          </Grid>
        </Grid>
        <UpdateTask open={openTask} onClose={handleClose} currentTask={currentTask} />
      </CardContent>
    </Card>
  );
}
