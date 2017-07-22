import * as React from "react";

export interface Props {
    onPressSpaceKey: () => void;
    onSet: (value: string) => void;
    reveal: boolean;
    tabIndex: number;
    value: any;
}

export class WordField extends React.Component<Props, undefined> {
    public inputRef: HTMLInputElement;

    constructor(props: Props) {
        super(props);

        this.captureSpaceKey = this.captureSpaceKey.bind(this);
    }

    componentDidMount() {
        this.inputRef.focus();
    }

    public captureSpaceKey(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === ' ') {
            this.props.onPressSpaceKey();
        }
    }

    render() {
        return (
            <input
                onChange={event => this.props.onSet(event.target.value)}
                onKeyDown={this.captureSpaceKey}
                placeholder="Empty"
                ref={input => this.inputRef = input}
                style={{textTransform: 'uppercase'}}
                tabIndex={this.props.tabIndex}
                type={this.props.reveal ? 'text' : 'password'}
                value={this.props.value}
            />
        );
    }
}