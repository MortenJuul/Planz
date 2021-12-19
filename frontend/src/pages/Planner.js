import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import Budget from "../components/dashboard/Budget";
import NotesInput from "../components/planner/NotesInput";
import Tasks from "../components/planner/Tasks";
import Routines from "../components/planner/Routines";
import AddSpeedDial from "../components/AddSpeedDial";

const Dashboard = () => (
  <>
    <Helmet>
      <title>Planner | Planz</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {/* FIRST ROW */}
          <Grid item lg={8} sm={6} xl={8} xs={12}>
            <Budget />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Routines />
          </Grid>
          {/* <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            >
            <TasksProgress />
          </Grid> */}

          {/* <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid> */}
          {/* SECOND ROW */}
          <Grid item lg={6} md={12} xl={6} xs={12}>
            <Tasks />
          </Grid>
          <Grid item lg={6} md={12} xl={6} xs={12}>
            <NotesInput sx={{ height: "100%" }} />
          </Grid>
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
            >
            <LatestProducts sx={{ height: '100%' }} />
            </Grid>
          <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
