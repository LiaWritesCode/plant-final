import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import './CartItem.css';
import './ProductList';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    addedItems: {}
  },
  
  reducers: {
    addItem: (state, action) => {
    const { name, image, cost } = action.payload;
    const existingItem = state.items.find(item => item.name === name);


  if (existingItem) {
    existingItem.quantity++;
  } else {
    state.items.push({ name, image, cost, quantity: 1 });
    state.addedItems[name] = true; 
  }
},

    removeItem: (state, action) => {
    if (Array.isArray(state.items)) {
        state.items = state.items.filter(item => item.name !== action.payload);
        delete state.addedItems[action.payload]; // This ensures button re-enables
    } else {
        state.items = [];
    }
},
    
    updateQuantity: (state, action) => {
    const { name, quantity } = action.payload;
    const itemToUpdate = state.items.find(item => item.name === name);
if (itemToUpdate) {itemToUpdate.quantity = quantity;}
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
