import React, { Suspense } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import store from "./store";

import "./index.css";

const App = React.lazy(() => import('./App'));


ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={ <CircularProgress color= "secondary"  style={{position: "fixed", top: "50%", left: "50%"}} />}>
    <App />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);
