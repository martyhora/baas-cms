import * as React from 'react'
import ContentParameter from './ContentParameter'
import SelectBox from '../SelectBox'
import {IParameter} from "../../interface";
import {ChangeEvent} from "react";

interface IContentFormProps {
    sections: Array<any>;
    sectionId: number;
    parameters: Array<IParameter>;
    handleSubmit: () => void;
    handleSectionChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleParameterChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ContentForm = (props: IContentFormProps) =>
  <div>
    <h1>Editace obsahu</h1>
    
    <div className="box box-primary">
        <div className="box-body">
          <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">Sekce</label>
                <div className="col-sm-10">
                  <SelectBox value={props.sectionId} onChange={props.handleSectionChange} options={props.sections} prompt="- Vyberte -" />
                </div>
              </div>

              {props.parameters.map((parameter: IParameter, i: number) => <ContentParameter parameter={parameter} key={i} handleParameterChange={props.handleParameterChange} />)}

              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" onClick={props.handleSubmit} className="btn btn-success btn-flat">Uložit</button>
                </div>
              </div>
          </div>
        </div>
      </div>
  </div>

export default ContentForm