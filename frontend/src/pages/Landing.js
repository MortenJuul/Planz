import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Container, Typography, Button, Stack } from "@material-ui/core";
import Logo from "../components/Logo";

const Landing = () => (
  <>
    <Helmet>
      <title>Welcome | Planz</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          Welcome to
        </Typography>
        <Box textAlign="center" marginTop="20px">
          <Logo />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          variant="h3"
          marginTop="30px"
        >
          The One-Page day planner to help you achieve your goals!
        </Typography>
        {/* <Link
          textAlign="center"
          marginTop="20px"
          component={RouterLink}
          to="/register"
          variant="h6"
          underline="hover"
        >
          Sign up
        </Link> */}
        <Stack direction="row" spacing={2} marginTop="30px" justifyContent="center">
          <Button variant="contained" color="secondary" size="large" href="/register">
            Register
          </Button>
          <Button variant="contained" color="primary" size="large" href="/login">
            Login
          </Button>
        </Stack>
      </Container>
    </Box>
  </>
);

export default Landing;
