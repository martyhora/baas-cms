import * as React from 'react'
import { apiUrl } from '../../constants'
import SectionForm from './SectionForm'
import axios from 'axios'
import {IParameter} from "../../interface";
import {ChangeEvent} from "react";

interface ISectionFormContainerState {
    name: string;
    parameters: Array<IParameter>;
    id?: number;
}

interface ISectionFormContainerProps {
    match: {
        params: {
            id?: number;
        }
    },
    history: any,
}

const defaultState: ISectionFormContainerState = { name: '', parameters: [] };

export default class SectionFormContainer extends React.Component<ISectionFormContainerProps, ISectionFormContainerState> {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleParameterChange = this.handleParameterChange.bind(this);

        this.state = defaultState;
    }

    handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ name: e.currentTarget.value });
    }

    handleParameterChange(parameterIndex: number) {
        let parameters = this.state.parameters;

        parameters[parameterIndex].checked = !parameters[parameterIndex].checked;

        this.setState({ parameters: parameters });
    }

    handleSubmit() {
       if (!this.state.id) {
            axios.post(apiUrl.section, this.state)
                .then((response) => {
                    this.props.history.push('/section');
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            axios.put(`${apiUrl.section}/${this.state.id}`, this.state)
                .then((response) => {
                    this.props.history.push('/section');
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    /**
     * Nastaví defaultní hodnoty do formuláře
     */
    componentDidMount() {
        if (this.props.match.params.id) {
            axios.get(`${apiUrl.section}/${this.props.match.params.id}`)
                .then((response) => {
                    axios.get(`${apiUrl.parameter}`)
                        .then((parameterResponse) => {
                            let newState = response.data;

                            newState.parameters = parameterResponse.data.map((parameter: IParameter) => {
                                parameter.checked = JSON.parse(response.data.params).indexOf(parameter.id) > -1

                                return parameter
                            });

                            this.setState(newState)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            axios.get(`${apiUrl.parameter}`)
                .then((response) => {
                    defaultState.parameters = response.data.map((parameter: IParameter) => {
                        parameter.checked = false;

                        return parameter
                    });

                    this.setState(defaultState);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    render() {
        return <SectionForm
                    handleSubmit={this.handleSubmit}
                    handleTitleChange={this.handleTitleChange}
                    handleParameterChange={this.handleParameterChange}
                    section={this.state}
                />
    }
}