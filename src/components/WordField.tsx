import * as React from "react";

export interface Props {
    onSet: (value: string) => any;
    word: any;
}

export class WordField extends React.Component<Props, undefined> {
    render() {
        const word = this.props.word;

        return (
            <input
                onChange={this.props.onSet.bind(this)}
                type="password"
                value={word.value}
            />
        );
    }
}