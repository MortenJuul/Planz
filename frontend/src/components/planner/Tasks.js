import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  useTheme,
  colors,
} from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";

export default function Tasks(props) {
  const [checked, setChecked] = React.useState([1]);

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
    <Card {...props}>
      <Grid>
      <CardHeader subheader="A One at a time now..." title="Tasks" />
      <Button />
      </Grid>
      <CardContent>
        <Grid container spacing={3}>
          <Grid
            item
            md={12}
            xs={12}
            style={{ minHeight: 200, maxHeight: 300, overflow: "auto" }}
          >
            <List
              //   fullWidth
              dense
              sx={{ width: "100%", bgcolor: "background.paper" }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
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
                      {/* <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${value + 1}`}
                          src={`/static/images/avatar/${value + 1}.jpg`}
                        />
                      </ListItemAvatar> */}
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
