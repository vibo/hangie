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
        this.addWordAfterId = this.addWordAfterId.bind(this);
        this.deleteWord = this.deleteWord.bind(this);
        this.setWord = this.setWord.bind(this);
    }

    public addWord() {
        this.setState(prevState => {
            const idCount = prevState.idCount + 1;
            const word = {
                id: idCount,
                value: ''
            };

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

            words.splice(index + 1, 0, {
                id: idCount,
                value: ''
            });

            return { idCount, words};
        })
    }

    public setWord(id: number, value: string) {
        this.setState(prevState => {
            return {
                words: prevState.words
                    .map(word => 
                        word.id !== id
                            ? word
                            : { id, value}
                    )
            };
        });
    }

    public deleteWord(id: number) {
        this.setState(prevState => {
            return { 
                words: prevState.words.filter(word => word.id !== id)
             };
        })
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
                            onAdd={this.addWord}
                            onAddAfterId={this.addWordAfterId}
                            onSet={this.setWord}
                            onDelete={this.deleteWord}
                            words={this.state.words}
                        />
                }
            </div>
        );
    }
}