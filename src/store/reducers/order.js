import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  orders: [],
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.concat([{
          ...action.orderData,
          id: action.id
        }])
      };
    case actionTypes.PURCHASE_BURGER_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

export default reducer;
