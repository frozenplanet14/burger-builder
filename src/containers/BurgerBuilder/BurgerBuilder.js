import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControl from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }
    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients} />
                <BuildControl />
            </>
        );
    }
}

export default BurgerBuilder;