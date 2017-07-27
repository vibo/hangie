import * as React from "react";

export interface Props {
    letters: string[];
}

export class Letters extends React.Component<Props, undefined> {
    render() {
        return (
            <div>
                {
                    this.props.letters
                        .map((letter: string, index: number) => 
                            <span
                                key={index}
                                style={{textTransform: 'uppercase'}}
                            >
                                { letter }
                            </span>
                        )
                }
            </div>
        );
    }
}