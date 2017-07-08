export enum EParameterType {
    String,
    Enum
}

export interface IParameterBasic {
    id?: number;
    name: string;
    type: string;
}

export interface IParameterBasicCollection {
    parameters: Array<IParameterBasic>
}

export interface IItem {
    name: string;
}

export interface IEnumValue extends IItem {
    id?: number;
}

export interface IParameter extends IParameterBasic {
    enumValues: Array<IEnumValue>
    value?: string;
    checked?: boolean;
    sectionId?: number;
}

export interface ISection {
    id?: number;
    name: string;
    parameters?: Array<IParameter>;
}

export interface ISectionCollection {
    sections: Array<ISection>;
}