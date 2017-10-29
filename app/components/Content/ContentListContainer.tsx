import * as React from 'react';
import { apiUrl } from '../../constants';
import ContentList from './ContentList';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { AppState } from '../../reducers/index';

export interface IContent {
  id?: number;
  sectionName: string;
  dateCreated: string;
}

export interface IContentCollection {
  items: Array<IContent>;
}

interface ContantListContainerProps {
  authToken: string;
}

class ContantListContainer extends React.Component<ContantListContainerProps, IContentCollection> {
  constructor(props: ContantListContainerProps) {
    super(props);

    this.state = { items: [] };

    axios.defaults.headers.common['Authorization'] = `Bearer ${props.authToken}`;
  }

  componentDidMount() {
    axios
      .get(apiUrl.content)
      .then((response: AxiosResponse) => {
        this.setState({ items: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <ContentList items={this.state.items} />;
  }
}

export default connect((state: AppState) => ({
  authToken: state.auth.authToken,
}))(ContantListContainer);
