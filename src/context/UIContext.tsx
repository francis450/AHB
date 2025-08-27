import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isCartOpen: boolean;
  isBookingOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openBooking: () => void;
  closeBooking: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <UIContext.Provider value={{
      isCartOpen,
      isBookingOpen,
      openCart,
      closeCart,
      openBooking,
      closeBooking
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};