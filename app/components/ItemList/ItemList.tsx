import * as React from 'react';
import { IItem } from '../../interface';
import { ChangeEvent } from 'react';

interface IItemListProps {
  addItem: () => void;
  handleNewTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTitleChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
  removeItem: (index: number) => void;
  newItemTitle: string;
  items: Array<IItem>;
}

class ItemList extends React.Component<IItemListProps, any> {
  render() {
    return (
      <div>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td>
                <div className="input-group">
                  <div className="input-group-btn">
                    <button
                      type="button"
                      onClick={this.props.addItem}
                      className="btn btn-primary btn-flat"
                      title="Přidat položku"
                    >
                      <span className="glyphicon glyphicon-plus" aria-hidden="true" />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.props.handleNewTitleChange}
                    value={this.props.newItemTitle}
                    placeholder="Přidat položku"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <ul className="todo-list">
          {this.props.items.map((item, i) => (
            <li key={i}>
              <input
                type="text"
                className="form-control"
                value={item.name}
                onChange={this.props.handleTitleChange.bind(this, i)}
                style={{ display: 'inline', width: '93%' }}
              />

              <div
                className="tools"
                style={{ marginTop: '7px' }}
                onClick={this.props.removeItem.bind(this, i)}
              >
                <i className="fa fa-trash-o" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ItemList;
