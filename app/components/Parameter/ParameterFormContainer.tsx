import * as React from 'react'
import { apiUrl } from '../../constants'
import ParameterForm from './ParameterForm'
import axios from 'axios'
import {IEnumValue, IItem} from "../../interface";
import { ChangeEvent } from "react";

interface IParameterFormContainerState {
    name: string;
    type: string;
    identificator: string;
    enumValues: Array<IEnumValue>;
    id?: number;
}

interface IParameterFormContainerProps {
    match: {
        params: {
            id?: number;
        }
    },
    history: any,
}

const defaultState: IParameterFormContainerState = { name: '', 'type': '', enumValues: [] };

export default class ParameterFormContainer extends React.Component<IParameterFormContainerProps, IParameterFormContainerState> {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleIdentificatorChange = this.handleIdentificatorChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleEnumListChange = this.handleEnumListChange.bind(this);

        this.state = defaultState
    }

    handleTitleChange(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({ name: e.currentTarget.value })
    }

    handleIdentificatorChange(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({ identificator: e.currentTarget.value })
    }

    handleTypeChange(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({ type: e.currentTarget.value })
    }

    handleSubmit(): void {
        if (!this.state.id) {
            axios.post(apiUrl.parameter, this.state)
                .then((response) => {
                    this.props.history.push('/parameter');
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            axios.put(`${apiUrl.parameter}/${this.state.id}`, this.state)
                .then((response) => {
                    this.props.history.push('/parameter');
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    handleEnumListChange(items: Array<IItem>): void {
        this.setState({ enumValues: items });
    }

    /**
     * Nastaví defaultní hodnoty do formuláře
     */
    componentDidMount() {
        if (this.props.match.params.id) {
            axios.get(`${apiUrl.parameter}/${this.props.match.params.id}`)
                .then((response) => {
                    this.setState(response.data);
                })
                .catch((error: Error) => {
                    console.log(error);
                })
        } else {
            this.setState(defaultState);
        }
    }

    render() {
        return <ParameterForm
                    handleSubmit={this.handleSubmit}
                    handleTitleChange={this.handleTitleChange}
                    handleIdentificatorChange={this.handleIdentificatorChange}
                    handleTypeChange={this.handleTypeChange}
                    handleEnumListChange={this.handleEnumListChange}       
                    parameter={this.state}
                />
    }
}