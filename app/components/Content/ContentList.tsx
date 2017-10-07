import * as React from 'react';
import { IContent, IContentCollection } from './ContentListContainer';
import { Link } from 'react-router-dom';

const ContentList = (props: IContentCollection) => (
  <div>
    <h1>Přehled obsahu</h1>

    <div className="box box-primary">
      <div className="box-body">
        <table className="table table-striped table-hover table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sekce</th>
              <th>Datum vytvoření</th>
            </tr>
          </thead>
          <tbody>
            {props.items.map((content: IContent, i: number) => (
              <tr key={i}>
                <td>{content.id}</td>
                <td>{content.sectionName}</td>
                <td>{content.dateCreated}</td>
                <td>
                  <Link to={`content/edit/${content.id}`} title="Editace obsahu">
                    <span className="glyphicon glyphicon-edit" aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default ContentList;
