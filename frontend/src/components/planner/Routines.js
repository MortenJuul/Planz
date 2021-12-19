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
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid
          container
          // spacing={3}
        >
            <Grid item sx={{ width: "100%", backgroundColor: 'background.card'}}>
            <Typography variant="h3" sx={{paddingTop: 1, paddingLeft: 1}} >Morning routine</Typography>
            <List
              sx={{ width: "100%", transform: "scale(0.85)" }}
            >
              {[0, 1, 2, 3].map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value}
                    // secondaryAction={
                    //   <IconButton edge="end" aria-label="comments">
                    //     <CommentIcon />
                    //   </IconButton>
                    // }
                    disablePadding
                  >
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
