import * as React from 'react'

const getPrompt = (caption: string) => {
    if (!caption) {
        return ''
    }

    return <option value="">{caption}</option>
};

interface ISelectBoxOption {
    id: string;
    name: string;
}

interface ISelectBoxProps {
    value: string;
    name: string;
    prompt: string;
    onChange: () => void;
    options: Array<ISelectBoxOption>;
}

const SelectBox = (props: ISelectBoxProps) =>
    <select value={props.value} onChange={props.onChange} name={props.name} className="form-control">
        {getPrompt(props.prompt)}

        {props.options.map((option, i) => <option value={option.id} key={i}>{option.name}</option>)}
    </select>

export default SelectBox