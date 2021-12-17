import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes, Link, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import axios from "axios";

import { useEffect, useState } from "react";

const App = () => {
  let [user, setUser] = useState(null);

  useEffect(() => {
  const fetchAuthUser = async () => {
    const response = await axios
      .get("http://localhost:5000/auth/login/success", { withCredentials: true })
      .catch((err) => {
        console.log("Not properly authenticated");
      });

    if (response && response.data) {
      setUser(response.data)
      // console.log("User: ", response.data);
    }
  };

  //   const getUser = () => {
  //     fetch("http://localhost:5000/auth/login/success", {
  //       method: "GET",
  //       // mode: "cors",
  //       credentials: 'include',
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       // redirect: 'follow',
  //     })
  //       .then((response) => {
  //         if (response.status === 200) return response.json();
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         console.log(resObject.data)
  //         setUser(resObject.user);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getUser();
    fetchAuthUser();
  }, []);

  const content = useRoutes(routes(user));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {content}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
