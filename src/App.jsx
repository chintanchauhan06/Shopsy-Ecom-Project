import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import ProtectedRoute from './components/ProtectedRoute'
import ProductDetails from "./pages/ProductDetails";
import { useCart } from './context/CartContext'

const App = () => {
  const [location, setLocation] = useState()
  const [openDropdown, setOpenDropdown] = useState(false)

  const { cartItem, setCartItem } = useCart()

  // 📍 LOCATION
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords

      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        )

        setLocation(res.data.address)
        setOpenDropdown(false)

      } catch (error) {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    getLocation()
  }, [])

  // ✅ LOAD CART
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItem")
    if (storedCart) {
      setCartItem(JSON.parse(storedCart))
    }
  }, [setCartItem])

  // ✅ SAVE CART
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem))
  }, [cartItem])

  return (
    <BrowserRouter>

      <Navbar
        location={location}
        getLocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/category/:category' element={<CategoryProduct />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        <Route
          path='/cart'
          element={
            <ProtectedRoute>
              <Cart location={location} getLocation={getLocation} />
            </ProtectedRoute>
          }
        />

        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App