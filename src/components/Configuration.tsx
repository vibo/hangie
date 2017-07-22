import * as React from "react";

import { WordField } from './WordField';

export interface Props {
    words: any;
    onAdd: () => void;
    onAddAfterId: (id: number) => void;
    onDelete: (id: number) => void;
    onSet: (id: number, value: string) => void;
}

interface State {
    reveal: boolean;
}

export class Configuration extends React.Component<Props, State> {
    public state: State = {
        reveal: false
    };

    constructor(props: Props) {
        super(props);

        this.toggleReveal = this.toggleReveal.bind(this);
    }

    public toggleReveal(state?: boolean) {
        this.setState(prevState => {
            return {
                reveal: typeof state === "boolean"
                    ? state 
                    : !prevState.reveal
            };
        })
    }

    render() {
        const words = this.props.words
            .map((word: any, index: number) => 
                <div
                    key={word.id} 
                    style={{display: 'inline'}}
                >
                    <WordField 
                        onPressSpaceKey={() => this.props.onAddAfterId(word.id)}
                        onSet={value => this.props.onSet(word.id, value)}
                        reveal={this.state.reveal}
                        tabIndex={index + 1}
                        value={word.value}
                    />

                    {
                        word !== this.props.words[0] &&
                            <button
                                onClick={event => { event.preventDefault(); this.props.onDelete(word.id); }}
                                tabIndex={0}
                            >
                                x
                            </button>
                    }
                </div>
            );

        return (
            <form
                onSubmit={event => event.preventDefault()}
            >
                <div className="form__component">
                    { words }
                </div>

                <div className="form__component">
                    <button
                        onClick={() => this.props.onAdd()}
                        className="button button--raised"
                    >
                        Add word
                    </button>

                    <button
                        onClick={event => { event.preventDefault(); this.toggleReveal(); }}
                        className="button button--raised"
                    >
                        {this.state.reveal ? 'Hide input' : 'Show input'}
                    </button>    
                </div>
            </form>
        );
    }
}