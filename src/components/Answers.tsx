import * as React from "react";
import './Answers.less'
import Answer from '../shared/answer.model';
import { CharacterField } from './CharacterField';

export interface Props {
    answers: Answer[];
    onSetAnswer: (id: number, index: number, value: string) => void;
}

export class Answers extends React.Component<Props, undefined> {
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
                    key={answer.id}
                    style={{display: 'inline-block', marginRight: '10px'}}
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