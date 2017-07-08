import * as React from 'react'

interface IErrorListProps {
    errors: Array<string>;
}

const ErrorList = (props: IErrorListProps) =>
    <div>
        {props.errors.length > 0 && <div className="alert alert-danger">
            <ul className="error">
                {props.errors.map((error: string, i: number) => <li key={i}>{error}</li>)}
            </ul>
        </div>}
    </div>

export default ErrorList