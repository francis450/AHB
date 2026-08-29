import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import LeaveReview from './pages/LeaveReview';
import PrintReviewQr from './pages/PrintReviewQr';
import PaymentReturn from './pages/PaymentReturn';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
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
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/reviews/leave" element={<LeaveReview />} />
                <Route path="/reviews/qr" element={<PrintReviewQr />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/shop/payment-return" element={<PaymentReturn />} />
              </Routes>
            </main>
            <Footer />
            <BookingModal />
            <FloatingWhatsAppButton />
          </div>
        </Router>
      </UIProvider>
    </CartProvider>
  );
}

export default App;
