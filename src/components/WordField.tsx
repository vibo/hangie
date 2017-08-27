import * as React from "react";
import './WordField.less';

export interface Props {
    isFocused: boolean;
    onFocused: () => void;
    onPressBackspaceKey: () => void;
    onPressSpaceKey: () => void;
    onSet: (value: string) => void;
    showInput: boolean;
    tabIndex: number;
    value: any;
}

export class WordField extends React.Component<Props, undefined> {
    public inputRef: HTMLInputElement;

    private focusTimeout: number;

    constructor(props: Props) {
        super(props);
        this.captureKeys = this.captureKeys.bind(this);
    }

    componentDidMount() {
        this.focus();
    }

    componentDidUpdate() {
        if (this.props.isFocused) {
            this.focusTimeout = window.setTimeout(() => {
                this.focus();
                this.props.onFocused();
            });
        }
    }

    componentWillUnmount() {
        if (typeof this.focusTimeout === 'number') {
            window.clearInterval(this.focusTimeout);
        }
    }

    private focus() {
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

    public deselectText() {
        this.inputRef.selectionStart = this.inputRef.selectionEnd;
    }

    render() {
        return (
            <div>
                <input
                    className="word-field"
                    onChange={event => this.props.onSet(event.target.value)}
                    onFocus={event => this.deselectText()}
                    onKeyDown={this.captureKeys}
                    ref={input => this.inputRef = input}
                    spellCheck={false}
                    style={{textTransform: 'uppercase'}}
                    tabIndex={this.props.tabIndex}
                    type={this.props.showInput ? 'text' : 'password'}
                    value={this.props.value}
                />
            </div>
        );
    }
}