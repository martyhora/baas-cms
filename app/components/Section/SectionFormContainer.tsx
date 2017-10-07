import * as React from 'react';
import { apiUrl } from '../../constants';
import SectionForm from './SectionForm';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { IParameter } from '../../interface';
import { ChangeEvent } from 'react';

interface ISectionFormContainerState {
  name: string;
  parameters: Array<IParameter>;
  identificator: string;
  errors: Array<string>;
  id?: number;
}

interface ISectionFormContainerProps {
  match: {
    params: {
      id?: number;
    };
  };
  history: any;
}

const defaultState: ISectionFormContainerState = {
  name: '',
  parameters: [],
  identificator: '',
  errors: [],
};

export default class SectionFormContainer extends React.Component<
  ISectionFormContainerProps,
  ISectionFormContainerState
> {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleParameterChange = this.handleParameterChange.bind(this);
    this.handleIdentificatorChange = this.handleIdentificatorChange.bind(this);

    this.state = defaultState;
  }

  handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ name: e.currentTarget.value });
  }

  handleIdentificatorChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ identificator: e.currentTarget.value });
  }

  handleParameterChange(parameterIndex: number) {
    let parameters = this.state.parameters;

    parameters[parameterIndex].checked = !parameters[parameterIndex].checked;

    this.setState({ parameters: parameters });
  }

  handleSubmit() {
    let promise: AxiosPromise;

    if (!this.state.id) {
      promise = axios.post(apiUrl.section, this.state);
    } else {
      promise = axios.put(`${apiUrl.section}/${this.state.id}`, this.state);
    }

    promise
      .then((response: AxiosResponse) => {
        if (response.data.success) {
          this.props.history.push('/section');
        } else {
          this.setState({ errors: response.data.errors });
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  /**
     * Nastaví defaultní hodnoty do formuláře
     */
  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .get(`${apiUrl.section}/${this.props.match.params.id}`)
        .then((response: AxiosResponse) => {
          axios
            .get(`${apiUrl.parameter}`)
            .then(parameterResponse => {
              let newState = response.data;

              newState.parameters = parameterResponse.data.map((parameter: IParameter) => {
                parameter.checked = JSON.parse(response.data.params).indexOf(parameter.id) > -1;

                return parameter;
              });

              this.setState(newState);
            })
            .catch((error: Error) => {
              console.log(error);
            });
        })
        .catch((error: Error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${apiUrl.parameter}`)
        .then((response: AxiosResponse) => {
          defaultState.parameters = response.data.map((parameter: IParameter) => {
            parameter.checked = false;

            return parameter;
          });

          this.setState(defaultState);
        })
        .catch((error: Error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <SectionForm
        handleSubmit={this.handleSubmit}
        handleTitleChange={this.handleTitleChange}
        handleIdentificatorChange={this.handleIdentificatorChange}
        handleParameterChange={this.handleParameterChange}
        section={this.state}
        errors={this.state.errors}
      />
    );
  }
}
