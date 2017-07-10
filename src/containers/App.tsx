import * as React from "react";

export interface Props { compiler: string; framework: string; }

export class App extends React.Component<Props, undefined> {
    render() {
        return (
            <div>
                <h1>Hang is the man</h1>

            </div>
        );
    }
}