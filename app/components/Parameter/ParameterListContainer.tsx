import * as React from 'react'
import { apiUrl } from '../../constants'
import ParameterList from './ParameterList'
import axios, {AxiosResponse} from 'axios'
import { IParameterBasicCollection } from '../../interface'

export default class ParameterListContainer extends React.Component<{}, IParameterBasicCollection> {
    constructor() {
        super();

        this.state = {
            parameters: []
        }
    }

    componentDidMount() {
        axios.get(apiUrl.parameter)
            .then((response: AxiosResponse) => {
                this.setState({ parameters: response.data })
            })
            .catch((error: Error) => {
                console.log(error);
            })
    }

    render() {
        return <ParameterList parameters={this.state.parameters}/>
    }
}