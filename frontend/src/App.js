import "react-perfect-scrollbar/dist/css/styles.css";
import { useRoutes, Link, Route, useNavigate } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@material-ui/core";
import GlobalStyles from "./components/GlobalStyles";
import theme from "./theme";
import routes from "./routes";
// import axios from "axios";
import { useEffect, useState } from "react";
import { usePlanStore } from "./store/planContext";
// import { useObserver } from "mobx-react";
// import { runInAction } from "mobx";
// import { toJS } from "mobx";

const App = () => {
  let [user, setUser] = useState(null);
  const planStore = usePlanStore();

  useEffect(() => {
    const fetchAuthUser =  () => {
       planStore.ssetUser()
    }
    //   const response = await axios
    //     .get("http://localhost:5000/auth/login/success", {
    //       withCredentials: true,
    //     })
    //     .catch((err) => {
    //       console.log("Not properly authenticated");
    //     });

    //   if (response && response.data) {
    //     return response.data
    //     // setUser(response.data);
    //     // planStore.setUser(toJS(response.data))
    //     // console.log("User: ", planStore.user);
    //   }
    // };
    fetchAuthUser();
    // console.log(planStore.user)
  }, []);

  const content = useRoutes(routes(planStore.user));

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
