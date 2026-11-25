
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import {
  Leaf,
  ArrowUpRight,
  Sparkles,
  Sprout,
  MoveDown,
  CircleDot
} from 'lucide-react';

import { api } from '../utils/api';

const CmsPage = ({ slug, fallbackTitle }) => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setPage(null);

    api(`/pages/${slug}`)
      .then((data) => {
        if (active) setPage(data);
      })
      .catch((error) => {
        console.error(`CMS page error (${slug}):`, error);
        if (active) setPage(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  // Backend title has priority.
  const title = page?.title || fallbackTitle || 'Page';

  // Detect About page's custom HTML.
  const hasCustomAboutLayout =
    typeof page?.content === 'string' &&
    /class=["'][^"']*\bcg-about\b[^"']*["']/.test(page.content);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafaf6] px-5 py-16">
        <div className="mx-auto max-w-5xl animate-pulse space-y-8">
          <div className="h-64 rounded-3xl bg-[#e8eee5]" />

          <div className="space-y-4 rounded-2xl bg-white p-8">
            <div className="h-8 w-2/3 rounded-lg bg-[#edf0e9]" />
            <div className="h-3 w-full rounded bg-gray-100" />
            <div className="h-3 w-full rounded bg-gray-100" />
            <div className="h-3 w-5/6 rounded bg-gray-100" />
          </div>
        </div>
      </main>
    );
  }

  // =========================================
  // SAME DESIGN FOR ALL CMS PAGES
  // =========================================

  return (
    <main className="min-h-screen overflow-hidden bg-[#fafaf6] text-[#193b2b]">

      {/* =====================================
          COMMON HERO - ALL PAGES
      ===================================== */}

      <section className="relative isolate overflow-hidden bg-[#173d2d]">

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-24 -top-32 h-[450px] w-[450px] rounded-full border border-white/[0.09] sm:h-[600px] sm:w-[600px]" />

        <div className="pointer-events-none absolute -right-12 -top-20 h-[340px] w-[340px] rounded-full border border-white/[0.09] sm:h-[470px] sm:w-[470px]" />

        <div className="pointer-events-none absolute -bottom-16 -left-20 opacity-[0.06]">
          <Sprout size={350} strokeWidth={0.6} />
        </div>

        <div className="relative mx-auto flex min-h-[350px] max-w-7xl flex-col justify-center px-5 py-20 sm:min-h-[420px] sm:px-10 sm:py-24 lg:px-14">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl"
          >

            {/* Brand */}

            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#d5bc83]/30 bg-white/[0.06] px-4 py-2.5 backdrop-blur-sm">

              <Leaf size={15} className="text-[#d5bc83]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e1d1aa] sm:text-xs">
                Cityscape Greenery
              </span>

            </div>

            {/* Small heading */}

            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-9 bg-[#c9b27e]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9b27e] sm:text-xs">
                DISCOVER OUR WORLD
              </p>

            </div>

            {/* Dynamic title */}

            <h1 className="max-w-4xl font-serif text-[42px] font-medium leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[76px]">
              {title}
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              Discover more about Cityscape Greenery,
              our policies, and our commitment to you.
            </p>

            <a
              href="#page-content"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d5bc83] px-7 py-3.5 text-xs font-bold text-[#173d2d] transition duration-300 hover:-translate-y-1 hover:bg-[#e6d2a6] sm:text-sm"
            >
              Explore More
              <MoveDown size={16} />
            </a>

          </motion.div>

          <div className="absolute bottom-6 right-6 hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40 md:flex">
            <CircleDot size={13} />
            Nature • Lifestyle • Greenery
          </div>

        </div>

      </section>

      {/* =====================================
          COMMON CONTENT SECTION
      ===================================== */}

      <section
        id="page-content"
        className="scroll-mt-8 px-4 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12 lg:pt-20"
      >

        <div className="mx-auto max-w-7xl">

          {/* Section heading */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end"
          >

            <div>

              <div className="mb-4 flex items-center gap-2.5">

                <span className="h-px w-7 bg-[#b79a61]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#8a805e]">
                  CITYSCAPE GREENERY
                </span>

              </div>

              <h2 className="font-serif text-3xl font-medium tracking-tight text-[#193b2b] sm:text-4xl lg:text-5xl">
                {title}
                <span className="ml-2 text-[#81977a]">.</span>
              </h2>

            </div>

            <div className="flex items-center gap-2 text-xs text-[#8b9385]">
              <Leaf size={15} />
              <span>Cityscape Greenery</span>
            </div>

          </motion.div>

          {/* Content card */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-[#e9e9df] bg-white shadow-[0_20px_65px_rgba(28,53,37,0.045)] sm:rounded-3xl"
          >

            <div className="h-1 w-full bg-gradient-to-r from-[#173d2d] via-[#b7a16e] to-[#e8e4d4]" />

            <div className="p-5 sm:p-8 md:p-10 lg:p-14">

              {page?.content ? (

                <>
                  {/* Hide duplicate About hero and footer.
                      Common hero and CTA are already provided here. */}

                  {hasCustomAboutLayout && (
                    <style>
                      {`
                        .cms-content .cg-about-hero,
                        .cms-content .cg-about-cta,
                        .cms-content .cg-about-footer {
                          display: none !important;
                        }

                        .cms-content .cg-about {
                          padding-top: 10px !important;
                          padding-bottom: 10px !important;
                        }
                      `}
                    </style>
                  )}

                  <div
                    className="cms-content"
                    dangerouslySetInnerHTML={{
                      __html: page.content
                    }}
                  />
                </>

              ) : (

                <div className="flex min-h-[280px] flex-col items-center justify-center px-3 py-12 text-center">

                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#edf2e9] text-[#416c4b]">
                    <Sprout size={35} strokeWidth={1.3} />
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-[#193b2b] sm:text-3xl">
                    Something Beautiful Is Growing
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
                    Our team is preparing this page.
                    Please come back soon to discover more.
                  </p>

                </div>

              )}

            </div>

          </motion.div>

        </div>

      </section>

      {/* =====================================
          COMMON BOTTOM CTA - ALL PAGES
      ===================================== */}

      <section className="relative overflow-hidden bg-[#eaf0e7] px-5 py-14 sm:px-10 sm:py-20">

        <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full border border-[#173d2d]/10" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">

          <div>

            <div className="mb-3 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#71836c] md:justify-start">
              <Sparkles size={14} />
              A GREENER WAY OF LIVING
            </div>

            <h2 className="max-w-xl font-serif text-3xl font-medium leading-tight text-[#193b2b] sm:text-4xl lg:text-5xl">
              Let's Bring More Nature Into Your Life.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#788375]">
              Your journey towards greener spaces starts here.
            </p>

          </div>

          <a
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-4 rounded-full bg-[#193b2b] px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-[#193b2b]/10 transition duration-300 hover:-translate-y-1 hover:bg-[#28583b]"
          >
            Get In Touch

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition group-hover:rotate-45">
              <ArrowUpRight size={18} />
            </span>

          </a>

        </div>

      </section>

    </main>
  );
};

export default CmsPage;
