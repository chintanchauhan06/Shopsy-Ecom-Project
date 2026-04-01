import React from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import emptyCart from "../assets/empty-cart.png"

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart()
  const { user } = useUser()
  const navigate = useNavigate()

  // ✅ FIX: include quantity
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
      {
        cartItem.length > 0 ? (
          <div>
            <h1 className='font-bold text-2xl'>My Cart ({cartItem.length})</h1>

            {/* CART ITEMS */}
            <div className='mt-10'>
              {cartItem.map((item, index) => (
                <div key={index} className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>
                  <div className='flex items-center gap-4'>
                    {/* ✅ FIX image fallback */}
                    <img
  src={item.thumbnail || item.images?.[0]}
  alt={item.title}
  className='w-20 h-20 rounded-md'
/>
                    <div>
                      <h1 className='md:w-[300px] line-clamp-2'>{item.title}</h1>
                      <p className='text-red-500 font-semibold text-lg'>
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className='bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
                    <button onClick={() => updateQuantity(cartItem, item.id, "decrease")}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(cartItem, item.id, "increase")}>+</button>
                  </div>

                  {/* DELETE */}
                  <span onClick={() => deleteItem(item.id)}>
                    <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' />
                  </span>
                </div>
              ))}
            </div>

            {/* BILL + FORM */}
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>

              {/* DELIVERY INFO */}
              <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'>
                <h1 className='text-gray-800 font-bold text-xl'>Delivery Info</h1>

                <input
                  type="text"
                  value={user?.fullName || ""}
                  readOnly
                  className='p-2 rounded-md'
                />

                <input
                  type="text"
                  value={location?.county || ""}
                  readOnly
                  className='p-2 rounded-md'
                />

                <div className='flex gap-5'>
                  <input
                    type="text"
                    value={location?.state || ""}
                    readOnly
                    className='p-2 rounded-md w-full'
                  />
                  <input
                    type="text"
                    value={location?.postcode || ""}
                    readOnly
                    className='p-2 rounded-md w-full'
                  />
                </div>

                <div className='flex gap-5'>
                  <input
                    type="text"
                    value={location?.country || ""}
                    readOnly
                    className='p-2 rounded-md w-full'
                  />
                  <input
                    type="text"
                    placeholder='Phone No'
                    className='p-2 rounded-md w-full'
                  />
                </div>

                <button className='bg-red-500 text-white px-3 py-1 rounded-md mt-3'>
                  Submit
                </button>

                <div className='text-center'>-------- OR --------</div>

                <button onClick={getLocation} className='bg-red-500 text-white px-3 py-2 rounded-md'>
                  Detect Location
                </button>
              </div>

              {/* BILL */}
              <div className='bg-white shadow-xl rounded-md p-7 mt-4 space-y-2'>
                <h1 className='font-bold text-xl'>Bill details</h1>

                <div className='flex justify-between'>
                  <span>Items total</span>
                  <span>${totalPrice}</span>
                </div>

                <div className='flex justify-between'>
                  <span>Delivery</span>
                  <span className='text-red-500'>FREE</span>
                </div>

                <div className='flex justify-between'>
                  <span>Handling</span>
                  <span>$5</span>
                </div>

                <hr />

                <div className='flex justify-between font-bold'>
                  <span>Total</span>
                  <span>${totalPrice + 5}</span>
                </div>

                <button className='bg-red-500 text-white w-full py-2 mt-3'>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center h-[600px] justify-center'>
            <h1 className='text-red-500 text-3xl'>Cart is empty</h1>
            <img src={emptyCart} className='w-[300px]' />
            <button onClick={() => navigate('/products')} className='bg-red-500 text-white px-3 py-2 mt-3'>
              Shop Now
            </button>
          </div>
        )
      }
    </div>
  )
}

export default Cart