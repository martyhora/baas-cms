import * as React from 'react'
import {ChangeEvent} from "react";

const getPrompt = (caption: string) => {
    if (!caption) {
        return ''
    }

    return <option value="">{caption}</option>
};

export interface ISelectBoxOption {
    id: string;
    name: string;
}

interface ISelectBoxProps {
    value: string;
    name?: string;
    prompt: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: Array<ISelectBoxOption>;
}

const SelectBox = (props: ISelectBoxProps) =>
    <select value={props.value} onChange={props.onChange} name={props.name} className="form-control">
        {getPrompt(props.prompt)}

        {props.options.map((option, i) => <option value={option.id} key={i}>{option.name}</option>)}
    </select>

export default SelectBox