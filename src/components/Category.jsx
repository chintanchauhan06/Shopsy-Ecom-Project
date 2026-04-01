import React from 'react'
import { useData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'

const Category = () => {
  const navigate = useNavigate()
  const { data } = useData()

  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => curElem[property])
    newVal = ["All", ...new Set(newVal)]
    return newVal
  }

  const categoryOnlyData = getUniqueCategory(data, "category")

  return (
    <div className='bg-[#101829]'>
      <div className='max-w-7xl mx-auto flex flex-wrap gap-3 justify-center md:justify-around py-6 px-4'>

        {
          categoryOnlyData?.map((item, index) => (
            <button
              key={index}
              onClick={() => item === "All" ? navigate('/products') : navigate(`/category/${item}`)}
              className='uppercase bg-gradient-to-r from-red-500 to-purple-500 hover:scale-105 transition text-white px-4 py-2 rounded-md text-sm font-semibold'
            >
              {item}
            </button>
          ))
        }

      </div>
    </div>
  )
}

export default Category