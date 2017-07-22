import * as React from "react";

import { CharacterField } from './CharacterField';

export interface Props {
    words: any[];
}

export class Answer extends React.Component<Props, undefined> {
    render() {
        return (
            <div>
                <input
                    maxLength={1}
                    size={1}
                />
            </div>
        );
    }
}