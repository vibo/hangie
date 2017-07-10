import * as React from "react";

import { WordField } from './WordField';

export interface Props {
    words: any;
    onAdd: () => any;
    onDelete: (id: number) => any;
    onSet: (id: number, value: string) => any;
}

export class Configuration extends React.Component<Props, undefined> {
    public onSet: (id: number, value: string) => any;

    constructor(props: Props) {
        super(props);

        this.onAdd = this.onAdd.bind(this);
        this.onSet = this.props.onSet.bind(this);
    }

    public onAdd(event: any) {
        event.preventDefault();
        this.props.onAdd();
    }

    render() {
        const words = this.props.words
            .map((word: any) => <WordField key={word.id} word={word} />)

        return (
            <form>
                <h2>Configuration</h2>

                <div className="form__component">
                    { words }
                </div>

                <button
                    onClick={this.onAdd}
                >
                    Add word
                </button>
            </form>
        );
    }
}