import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PlanProvider } from "./store/planContext";

ReactDOM.render(
  <BrowserRouter>
    <PlanProvider>
      <App />
    </PlanProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
