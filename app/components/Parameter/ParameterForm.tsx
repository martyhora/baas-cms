import * as React from 'react';
import { parameterTypes } from '../../constants';
import SelectBox, { ISelectBoxOption } from '../SelectBox';
import ItemListContainer from '../ItemList/ItemListContainer';
import { ChangeEvent } from 'react';
import { IEnumValue, IParameter } from '../../interface';
import ErrorList from '../ErrorList';

interface IParameterFormProps {
  parameter: IParameter;
  errors: Array<string>;
  handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIdentificatorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleEnumListChange: (items: Array<IEnumValue>) => void;
  handleSubmit: () => void;
}

let optionTypes: Array<ISelectBoxOption> = [];

for (let type in parameterTypes) {
  optionTypes.push({ id: type, name: parameterTypes[type] });
}

const ParameterForm = (props: IParameterFormProps) => (
  <div>
    <h1>Editace parametru</h1>

    <div className="box box-primary">
      <div className="box-body">
        <div className="form-horizontal">
          <ErrorList errors={props.errors} />

          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-2 control-label">
              Název parametru
            </label>
            <div className="col-sm-10">
              <input
                value={props.parameter.name}
                onChange={props.handleTitleChange}
                className="form-control"
                placeholder="Název parametru"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-2 control-label">
              Identifikátor parametru pro API
            </label>
            <div className="col-sm-10">
              <input
                value={props.parameter.identificator}
                onChange={props.handleIdentificatorChange}
                className="form-control"
                placeholder="Identifikátor parametru pro API"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-2 control-label">
              Typ parametru
            </label>
            <div className="col-sm-10">
              <SelectBox
                value={props.parameter.type}
                onChange={props.handleTypeChange}
                options={optionTypes}
                prompt="- Vyberte -"
              />
            </div>
          </div>
          <div
            className="form-group"
            style={{ display: props.parameter.type === 'enum' ? 'block' : 'none' }}
          >
            <label htmlFor="inputEmail3" className="col-sm-2 control-label">
              Výčtové hodnoty
            </label>
            <div className="col-sm-10">
              <ItemListContainer
                handleListChange={props.handleEnumListChange}
                items={props.parameter.enumValues}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                type="submit"
                onClick={props.handleSubmit}
                className="btn btn-success btn-flat"
              >
                Uložit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ParameterForm;
