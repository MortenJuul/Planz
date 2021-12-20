import { useEffect, useState } from "react";
// import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import {
  Settings as SettingsIcon,
  User as UserIcon,
} from "react-feather";
import NavItem from "./NavItem";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import AddSpeedDial from "./AddSpeedDial";
import TextField from "@mui/material/TextField";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import moment from "moment";

const items = [
  {
    href: "/",
    icon: CalendarViewDayIcon,
    title: "Planner",
  },
  {
    href: "/account",
    icon: UserIcon,
    title: "Account",
  },
  {
    href: "/settings",
    icon: SettingsIcon,
    title: "Settings",
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile, user, updateDate }) => {
  const [value, setValue] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.image}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          to="/account"
        />
        <Typography color="textPrimary" variant="h5" sx={{py: 1}}>
          {user.firstName}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Member since: {moment(user.createdAt).format('MMM YYYY')}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      {location.pathname == "/" && (
        <Box>
          <Divider />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <StaticDatePicker
              // className="datepicker"
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={value}
              onChange={(newValue) => {
                updateDate(moment(newValue).format());
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      )}
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden xlDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
          <AddSpeedDial />
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
