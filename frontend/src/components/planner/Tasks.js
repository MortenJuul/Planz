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
import axios from "axios";
import moment from "moment";
import { useOutletContext } from "react-router";
import { usePlanStore } from "../../store/planContext";
import { useObserver } from "mobx-react";

export default function Tasks(props) {
  const planStore = usePlanStore();
  // planStore.getTasks();
  const [checked, setChecked] = React.useState([1]);
  const [tasks, setTasks] = React.useState();

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

  const generateTasks = () => {
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
            <ListItemButton>
              <ListItemText id={labelId} primary={`Line item ${task.title}`} />
            </ListItemButton>
          </ListItem>
        );
      });
    } else {
      return <Typography variant="h4">No tasks today... Add tasks to see them here.</Typography>;
    }
  };

  return useObserver(() => (
    <Card {...props} style={{ minHeight: 200 }}>
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
              {generateTasks()}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  ));
}
