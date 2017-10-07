import * as React from 'react';
import { apiUrl } from '../../constants';
import ContentList from './ContentList';
import axios, { AxiosResponse } from 'axios';

export interface IContent {
  id?: number;
  sectionName: string;
  dateCreated: string;
}

export interface IContentCollection {
  items: Array<IContent>;
}

export default class ContantListContainer extends React.Component<{}, IContentCollection> {
  constructor() {
    super();

    this.state = { items: [] };
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
