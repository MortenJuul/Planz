import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import moment from "moment";
import { useOutletContext } from "react-router";

export default function Tasks(props) {
  const [checked, setChecked] = React.useState([1]);
  let selectedDate = useOutletContext();
  console.log(selectedDate)

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

  const getTasks = async () => {
    let userId = 'test'
    axios.get('http://localhost:5000/task', { params: {userId: userId, date: moment(selectedDate).startOf('day').toDate()}}) //, date: {$gte: moment().startOf('day').format(), $lte: moment().endOf('day').format()}}
      .then((res) => console.log(res))
  }
  getTasks()

  return (
    <Card {...props} style={{ minHeight: 200 }}>
      <Grid>
      <CardHeader title="Tasks" sx={{ paddingBottom: 0}} />
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
              {[ 1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(value)}
                        checked={checked.indexOf(value) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText
                        id={labelId}
                        primary={`Line item ${value + 1}`}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
