import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EventIcon from "@mui/icons-material/Event";
import TaskIcon from "@mui/icons-material/Task";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import NewTask from "./planner/NewTask";
import NewEvent from "./planner/NewEvent";
import NewRoutine from "./planner/NewRoutine";
import { useState } from 'react'

const actions = [
  { icon: <TaskIcon />, name: "New Task" },
  { icon: <EventIcon />, name: "New Event" },
  { icon: <ChangeCircleIcon />, name: "New Routine" },
];

export default function AddSpeedDial() {
  const [openTask, setOpenTask] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [openRoutine, setOpenRoutine] = useState(false);

  const handleOpen = (i) => {
    if (i == "New Task"){
        setOpenTask(true);
    } else if (i == "New Event"){
        setOpenEvent(true);
    } else if (i == "New Routine"){
        setOpenRoutine(true);
    }
  };

  const handleClose = () => {
    setOpenTask(false);
    setOpenEvent(false);
    setOpenRoutine(false);
  };
  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "fixed", bottom: 16, left: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleOpen(action.name)}
          />
        ))}
      </SpeedDial>
      <NewTask open={openTask} onClose={handleClose} />
      <NewEvent open={openEvent} onClose={handleClose} />
      <NewRoutine open={openRoutine} onClose={handleClose} />
    </Box>
  );
}
