import * as React from 'react';
import { apiUrl } from '../../constants';
import ParameterForm from './ParameterForm';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { IEnumValue, IItem } from '../../interface';
import { ChangeEvent } from 'react';
import { AppState } from '../../reducers/index';
import { connect } from 'react-redux';

interface IParameterFormContainerState {
  name: string;
  type: string;
  identificator: string;
  enumValues: Array<IEnumValue>;
  errors: Array<string>;
  id?: number;
}

interface IParameterFormContainerProps {
  match: {
    params: {
      id?: number;
    };
  };
  history: any;
  authToken: string;
}

const defaultState: IParameterFormContainerState = {
  name: '',
  type: '',
  identificator: '',
  enumValues: [],
  errors: [],
};

class ParameterFormContainer extends React.Component<
  IParameterFormContainerProps,
  IParameterFormContainerState
> {
  constructor(props: IParameterFormContainerProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleIdentificatorChange = this.handleIdentificatorChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleEnumListChange = this.handleEnumListChange.bind(this);

    this.state = defaultState;

    axios.defaults.headers.common['Authorization'] = `Bearer ${props.authToken}`;
  }

  handleTitleChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ name: e.currentTarget.value });
  }

  handleIdentificatorChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ identificator: e.currentTarget.value });
  }

  handleTypeChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ type: e.currentTarget.value });
  }

  handleSubmit(): void {
    let promise: AxiosPromise;

    if (!this.state.id) {
      promise = axios.post(apiUrl.parameter, this.state);
    } else {
      promise = axios.put(`${apiUrl.parameter}/${this.state.id}`, this.state);
    }

    promise
      .then((response: AxiosResponse) => {
        if (response.data.success) {
          this.props.history.push('/');
        } else {
          this.setState({ errors: response.data.errors });
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  handleEnumListChange(items: Array<IItem>): void {
    this.setState({ enumValues: items });
  }

  /**
     * Nastaví defaultní hodnoty do formuláře
     */
  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .get(`${apiUrl.parameter}/${this.props.match.params.id}`)
        .then((response: AxiosResponse) => {
          this.setState(response.data);
        })
        .catch((error: Error) => {
          console.log(error);
        });
    } else {
      this.setState(defaultState);
    }
  }

  render() {
    return (
      <ParameterForm
        handleSubmit={this.handleSubmit}
        handleTitleChange={this.handleTitleChange}
        handleIdentificatorChange={this.handleIdentificatorChange}
        handleTypeChange={this.handleTypeChange}
        handleEnumListChange={this.handleEnumListChange}
        parameter={this.state}
        errors={this.state.errors}
      />
    );
  }
}

export default connect((state: AppState) => ({
  authToken: state.auth.authToken,
}))(ParameterFormContainer);
