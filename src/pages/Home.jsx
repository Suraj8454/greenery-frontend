import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import FeaturedIn from '../components/FeaturedIn';
import TrustBadges from '../components/TrustBadges';
import CategorySection from '../components/CategorySection';
import BestSellers from '../components/BestSellers';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import PlantCareGuide from '../components/PlantCareGuide';
import BulkOrder from '../components/BulkOrder';
import Testimonials from '../components/Testimonials';
import OurProducts from '../components/OurProducts';
import NewArrivals from '../components/NewArrivals';

export default function Home() {
  const [searchParams] = useSearchParams();
  const [cmsSections, setCmsSections] = useState([]);
  useEffect(() => { api('/sections').then(rows => setCmsSections(Array.isArray(rows) ? rows : [])).catch(() => setCmsSections([])); }, []);
  const { products, loading } = useProducts();
  const term = (searchParams.get('search') || '').trim();
  const needle = term.toLowerCase();
  const results = needle ? products.filter((p) => `${p.name || ''} ${p.category || ''} ${p.desc || ''} ${p.tag || ''}`.toLowerCase().includes(needle)) : [];

  if (term) return (
    <section id="products" className="min-h-[55vh] bg-[#fcfbf7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[#2d6a4f]">Search results</p>
        <h1 className="mb-8 text-3xl font-serif font-bold text-[#1a3c2e]">Results for “{term}”</h1>
        {loading ? <p className="text-sm text-gray-500">Loading products…</p> : results.length ? <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{results.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="rounded-2xl bg-white p-8 text-sm text-gray-500">No products matched your search.</p>}
      </div>
    </section>
  );

  const components = { featured_in: FeaturedIn, trust_badges: TrustBadges, category_section: CategorySection, best_sellers: BestSellers, our_products: OurProducts, new_arrivals: NewArrivals, how_it_works: HowItWorks, why_choose_us: WhyChooseUs, plant_story: PlantCareGuide, testimonials: Testimonials, bulk_order: BulkOrder };
  const fallbackOrder = ['featured_in','trust_badges','category_section','best_sellers','our_products','new_arrivals','how_it_works','why_choose_us','plant_story','testimonials','bulk_order'];
  // Keep the original storefront sequence; CMS visibility controls which blocks render.
  const order = cmsSections.length ? fallbackOrder.filter(k => cmsSections.some(x => x.section_key === k && Number(x.is_active ?? 1) === 1)) : fallbackOrder;
  return <><Hero />{order.map(key => { const Component = components[key]; return Component ? <Component key={key} /> : null; })}</>;
}
