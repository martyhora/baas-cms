import * as React from 'react'
import { apiUrl } from '../../constants'
import SectionList from './SectionList'
import axios, {AxiosResponse} from 'axios'
import {ISectionCollection} from "../../interface";

export default class ParameterListContainer extends React.Component<{}, ISectionCollection> {
    constructor() {
        super();

        this.state = { sections: [] }
    }

    componentDidMount() {
        axios.get(apiUrl.section)
            .then((response: AxiosResponse) => {
                this.setState({ sections: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return <SectionList sections={this.state.sections}/>
    }
}