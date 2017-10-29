import * as React from 'react';
import { apiUrl } from '../../constants';
import ParameterList from './ParameterList';
import axios, { AxiosResponse } from 'axios';
import { IParameterBasicCollection } from '../../interface';
import { AppState } from '../../reducers/index';
import { connect } from 'react-redux';

interface ParameterListContainerProps {
  authToken: string;
}

class ParameterListContainer extends React.Component<
  ParameterListContainerProps,
  IParameterBasicCollection
> {
  constructor(props: ParameterListContainerProps) {
    super(props);

    this.state = {
      parameters: [],
    };

    axios.defaults.headers.common['Authorization'] = `Bearer ${props.authToken}`;
  }

  componentDidMount() {
    axios
      .get(apiUrl.parameter)
      .then((response: AxiosResponse) => {
        this.setState({ parameters: response.data });
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  render() {
    return <ParameterList parameters={this.state.parameters} />;
  }
}

export default connect((state: AppState) => ({
  authToken: state.auth.authToken,
}))(ParameterListContainer);
