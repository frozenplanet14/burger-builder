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
        {
            controls.map((c) => (
                <BuildControl key={c.label} label={c.label} />
            ))
        }
    </div>
);

export default buildControls;
