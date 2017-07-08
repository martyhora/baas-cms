import * as React from 'react'
import SelectBox from '../SelectBox'
import {IParameter} from "../../interface";
import {ChangeEvent} from "react";

interface IContentParameterProps {
    parameter: IParameter;
    handleParameterChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const getFormElement = (parameter: IParameter, handleParameterChange: (e: ChangeEvent<HTMLInputElement>) => void) => {
    let element: any;

    if (parameter.type === 'string') {
        element = <input type="text" name={parameter.id.toString()} onChange={handleParameterChange} value={parameter.value} className="form-control" />
    } else if (parameter.type === 'enum' && parameter.enumValues) {
        element = <SelectBox value={parameter.value} onChange={handleParameterChange} options={parameter.enumValues} name={parameter.id} prompt="- Vyberte -" />
    }

    return element
}

const ContentParameter = (props: IContentParameterProps) =>
    <div className="form-group">
        <label htmlFor="inputEmail3" className="col-sm-2 control-label">{props.parameter.name}</label>

        <div className="col-sm-10">
            {getFormElement(props.parameter, props.handleParameterChange)}            
        </div>
    </div>

export default ContentParameter