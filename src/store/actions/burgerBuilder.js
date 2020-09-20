import * as actionTypes from './actionsTypes';
import axios from '../../axios.orders';

export const addIngredient = (payload) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload
  }
}

export const removeIngredient = (payload) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}

export const fetchIngredientsFailed = (error) => {
  return {
    type: actionTypes.FETCH_ING_FAILED,
    error: !!error
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(({data}) => dispatch(setIngredients(data)))
      .catch(error => dispatch(fetchIngredientsFailed(error)));
  }
}
