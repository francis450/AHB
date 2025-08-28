import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Cart from './components/Cart';
import BookingModal from './components/BookingModal';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';

function App() {
  return (
    <CartProvider>
      <UIProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Products />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <Cart />
            <BookingModal />
            <FloatingWhatsAppButton />
          </div>
        </Router>
      </UIProvider>
    </CartProvider>
  );
}

export default App;