import * as React from "react";

import Answer from '../shared/answer.model';
import Word from '../shared/word.model';

import { Configuration } from '../components/Configuration';
import { Game } from '../components/Game';

export interface Props {
}

export interface State {
    answers: Answer[];
    letter: string;
    letters: string[],
    incrementor: number;
    isPlaying: boolean;
    words: Word[];
}

export class App extends React.Component<Props, State> {
    public state: State = {
        answers: [],
        letter: '',
        letters: [],
        incrementor: 1,
        isPlaying: false,
        words: [{
            id: 1,
            value: ''
        }]
    };

    constructor(props: Props) {
        super(props);
        this.addWord = this.addWord.bind(this);
        this.addWordAfterId = this.addWordAfterId.bind(this);
        this.addLetter = this.addLetter.bind(this);
        this.deleteWord = this.deleteWord.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
        this.setLetter = this.setLetter.bind(this);
        this.setWord = this.setWord.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    get canStartGame(): boolean {
        return this.state
            .words
            .some(word => Boolean(word.value && word.value.length));
    }

    public addLetter() {
        // Prevent duplicate letters.
        if (this.state.letters.some(letter => letter === this.state.letter)) {
            return;
        }

        this.setState(prevState => {
            return {
                letter: '',
                letters: [...prevState.letters, prevState.letter]
            };
        });
    }

    public addWord() {
        const words = this.state.words;
        // Don't add another word if last one is empty
        if (!words[words.length - 1].value.length) return;

        this.setState(prevState => {
            const incrementor = prevState.incrementor + 1;
            const word = new Word(incrementor);
            return {incrementor, words: [...prevState.words, word]};
        });
    }

    public addWordAfterId(id: number) {
        const index = this.state.words.findIndex(word => word.id === id);

        // Don't add another word if value of word in question is empty.
        if (!this.state.words[index].value.length) return;

        this.setState(prevState => {
            const incrementor = prevState.incrementor + 1;
            const words = prevState.words.slice();
            words.splice(index + 1, 0, new Word(incrementor));
            return {incrementor, words};
        });
    }

    public deleteWord(id: number) {
        this.setState(prevState => {
            return { 
                words: prevState.words.filter(word => word.id !== id)
             };
        });
    }

    public setAnswer(id: number, index: number, value: string) {
        this.setState(prevState => {
            return {
                answers: prevState
                    .answers
                    .map(answer => {
                        if (answer.id !== id) return answer;

                        const letters = answer.letters.slice();
                        letters[index] = value;

                        return Object.assign({}, answer, {letters});
                    })
            };
        });
    }

    public setLetter(letter: string) {
        // Prevent duplicate letters.
        if (~this.state.letters.indexOf(letter)) return;
        this.setState({letter});
    }

    public setWord(id: number, value: string) {
        // Don't allow whitespaces in words.
        const cleanValue = value.replace(' ', '');
        
        // TODO: Prevent setting state if word is identical (spaces)
        this.setState(prevState => {
            return {
                words: prevState.words
                    .map(word => 
                        word.id !== id 
                        || word.value === cleanValue
                            ? word
                            : new Word(id, cleanValue)
                    )
            };
        });
    }

    public startGame() {
        this.setState(prevState => {
            return {
                answers: prevState.words
                    .map((word: Word, index: number) => {
                        return new Answer(
                            index + 1, 
                            [].map.call(word.value, () => ''),
                            word.id
                        );
                    }),
                isPlaying: true
            };
        });
    }

    render() {
        const isPlaying = this.state.isPlaying;

        return (
            <div 
                style={{padding: '20px', textAlign: 'center'}}
            >
                { 
                    this.state.isPlaying
                        ? <Game 
                            answers={this.state.answers}
                            letter={this.state.letter}
                            letters={this.state.letters}
                            onAddLetter={this.addLetter}
                            onSetAnswer={this.setAnswer}
                            onSetLetter={this.setLetter}
                            words={this.state.words}
                        />
                        : (
                            <div>
                                <h1 
                                    className="app-title"
                                >
                                    Hangman
                                </h1>

                                <Configuration 
                                    onAdd={this.addWord}
                                    onAddAfterWord={this.addWordAfterId}
                                    onDelete={this.deleteWord}
                                    onSet={this.setWord}
                                    words={this.state.words}
                                />

                                <button
                                    disabled={!this.canStartGame}
                                    className="button button--raised button--dark md-pink-A400 text--white"
                                    onClick={this.startGame}
                                    style={{marginTop: '24px'}}
                                >
                                    Start game
                                </button>
                            </div>
                        )
                }
            </div>
        );
    }
}