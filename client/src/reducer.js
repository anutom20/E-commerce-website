const reducer = (state,action)=>{
    if(action.type === 'LOADING'){
        return {...state , cartLoading:true,}
    }

    if(action.type === 'DISPLAY_ITEMS'){
        return {...state, cart:action.payload, cartLoading:false, cartError:false }
    }

    if(action.type === 'ERROR'){
        return {...state,cartError:true}
    }

    if(action.type === 'INCREASE_QUANTITY'){
        
        return {
          ...state,
          cart: state.cart.map((cartItem) => {
            if (cartItem._id === action.payload) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + 1 > 10 ? 10 : cartItem.quantity+1,
              };
            } else {
              return cartItem;
            }
          }),
        };
    }

    if(action.type === 'DECREASE_QUANTITY'){
        
        return {
          ...state,
          cart: state.cart.map((cartItem) => {
            if (cartItem._id === action.payload) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1 < 1 ? 1 : cartItem.quantity-1,
              };
            } else {
              return cartItem;
            }
          }),
        };
    }
    if(action.type === 'UPDATE_SUBTOTAL'){
        
        return {
          ...state,
          cart: state.cart.map((cartItem) => {
            if (cartItem._id === action.payload) {
              return {
                ...cartItem,
                subtotal: cartItem.quantity*cartItem.price,
              };
            } else {
              return cartItem;
            }
          }),
        };
    }
    if(action.type === 'REMOVE_ITEM'){
        
        return {
          ...state,
          cart: state.cart.filter((cartItem) => {
            return cartItem._id !== action.payload
          }),
        };
    }

    if(action.type === 'GET_ORDER_TOTALS'){
      let netTotal = 0
      let netQuantity = 0
      state.cart.forEach((cartItem)=>{
        netTotal += cartItem.subtotal
        netQuantity += cartItem.quantity
      })
      return{
        ...state,
        total: netTotal,
        totalQuantity: netQuantity
         
      }
    }

    if(action.type === 'CLEAR_CART'){
      return {
        ...state,
        cart : [],
        total: 0
      }
    }

    

    throw new Error('no matching action type')
}

export default reducer