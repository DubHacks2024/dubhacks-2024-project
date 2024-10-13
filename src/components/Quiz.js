import React, { Component } from "react";
import MultiChoice from "./MultiChoice";

export class Quiz extends Component {
    constructor(props) {
        super(props);
        const quizList = []
        for (let i = 0; i < props.length; i++) {
            quizList.push(JSON.parse(props[i]));
        }
        this.state = {quizList: quizList};
    }

    render = () => {
        return <div>
            <ol>
                {this.quizList.map((cur) => {return MultiChoice(cur)})};
            </ol>
        </div>
    }
}