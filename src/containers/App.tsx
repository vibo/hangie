import * as React from "react";

import Answer from '../shared/answer.model';
import Word from '../shared/word.model';

import { Configuration } from '../components/Configuration';
import { Game } from '../components/Game';

export interface Props {
}

export interface State {
    answers: Answer[];
    idCount: number;
    isPlaying: boolean;
    words: Word[];
}

export class App extends React.Component<Props, State> {
    public state: State = {
        answers: [],
        idCount: 1,
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
        this.deleteWord = this.deleteWord.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
        this.setWord = this.setWord.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    get canStartGame(): boolean {
        return Boolean(
            this.state
                .words
                .some(word => Boolean(word.value && word.value.length))
        );
    }

    public addWord() {
        this.setState(prevState => {
            const idCount = prevState.idCount + 1;
            const word = new Word(idCount);

            return {
                idCount,
                words: [...prevState.words, word]
            }
        });
    }

    public addWordAfterId(id: number) {
        this.setState(prevState => {
            const index = prevState.words.findIndex(word => word.id === id);
            const idCount = prevState.idCount + 1;
            const words = prevState.words.slice();

            words.splice(index + 1, 0, new Word(idCount));

            return { idCount, words};
        })
    }

    public deleteWord(id: number) {
        this.setState(prevState => {
            return { 
                words: prevState.words.filter(word => word.id !== id)
             };
        })
    }

    public setAnswer(id: number, value: string) {

    }

    public setWord(id: number, value: string) {
        // Remove any whitespaces from input.
        const cleanValue = value.replace(' ', '');
        
        this.setState(prevState => {
            return {
                words: prevState.words
                    .map(word => 
                        word.id !== id || word.value === cleanValue
                            ? word
                            : new Word(id, cleanValue)
                    )
            };
        });
    }

    public startGame() {
        this.setState({isPlaying: true});
    }

    render() {
        const isPlaying = this.state.isPlaying;

        return (
            <div>
                <div className="toolbar shadow-4 text--white md-indigo-500">
                    Hangman
                </div>

                <div 
                    style={{padding: '20px', textAlign: 'center'}}
                >
                    { 
                        this.state.isPlaying
                            ? <Game 
                                answers={this.state.answers}
                                onSetAnswer={this.setAnswer}
                                words={this.state.words}
                            />
                            : (
                                <div>
                                    <div 
                                        className="card card--spaced md-white"
                                        style={{maxWidth: '600px', margin: '0 auto'}}
                                    >
                                        <h2 style={{margin: '0 0 20px'}}>Configuration</h2>

                                        <Configuration 
                                            onAdd={this.addWord}
                                            onAddAfterId={this.addWordAfterId}
                                            onDelete={this.deleteWord}
                                            onSet={this.setWord}
                                            words={this.state.words}
                                        />
                                    </div>

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
            </div>
        );
    }
}