import * as React from 'react'
import { Link } from 'react-router-dom'
import { parameterTypes } from '../../constants'
import {IParameterBasicCollection, IParameterBasic} from '../../interface'

const ParameterList = (props: IParameterBasicCollection) =>
    <div>
        <h1>Přehled parametrů</h1>

         <div className="box box-primary">
            <div className="box-body">
                 <table className="table table-striped table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Název</th>
                            <th>Typ</th>
                            <th>Akce</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.parameters.map((parameter: IParameterBasic, i: number) =>
                            <tr key={i}>
                                <td>{parameter.name}</td>
                                <td>{parameterTypes[parameter.type]}</td>
                                <td><Link to={`parameter/edit/${parameter.id}`} title="Editace parametru"><span className="glyphicon glyphicon-edit" aria-hidden="true"></span></Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

export default ParameterList