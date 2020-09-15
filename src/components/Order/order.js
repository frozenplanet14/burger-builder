import React from 'react';
import classes from './order.module.css';

const order = (props) => {

    return (
        <div className={classes.Order}>
            <p>Ingredients: {
                Object.keys(props.order.ingredients).map(ig => (
                  `${ig} (${props.order.ingredients[ig]})`  
                )).join(', ')
            }</p>
            <p>Price: <strong>USD {props.order.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;