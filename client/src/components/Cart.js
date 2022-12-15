import React from 'react';

export default function Cart(props) {
  const { onAdd, onRemove, cartItems, handleClearcart } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.Price, 0);
  const taxPrice = itemsPrice * 0.05;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return (
    <div className='container'>
      <aside className="block col-12">
        <h2>Cart Items</h2>
        <div>
          {cartItems.length === 0 && <div>Cart is empty</div>}
          {cartItems.map((item) => (
            <div key={item._id} className="row pb_2">
              <div className="col-3 ">{item.name}</div>
              <div className="col-4 ">
                <button onClick={() => onRemove(item)} >
                  -
                </button>{' '}
                <button onClick={() => onAdd(item)} >
                  +
                </button>
              </div>

              <div className="col-5  text-right">
                {item.qty} x {item.Price.toFixed(2)} 
              </div>
            </div>
          ))}

          {cartItems.length !== 0 && (
            <>
              <hr></hr>
              <div className="row">
                <div className="col-6">Items Price</div>
                <div className="col-6 text-right">{itemsPrice.toFixed(2)} </div>
              </div>
              <div className="row">
                <div className="col-6">Tax Price</div>
                <div className="col-6 text-right">{taxPrice.toFixed(2)} </div>
              </div>
              <div className="row">
                <div className="col-6">Shipping Price</div>
                <div className="col-6 text-right">
                  {shippingPrice.toFixed(2)} 
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <strong>Total Price</strong>
                </div>
                <div className="col-6 text-right">
                  <strong>{totalPrice.toFixed(2)} AED</strong>
                </div>
              </div>
              <hr />
              <div className="row">
                <button className='btn_color col-md-5' onClick={() => alert('Checkout done!')}>
                  Checkout
                </button>
                <button className='btn_color col-md-5' onClick={() => handleClearcart()}>
                  Clear cart
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}