import * as React from "react";

import Word from '../shared/word.model';

import { Answer } from './Answer';
import { Letters } from './Letters';
import { LetterInput } from './LetterInput';

export interface Props {
    letters: string[];
    words: Word[];
}

export class Game extends React.Component<Props, undefined> {
    render() {
        return (
            <div>
                <canvas>
                </canvas>

                <Answer
                    words={this.props.words}
                />

                <Letters
                    letters={this.props.letters}
                />

                <LetterInput
                    letters={this.props.letters}
                />
            </div>
        );
    }
}