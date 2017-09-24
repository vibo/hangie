import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles/app.less';
import App from "./containers/App";

// Quick and dirty
declare const module: any;
declare const require: any

ReactDOM.render(
    <App />,
    document.querySelector('app-entry')
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept("./App", () => {
      const NextApp = require<{default: typeof App}>("./App").default;
      ReactDOM.render(
        <App />,
        document.querySelector('app-entry')
      );
    });
  }