import * as React from "react";
import { Configuration } from '../components/Configuration';
import { Game } from '../components/Game';

export interface Props {
}

export interface State {
    idCount: number;
    isPlaying: boolean;
    words: any[];
}

export class App extends React.Component<Props, State> {
    public state = {
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
        this.deleteWord = this.deleteWord.bind(this);
        this.setWord = this.setWord.bind(this);
    }

    public addWord() {
        this.setState(prevState => {
            const newCount = prevState.idCount + 1;

            const word = {
                id: newCount,
                value: ''
            };

            return {
                idCount: newCount,
                words: [...prevState.words, word]
            }
        });
    }

    public deleteWord(id: number) {
        this.setState(prevState => {
            return { 
                words: prevState.words.filter(word => word.id !== id)
             };
        })
    }

    public setWord(id: number, value: string) {
        this.setState(prevState => {
            return {
                words: Object.assign(prevState.words, { [id]: value })
            };
        });
    }

    render() {
        const isPlaying = this.state.isPlaying;

        return (
            <div>
                <h1>Hangman the Game</h1>
                { 
                    this.state.isPlaying
                        ? <Game />
                        : <Configuration 
                            words={this.state.words}
                            onAdd={this.addWord}
                            onDelete={this.deleteWord}
                            onSet={this.setWord}
                        />
                }
            </div>
        );
    }
}