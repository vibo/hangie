import * as React from "react";
import './Answers.less'

import Answer from '../shared/answer.model';
import { CharacterField } from './CharacterField';
import FocusedAnswer from '../shared/focused-answer.model';

export interface Props {
    answers: Answer[];
    focusedAnswer: FocusedAnswer;
    onFocusedAnswer: () => void;
    onSetAnswer: (id: number, index: number, value: string) => void;
}

export class Answers extends React.Component<Props, undefined> {
    public fieldIsFocused(answerId: number, letterIndex: number): boolean {
        const inFocus = this.props.focusedAnswer;

        return Boolean(
            inFocus.id === answerId 
            && inFocus.letterIndex === letterIndex
        );
    }

    public fuseTabIndex(id: number, index: number): number {
        return Number("" + id + index);
    }

    public isFirstCharacter(answerIndex: number, letterIndex: number): boolean {
        return answerIndex === 0 && letterIndex === 0;
    }

    render() {
        // TODO: Can we optimise this by stashing?
        const answers = this.props.answers
            .map((answer, answerIndex) =>
                <div
                    className="answers__block"
                    key={answer.id}
                >
                    {
                        answer.letters
                            .map((letter: string, letterIndex: number) =>
                                <div
                                    className="answers__character-field"
                                    key={letterIndex}
                                >
                                    <CharacterField
                                        character={letter}
                                        isFirst={this.isFirstCharacter(answerIndex, letterIndex)}
                                        isFocused={this.fieldIsFocused(answer.id, letterIndex)}
                                        onFocused={this.props.onFocusedAnswer}
                                        onSet={
                                            character => this.props
                                                .onSetAnswer(answer.id, letterIndex, character)
                                        }
                                        tabIndex={this.fuseTabIndex(answer.id, letterIndex)}
                                    />
                                </div>
                            )
                    }
                </div>
            );

        return (
            <div>
                { answers }
            </div>
        );
    }
}