import * as React from 'react';
import ItemList from './ItemList';
import { ChangeEvent } from 'react';
import { IItem } from '../../interface';

interface IItemListContainerProps {
  items: Array<IItem>;
  handleListChange: (items: Array<IItem>) => void;
}

interface IItemListContainerState {
  items: Array<IItem>;
  newItemTitle: string;
}

export default class ItemListContainer extends React.Component<
  IItemListContainerProps,
  IItemListContainerState
> {
  constructor(props: IItemListContainerProps) {
    super(props);

    this.state = { items: props.items || [], newItemTitle: '' };

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handleNewTitleChange = this.handleNewTitleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  removeItem(index: number): void {
    this.setState(
      {
        items: this.state.items.filter((_, i) => i !== index),
      },
      this.handleListChange
    );
  }

  addItem(): void {
    if (!this.state.newItemTitle) {
      return;
    }

    let items = this.state.items;

    items.push({ name: this.state.newItemTitle });

    this.setState({ items: items, newItemTitle: '' }, this.handleListChange);
  }

  handleNewTitleChange(e: ChangeEvent<HTMLInputElement>): void {
    const value: string = e.currentTarget.value;

    this.setState({ newItemTitle: value });
  }

  handleTitleChange(index: number, e: ChangeEvent<HTMLInputElement>): void {
    let items = this.state.items;
    items[index].name = e.currentTarget.value;

    this.setState({ items: items }, this.handleListChange);
  }

  /**
     * Zavoláno při jakékoli změně seznamu, pošle aktualizovaná data do nadřazené komponenty
     */
  handleListChange(): void {
    this.props.handleListChange(this.state.items);
  }

  /**
     * Aktualizuje položky po načtení položek AJAXem v parent komponentě
     * @param  {object} nextProps nové props
     */
  componentWillReceiveProps(nextProps: any): void {
    this.setState({ items: nextProps.items });
  }

  render() {
    return (
      <ItemList
        removeItem={this.removeItem}
        addItem={this.addItem}
        handleNewTitleChange={this.handleNewTitleChange}
        handleTitleChange={this.handleTitleChange}
        items={this.state.items}
        newItemTitle={this.state.newItemTitle}
      />
    );
  }
}
