import * as React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  CardHeader,
} from "@material-ui/core";

export default function Routines() {
  const [checked, setChecked] = React.useState([0]);

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

  return (
    <Card sx={{ minHeight: 400 }}>
      <CardHeader title="Routines" sx={{ paddingBottom: 0 }} />
      <CardContent style={{ maxHeight: 340, overflow: "auto", paddingBottom: 2 }}>
        <Grid
          container
          // spacing={1}
        >
          <Grid item sx={{ width: "100%", backgroundColor: "background.card" }}>
            {/* <Typography variant="h3" sx={{ paddingTop: 1, paddingLeft: 1 }}>
              Morning routine
            </Typography> */}
            <Card sx={{ backgroundColor: "background.card" }}> 
                  <CardContent sx={{p: 0}}>
                  <CardHeader sx={{py: 0, paddingTop: 1}} subheader="6.00 am - 7.30 am" title="Morning Routine" />
            <List sx={{ width: "100%", transform: "scale(0.85)", p: 0 }}>
              {["Healthy breakfast", "Exercise", "Meditation"].map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                
                return (
                  <ListItem key={value} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                      divider
                      >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                          />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value + 1}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
              </CardContent>
          </Card>
          </Grid>
          <Grid item sx={{ width: "100%", backgroundColor: "background.card" }}>
            {/* <Typography variant="h3" sx={{ paddingTop: 1, paddingLeft: 1 }}>
              Morning routine
            </Typography> */}
            <Card sx={{ backgroundColor: "background.card" }}> 
                  <CardContent sx={{p: 0}}>
                  <CardHeader sx={{py: 0}} subheader="8.00 pm - 9.30 pm" title="Evening Routine" />
            <List sx={{ width: "100%", transform: "scale(0.85)", p: 0}}>
              {["Plan tomorrow", "Read a book"].map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                
                return (
                  <ListItem key={value} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                      divider
                      >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                          />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
              </CardContent>
          </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
