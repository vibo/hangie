import * as React from "react";

import './CharacterField.less';

export interface Props {
    character: string;
    isFirst: boolean;
    isFocused: boolean;
    onFocused: () => void;
    onSet: (character: string) => void;
    tabIndex: number;
}

// TODO: Functionality is a replication of WordField, can they share?
export class CharacterField extends React.Component<Props, undefined> {
    public inputRef: HTMLInputElement;

    private focusTimeout: number;

    componentDidUpdate() {
        if (this.props.isFocused) {
            this.focusTimeout = window.setTimeout(() => {
                this.inputRef.focus();
                this.props.onFocused();
            });
        }
    }

    componentWillUnmount() {
        if (typeof this.focusTimeout === 'number') {
            window.clearInterval(this.focusTimeout);
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