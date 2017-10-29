import * as React from 'react';
import { apiUrl } from '../../constants';
import ContentForm from './ContentForm';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { ChangeEvent } from 'react';
import { IParameter } from '../../interface';
import { connect } from 'react-redux';
import { AppState } from '../../reducers/index';

interface IContentFormContainerState {
  sections: Array<any>;
  sectionId: number;
  parameters: Array<IParameter>;
  errors: Array<string>;
}

const defaultState: IContentFormContainerState = {
  sections: [],
  sectionId: 0,
  parameters: [],
  errors: [],
};

interface IContentFormContainerProps {
  match: {
    params: {
      id?: number;
    };
  };
  history: any;
  authToken: string;
}

interface IParameterValue {
  id: number;
  content_section_id: number;
  parameter_id: number;
  value: string;
}

class ContentFormContainer extends React.Component<
  IContentFormContainerProps,
  IContentFormContainerState
> {
  constructor(props: IContentFormContainerProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSectionChange = this.handleSectionChange.bind(this);
    this.handleParameterChange = this.handleParameterChange.bind(this);

    this.state = defaultState;

    axios.defaults.headers.common['Authorization'] = `Bearer ${props.authToken}`;
  }

  handleSectionChange(e: ChangeEvent<HTMLInputElement>): void {
    const sectionId: number = parseInt(e.currentTarget.value);

    this.fetchParameters(sectionId, (parameters: Array<IParameter>) => {
      this.setState({ parameters: parameters });
    });

    this.setState({ sectionId: sectionId });
  }

  fetchParameters(
    sectionId: number,
    onParametersFetched: (parameters: Array<IParameter>) => void
  ): void {
    axios
      .get(`${apiUrl.section}/get-parameters/${sectionId}`)
      .then((response: AxiosResponse) => {
        onParametersFetched(response.data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  handleParameterChange(e: ChangeEvent<HTMLInputElement>): void {
    let parameters: Array<IParameter> = this.state.parameters;

    parameters.forEach((parameter: IParameter) => {
      if (parameter.id === parseInt(e.currentTarget.name)) {
        parameter.value = e.currentTarget.value;
      }
    });

    this.setState({ parameters: parameters });
  }

  handleSubmit(): void {
    const dataToSave = {
      parameters: this.state.parameters.map((parameter: IParameter) => {
        return { id: parameter.id, value: parameter.value };
      }),
      sectionId: this.state.sectionId,
    };

    let promise: AxiosPromise;

    if (this.props.match.params.id) {
      promise = axios.put(`${apiUrl.content}/${this.props.match.params.id}`, dataToSave);
    } else {
      promise = axios.post(apiUrl.content, dataToSave);
    }

    promise
      .then((response: AxiosResponse) => {
        if (response.data.success) {
          this.props.history.push('/content');
        } else {
          this.setState({ errors: response.data.errors });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  setDefaultValues(): void {
    axios
      .get(apiUrl.section)
      .then((response: AxiosResponse) => {
        this.setState({ sections: response.data });
      })
      .catch((error: Error) => {
        console.log(error);
      });

    if (this.props.match.params.id) {
      axios
        .get(`${apiUrl.content}/${this.props.match.params.id}`)
        .then((response: AxiosResponse) => {
          const sectionId = parseInt(response.data.sectionId);

          this.fetchParameters(sectionId, (parameters: Array<IParameter>) => {
            response.data.parameterValues.forEach((parameterValue: IParameterValue) => {
              parameters.forEach((parameter: IParameter) => {
                if (parameter.id === parameterValue.parameter_id) {
                  parameter.value = parameterValue.value;
                }
              });
            });

            this.setState({ parameters: parameters });
          });

          this.setState({ sectionId: sectionId });
        })
        .catch((error: Error) => {
          console.log(error);
        });
    }
  }

  /**
     * Nastaví defaultní hodnoty do formuláře
     */
  componentDidMount(): void {
    this.setDefaultValues();
  }

  render() {
    return (
      <ContentForm
        handleSubmit={this.handleSubmit}
        handleSectionChange={this.handleSectionChange}
        handleParameterChange={this.handleParameterChange}
        sections={this.state.sections}
        sectionId={this.state.sectionId}
        parameters={this.state.parameters}
        errors={this.state.errors}
      />
    );
  }
}

export default connect((state: AppState) => ({
  authToken: state.auth.authToken,
}))(ContentFormContainer);
