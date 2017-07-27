import * as React from "react";

import './CharacterField.less';

export interface Props {
    character: string;
    isFirst: boolean;
    onSet: (character: string) => void;
    tabIndex: number;
}

export class CharacterField extends React.Component<Props, undefined> {
    public inputRef: HTMLInputElement;

    componentDidMount() {
        if (this.props.isFirst) {
            this.inputRef.focus();
        }
    }

    render() {
        return (
            <input
                className="character-field"
                maxLength={1}
                onChange={event => this.props.onSet(event.target.value)}
                ref={input => this.inputRef = input}
                size={1}
                tabIndex={this.props.tabIndex}
                type="text"
                value={this.props.character}
            />
        );
    }
}