import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import './ProductList';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const cartItem = cart?.items || [];
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0).toFixed(2);
};

const [checkoutMessage, setCheckoutMessage] = useState("");


const handleCheckoutShopping = (e) => {
    alert("Coming Soon!");
    setCheckoutMessage("Coming Soon!");
    };
    
const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

const handleDecrement = (item) => {
    if (item.quantity > 1) {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); } 
    else {
        dispatch(removeItem(item.name));
    }
};

const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let unitPrice = parseFloat(item.cost.substring(1));
    return (unitPrice * item.quantity).toFixed(2);
  };

    const calculateTotalQuantity = (cart) => {
    return cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
    };


  return (
    <div className="cart-container">
        <div className="cart-item">
        </div>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{color: 'black' }} className='total_cart_amount'>
        Total Items in Cart: {calculateTotalQuantity(cart)}
</div>
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => onContinueShopping(e)}>Continue Shopping</button>
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
        {checkoutMessage || "Checkout"}
    </button>
      </div>
    </div>
  );
};

export default CartItem;


