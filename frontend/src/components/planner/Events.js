import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  CardHeader,
} from "@material-ui/core";

export default function Events() {
  // const [checked, setChecked] = React.useState([0]);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  return (
    <Card sx={{minHeight: "400px"}}>
      <CardHeader title="Schedule" sx={{paddingBottom: 0}}/>
      <CardContent>
        <Grid container spacing={1}>
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
              <Card sx={{ backgroundColor: "background.card" }}> 
                  <CardContent sx={{p: 0}}>
                  <CardHeader subheader="8.00 am - 11.00 am" title="Work Block 1" />
                  
                  </CardContent>
              </Card>
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
              <Card sx={{ backgroundColor: "background.card" }}> 
                  <CardContent sx={{p: 0}}>
                  <CardHeader subheader="11.30 am - 2.30 pm" title="Work Block 2" />
                  </CardContent>
              </Card>
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
              <Card sx={{ backgroundColor: "background.card" }}> 
                  <CardContent sx={{p: 0}}>
                  <CardHeader subheader="3.00 pm - 6.00 pm" title="Work Block 3" />
                  </CardContent>
              </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
