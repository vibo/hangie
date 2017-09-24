import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles/app.less';
import { App } from "./containers/App";

const root = document.querySelector('app-entry');

ReactDOM.render(
    <App />,
    root
);

// Hot module replacements
if (module.hot) {
    module.hot.accept("./containers/App", () => {
        const NextApp = require<{default: typeof App}>("./containers/App").default;
        ReactDOM.render(
            <NextApp />,
            root
        );
    });
}