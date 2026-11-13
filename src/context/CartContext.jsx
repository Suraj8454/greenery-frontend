import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { storage } from '../utils/storage';
import { api } from '../utils/api';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => storage.getCart());
  const [shippingConfig, setShippingConfig] = useState({ free_shipping_threshold: 1999, shipping_fee: 99 });

  useEffect(() => { storage.saveCart(cart); }, [cart]);
  useEffect(() => {
    let active = true;
    api('/settings').then((s) => {
      if (active) setShippingConfig({
        free_shipping_threshold: Math.max(0, Number(s.free_shipping_threshold ?? 1999)),
        shipping_fee: Math.max(0, Number(s.shipping_fee ?? 99)),
      });
    }).catch((e) => console.warn('Shipping settings unavailable; using defaults:', e.message));
    return () => { active = false; };
  }, []);

  const variantKey = (item) => `${item.id}::${String(item.selectedColor || '').toLowerCase()}`;
  const addToCart = (product, qty = 1) => setCart((prev) => {
    const key = variantKey(product);
    const existing = prev.find((i) => variantKey(i) === key);
    if (existing) return prev.map((i) => variantKey(i) === key ? { ...i, qty: i.qty + qty } : i);
    return [...prev, { ...product, qty }];
  });
  const removeFromCart = (itemOrId) => setCart((prev) => prev.filter((i) => typeof itemOrId === 'object' ? variantKey(i) !== variantKey(itemOrId) : String(i.id) !== String(itemOrId)));
  const updateQty = (itemOrId, qty) => {
    const quantity = Math.floor(Number(qty));
    if (quantity < 1) return removeFromCart(itemOrId);
    const matches = (i) => typeof itemOrId === 'object' ? variantKey(i) === variantKey(itemOrId) : String(i.id) === String(itemOrId);
    setCart((prev) => prev.map((i) => matches(i) ? { ...i, qty: Math.min(quantity, 100) } : i));
  };
  const clearCart = () => setCart([]);
  const totalItems = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  const subtotal = Math.round(cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0) * 100) / 100;
  const shipping = subtotal === 0 || subtotal >= shippingConfig.free_shipping_threshold ? 0 : shippingConfig.shipping_fee;
  const total = Math.round((subtotal + shipping) * 100) / 100;

  const value = useMemo(() => ({ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, subtotal, shipping, total, shippingConfig }), [cart, totalItems, subtotal, shipping, total, shippingConfig]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
