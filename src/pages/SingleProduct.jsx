import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm"
import Breadcrums from '../components/Breadcrums';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';

const SingleProduct = () => {
    const params = useParams()
    const [singleProduct, setSingleProduct] = useState(null)
    const { addToCart } = useCart()

    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`https://fakestoreapi.com/products/${params.id}`)
            
            // ✅ Correct data
            setSingleProduct(res.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleProduct()
    }, [])

    return (
        <>
            {
                singleProduct ? (
                    <div className='px-4 pb-4 md:px-0'>
                        
                        <Breadcrums title={singleProduct.title} />

                        <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
                            
                            {/* IMAGE */}
                            <div className='w-full'>
                                <img
  src={SingleProduct.thumbnail || SingleProduct.images?.[0]}
  alt={SingleProduct.title}
  className='rounded-2xl w-full object-cover'
/>
                            </div>

                            {/* DETAILS */}
                            <div className='flex flex-col gap-6'>
                                
                                <h1 className='md:text-3xl text-xl font-bold text-gray-800'>
                                    {singleProduct.title}
                                </h1>

                                {/* CATEGORY */}
                                <div className='text-gray-600 uppercase'>
                                    {singleProduct.category}
                                </div>

                                {/* PRICE */}
                                <p className='text-2xl text-red-500 font-bold'>
                                    ${singleProduct.price}
                                </p>

                                {/* DESCRIPTION */}
                                <p className='text-gray-600'>
                                    {singleProduct.description}
                                </p>

                                {/* QUANTITY */}
                                <div className='flex items-center gap-4'>
                                    <label className='text-sm font-medium text-gray-700'>
                                        Quantity:
                                    </label>
                                    <input 
                                        type="number" 
                                        min={1} 
                                        defaultValue={1} 
                                        className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none'
                                    />
                                </div>

                                {/* ADD TO CART */}
                                <div className='flex gap-4 mt-4'>
                                    <button 
                                        onClick={() => addToCart(singleProduct)} 
                                        className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md'
                                    >
                                        <IoCartOutline className='w-6 h-6'/> 
                                        Add to Cart
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-screen'>
                        <video muted autoPlay loop>
                            <source src={Loading} type='video/webm' />
                        </video>
                    </div>
                )
            }
        </>
    )
}

export default SingleProduct