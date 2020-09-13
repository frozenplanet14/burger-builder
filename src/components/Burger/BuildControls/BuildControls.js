import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import { IngredientConst } from '../BurgerIngredient/Ingredient.const';

const controls = Object.keys(IngredientConst).filter((_, i) => i >= 4).map(k => {
    const name = IngredientConst[k];
    return {
        label: name.charAt(0).toUpperCase() + name.slice(1),
        type: name
    }
})

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map((c) => (
                <BuildControl key={c.label} label={c.label}
                    disabledInfo={props.disabledInfo[c.type]}
                    added={() => props.ingredientAdded(c.type)}
                    removed={() => props.ingredientRemoved(c.type)}/>
            ))
        }
        <button
            disabled={!props.purchaseable}
            className={classes.OrderButton}
            onClick={props.orderNow}>ORDER NOW</button>
    </div>
);

export default buildControls;
