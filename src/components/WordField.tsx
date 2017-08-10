import * as React from "react";
import './WordField.less';

export interface Props {
    isFocused: boolean;
    onPressBackspaceKey: () => void;
    onPressSpaceKey: () => void;
    onSet: (value: string) => void;
    showInput: boolean;
    tabIndex: number;
    value: any;
}

export class WordField extends React.Component<Props, undefined> {
    public containerRef: HTMLSpanElement;
    public inputRef: HTMLInputElement;

    constructor(props: Props) {
        super(props);
        this.captureKeys = this.captureKeys.bind(this);
    }

    componentDidMount() {
        // Input should not be rendered automatically
        this.inputRef.focus();
    }

    public captureKeys(event: React.KeyboardEvent<HTMLInputElement>) {
        switch(event.key.toLocaleLowerCase()) {
            case ' ':
                this.props.onPressSpaceKey();
                break;
            case 'backspace':
                this.props.onPressBackspaceKey();
                break;
        }
    }

    public captureSpaceKey(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key !== ' ') return;
        event.preventDefault();
        this.props.onPressSpaceKey();
    }

    render() {
        return (
            <div>
                <input
                    className="word-field"
                    onChange={event => this.props.onSet(event.target.value)}
                    onKeyDown={this.captureKeys}
                    placeholder="..."
                    ref={input => this.inputRef = input}
                    style={{textTransform: 'uppercase'}}
                    tabIndex={this.props.tabIndex}
                    type={this.props.showInput ? 'text' : 'password'}
                    value={this.props.value}
                />
            </div>
        );
    }
}