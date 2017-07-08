import * as React from 'react'
import { Link } from 'react-router-dom'
import {ISection, ISectionCollection} from "../../interface";

const SectionList = (props: ISectionCollection) =>
    <div>
        <h1>Přehled sekcí</h1>

         <div className="box box-primary">
            <div className="box-body">
                 <table className="table table-striped table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Název</th>
                            <th>Akce</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.sections.map((section: ISection, i: number) =>
                            <tr key={i}>
                                <td>{section.name}</td>
                                <td><Link to={`section/edit/${section.id}`} title="Editace sekce"><span className="glyphicon glyphicon-edit" aria-hidden="true"></span></Link></td>
                            </tr>                            
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

export default SectionList