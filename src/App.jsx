import './App.css';
import Catalog from './components/Catalog/Catalog';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Promo from './components/Promo/Promo';
import Reels from './components/Reels/Reels';
import AuthModal from './components/AuthModal/AuthModal';
import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Menu from './components/Menu/Menu';
import ProductModal from './components/ProductModal/ProductModal';

function App() {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleOpenAuthModal = () => {
    setOpenAuthModal(true);
  }

  const handleCloseAuthModal = () => {
    setOpenAuthModal(false);
  }

  const handleOpenCart = () => {
    setOpenCart(true);
  }

  const handleCloseCart = () => {
    setOpenCart(false);
  }

  const handleOpenMenu = () => {
    setOpenMenu(true);
  }

  const handleCloseMenu = () => {
    setOpenMenu(false);
  }

  const handleOpenProductModal = (product) => {
    setSelectedProduct(product)
    setOpenProductModal(true);
  }

  const handleCloseProductModal = () => {
    setOpenProductModal(false);
    setSelectedProduct(null);
  }

  const handleAddToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  const handleClearCart = () => {
    setCartItems([]);
  }

  const handleUpdateCart = (updatedCartItems) => {
    setCartItems(updatedCartItems);
  }

  return (
    <div className="App">
      <Header
        onOpenAuthModal={handleOpenAuthModal}
        onOpenCart={handleOpenCart}
        onOpenMenu={handleOpenMenu}
        cartItems={cartItems} />
      <div className='Container'>
        <Promo />
        <Reels />
        <Catalog />
        <Products onAddToCart={handleAddToCart} onMoreClick={handleOpenProductModal} />
      </div>
      <Footer />
      {openAuthModal && <AuthModal onClose={handleCloseAuthModal} />}
      {openMenu && <Menu onClose={handleCloseMenu} />}
      {openCart &&
        <Cart
          onClose={handleCloseCart}
          cartItems={cartItems}
          onClearCart={handleClearCart}
          handleUpdateCart={handleUpdateCart}
        />}
      {openProductModal && selectedProduct &&
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseProductModal}
          onAddToCart={() => handleAddToCart(selectedProduct)}
        />}
    </div>
  );
}

export default App;