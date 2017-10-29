import * as React from 'react';
import { apiUrl } from '../../constants';
import SectionList from './SectionList';
import axios, { AxiosResponse } from 'axios';
import { ISectionCollection } from '../../interface';
import { connect } from 'react-redux';
import { AppState } from '../../reducers/index';

interface SectionListContainerProps {
  authToken: string;
}

class SectionListContainer extends React.Component<SectionListContainerProps, ISectionCollection> {
  constructor(props: SectionListContainerProps) {
    super(props);

    this.state = { sections: [] };

    axios.defaults.headers.common['Authorization'] = `Bearer ${props.authToken}`;
  }

  componentDidMount() {
    axios
      .get(apiUrl.section)
      .then((response: AxiosResponse) => {
        this.setState({ sections: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <SectionList sections={this.state.sections} />;
  }
}

export default connect((state: AppState) => ({
  authToken: state.auth.authToken,
}))(SectionListContainer);
