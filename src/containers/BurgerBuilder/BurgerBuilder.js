import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios.orders';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/burgerBuilder';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        isLoading: false
    }

    componentDidMount() {
        this.props.initializeIngredients();
    }

    purchaseHandler = (show) => {
        this.setState({purchasing: show})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        const purchaseable = Object.values(disabledInfo).reduce((t, c) => t + c, 0) > 0;
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <>
                <Modal show={this.state.purchasing} hide={() => this.purchaseHandler(false)}>
                {
                    this.state.isLoading
                        ? <Spinner />
                        : <OrderSummary
                            ingredients={this.props.ings}
                            totalPrice={this.props.totalPrice}
                            isLoading={this.state.isLoading}
                            hide={() => this.purchaseHandler(false)}
                            continue={this.purchaseContinueHandler}/>
                }
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                    price={this.props.totalPrice}
                    purchaseable={purchaseable}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    orderNow={() => this.purchaseHandler(true)}/>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        totalPrice: state.burger.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (payload) => dispatch(actionTypes.addIngredient(payload)),
        onIngredientRemoved: (payload) => dispatch(actionTypes.removeIngredient(payload)),
        initializeIngredients: () => dispatch(actionTypes.initIngredients())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
