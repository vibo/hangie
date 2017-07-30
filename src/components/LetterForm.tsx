import * as React from "react";

export interface Props {
    letter: string;
    letters: string[];
    onEnter: () => void; 
    onSet: (letter: string) => void;
}

interface State {
    showDuplicateLetterWarning: boolean;
}

export class LetterForm extends React.Component<Props, State> {
    public inputRef: HTMLInputElement;
    public state: State = {
        showDuplicateLetterWarning: false
    };

    public componentDidMount() {
        if (this.inputRef) {
            this.inputRef.focus();
        }
    }

    public setLetter(letter: string) {
        // Prevent duplicated letters.
        const isDuplicate: boolean = Boolean(~this.props.letters.indexOf(letter));

        if (!isDuplicate) {
            this.props.onSet(letter);
        }
        
        this.toggleDuplicateLetterWarning(isDuplicate);
    }

    public toggleDuplicateLetterWarning(state: boolean) {
        this.setState(prevState => {
            return {
                showDuplicateLetterWarning: typeof state === "undefined"
                    ? !prevState.showDuplicateLetterWarning
                    : state
            };
        });
    }

    render() {
        return (
            <div>
                <div>
                    <input
                        maxLength={1}
                        onChange={event => this.setLetter(event.target.value)}
                        onKeyPress={event => event.key === 'Enter' && this.props.onEnter()}
                        ref={input => this.inputRef = input}
                        size={1}
                        style={{textAlign: 'center', textTransform: 'uppercase'}}
                        value={this.props.letter}
                    />

                    <button
                        onClick={this.props.onEnter}
                    >
                        Enter
                    </button>
                </div>

                { 
                    this.state.showDuplicateLetterWarning
                        && <div
                            style={{color: 'red'}}
                        >
                            Letter already exists!
                        </div>
                }
            </div>
        );
    }
}