import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case 'select':
            inputElement = (
                <select
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.changed}>
                        {
                            props.elementConfig.options.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                            ))
                        }
                </select>
            );
            break;
        default:
            inputElement= <input className={classes.InputElement} {...props.elementConfig} 
            onChange={props.changed}/>;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;
