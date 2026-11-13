import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, mediaUrl } from '../utils/api';
const ProductsContext = createContext({ products: [], loading: true, refreshProducts: async () => {} });
export const useProducts = () => useContext(ProductsContext);
const parseArray = (value) => { if (Array.isArray(value)) return value; if (!value) return []; try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : []; } catch { return []; } };
const normalize = (p) => {
  const rawImages = [...new Set([p.img, ...parseArray(p.images || p.image_gallery)].filter(Boolean))];
  const rawColors = parseArray(p.colors || p.color_options).map((color) => {
    if (typeof color === 'object') return { name: color.name || color.hex || 'Colour', hex: color.hex || '#2d6a4f' };
    const [name, hex] = String(color).split(':'); return { name: name.trim(), hex: (hex || '#2d6a4f').trim() };
  });
  return { ...p, id: Number(p.id), price: Number(p.price), oldPrice: p.oldPrice ?? p.old_price ?? null, img: mediaUrl(p.img || rawImages[0]), images: rawImages.map(mediaUrl), colors: rawColors, collection: p.collection || 'our-products', is_active: p.is_active === undefined ? 1 : Number(p.is_active), stock_quantity: Number(p.stock_quantity || 0), desc: p.desc ?? p.description ?? '', features: p.features || '', benefits: p.benefits || '', how_to_use: p.how_to_use || '' };
};
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]); const [loading, setLoading] = useState(true);
  const refreshProducts = async () => { setLoading(true); try { const data = await api('/products'); setProducts(Array.isArray(data) ? data.map(normalize).filter(p => p.is_active !== 0) : []); } catch (e) { console.error('Products API:', e.message); setProducts([]); } finally { setLoading(false); } };
  useEffect(() => { refreshProducts(); }, []);
  return <ProductsContext.Provider value={{ products, loading, refreshProducts }}>{children}</ProductsContext.Provider>;
};
