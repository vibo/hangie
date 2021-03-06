import * as React from "react";
import './Configuration.less';
import Word from '../shared/word.model';
import { WordField } from './WordField';

export interface Props {
    focusedWord: number;
    onAdd: () => void;
    onAddAfterWord: (id: number) => void;
    onDelete: (id: number) => void;
    onFocusedWord: () => void;
    onSet: (id: number, value: string) => void;
    words: Word[];
}

interface State {
    showInput: boolean;
}

export class Configuration extends React.Component<Props, State> {
    public state: State = {
        showInput: false
    };

    constructor(props: Props) {
        super(props);
        this.toggleShowInput = this.toggleShowInput.bind(this);
    }

    public toggleShowInput(state?: boolean) {
        this.setState(prevState => {
            return {
                showInput: typeof state === "boolean"
                    ? state 
                    : !prevState.showInput
            };
        });
    }

    render() {
        const words = this.props.words
            .map((word: Word, index: number) => 
                <div
                    className="configuration__word-field"
                    key={word.id}
                >
                    <WordField 
                        isFocused={this.props.focusedWord === word.id}
                        onFocused={() => this.props.onFocusedWord()}
                        onPressBackspaceKey={() => 
                            word.id > 1 
                            && !word.value 
                            && this.props.onDelete(word.id)
                        }
                        onPressSpaceKey={() => this.props.onAddAfterWord(word.id)}
                        onSet={value => this.props.onSet(word.id, value)}
                        showInput={this.state.showInput}
                        tabIndex={index + 1}
                        value={word.value}
                    />
                </div>
            );

        return (
            <form
                onSubmit={event => event.preventDefault()}
            >
                <div className="configuration__words">
                    { words }
                </div>

                <div className="configuration__controls">
                    <button
                        className="button button--raised"
                        onClick={() => this.props.onAdd()}
                        type="button"
                    >
                        Add word
                    </button>

                    <button
                        className="button button--raised"
                        onClick={event => { event.preventDefault(); this.toggleShowInput(); }}
                        type="button"
                    >
                        {this.state.showInput ? 'Hide input' : 'Show input'}
                    </button>    
                </div>
            </form>
        );
    }
}