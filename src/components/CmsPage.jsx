import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';

const CmsPage = ({ slug, fallbackTitle }) => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { let active = true; api(`/pages/${slug}`).then(data => { if (active) setPage(data); }).catch(() => { if (active) setPage(null); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [slug]);
  return <section className="min-h-[55vh] bg-[#fcfbf7] px-4 py-16"><article className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10"><p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#2d6a4f]">Cityscape Greenery</p><h1 className="mb-6 text-3xl font-serif font-bold text-[#1a3c2e] sm:text-4xl">{loading ? 'Loading…' : page?.title || fallbackTitle}</h1>{loading ? <p className="text-sm text-gray-500">Loading page content…</p> : page?.content ? <div className="prose max-w-none text-sm leading-7 text-gray-600" dangerouslySetInnerHTML={{ __html: page.content }} /> : <p className="text-sm text-gray-500">This page content has not been added yet. You can add it from Admin → Pages.</p>}</article></section>;
};
export default CmsPage;
