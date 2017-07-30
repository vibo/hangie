import * as React from "react";

import './CharacterField.less';

export interface Props {
    character: string;
    isFirst: boolean;
    onSet: (character: string) => void;
    tabIndex: number;
}

export class CharacterField extends React.Component<Props, undefined> {
    render() {
        return (
            <input
                className="character-field"
                maxLength={1}
                onChange={event => this.props.onSet(event.target.value)}
                size={1}
                tabIndex={this.props.tabIndex}
                type="text"
                value={this.props.character}
            />
        );
    }
}