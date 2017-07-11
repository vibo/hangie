import * as React from "react";

export interface Props {
    onSet: (value: string) => any;
    reveal: boolean;
    tabIndex: number;
    word: any;
}

export class WordField extends React.Component<Props, undefined> {
    render() {
        const word = this.props.word;

        return (
            <input
                onChange={event => this.props.onSet(event.target.value)}
                placeholder="Empty"
                tabIndex={this.props.tabIndex}
                type={this.props.reveal ? 'text' : 'password'}
                value={word.value}
            />
        );
    }
}