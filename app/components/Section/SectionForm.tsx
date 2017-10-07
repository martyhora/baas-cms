import * as React from 'react';
import { ChangeEvent } from 'react';
import { IParameter, ISection } from '../../interface';
import ErrorList from '../ErrorList';

interface ISectionFormProps {
  section: ISection;
  errors: Array<string>;
  handleSubmit: () => void;
  handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIdentificatorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleParameterChange: (parameterIndex: number) => void;
}

const SectionForm = (props: ISectionFormProps) => (
  <div>
    <h1>Editace sekce</h1>

    <div className="box box-primary">
      <div className="box-body">
        <div className="form-horizontal">
          <ErrorList errors={props.errors} />

          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-2 control-label">
              Název sekce
            </label>
            <div className="col-sm-10">
              <input
                value={props.section.name}
                onChange={props.handleTitleChange}
                className="form-control"
                placeholder="Název sekce"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-2 control-label">
              Identifikátor sekce pro API
            </label>
            <div className="col-sm-10">
              <input
                value={props.section.identificator}
                onChange={props.handleIdentificatorChange}
                className="form-control"
                placeholder="Identifikátor sekce pro API"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-2 control-label">
              Parametry sekce
            </label>
            <div className="col-sm-10">
              {props.section.parameters.map((parameter: IParameter, i: number) => (
                <div key={i}>
                  <label>
                    <input
                      type="checkbox"
                      checked={parameter.checked}
                      onChange={e => {
                        props.handleParameterChange(i);
                      }}
                    />{' '}
                    {parameter.name}
                  </label>
                </div>
              ))}
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

export default SectionForm;
