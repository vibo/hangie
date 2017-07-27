import * as React from "react";

import Word from '../shared/word.model';
import Answer from '../shared/answer.model';

import { Answers } from './Answers';
import { Letters } from './Letters';
import { LetterForm } from './LetterForm';

export interface Props {
    answers: Answer[];
    letter: string;
    letters: string[];
    onAddLetter: () => void;
    onSetAnswer: (id: number, index: number, value: string) => void;
    onSetLetter: (letter: string) => void;
    words: Word[];
}

export interface State {
}

export class Game extends React.Component<Props, State> {
    public state: State = {
        
    };

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                <canvas>
                </canvas>

                <Answers
                    answers={this.props.answers}
                    onSetAnswer={this.props.onSetAnswer}
                />

                <Letters
                    letters={this.props.letters}
                />

                <LetterForm
                    letter={this.props.letter}
                    letters={this.props.letters}
                    onEnter={this.props.onAddLetter}
                    onSet={this.props.onSetLetter}
                />
            </div>
        );
    }
}