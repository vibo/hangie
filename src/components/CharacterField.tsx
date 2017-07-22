import * as React from "react";

export interface Props {
    onSet: (value: string) => void;
    tabIndex: number;
    value: any;
}

export class CharacterField extends React.Component<Props, undefined> {
    render() {
        return (
            <input
                onChange={event => this.props.onSet(event.target.value)}
                maxLength={1}
                size={1}
                tabIndex={this.props.tabIndex}
                type="text"
                value={this.props.value}
            />
        );
    }
}