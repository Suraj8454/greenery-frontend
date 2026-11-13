// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { ArrowUpRight, Leaf, CalendarDays } from 'lucide-react';
// import { api, mediaUrl } from '../utils/api';
// export default function Blog() {
//   const { slug } = useParams();
//   const [posts, setPosts] = useState([]); const [article, setArticle] = useState(null); const [loading, setLoading] = useState(true);
//   useEffect(() => { setLoading(true); if (slug) api(`/blogs/${encodeURIComponent(slug)}`).then(setArticle).catch(error => { console.error('Blog article API:', error.message); setArticle(null); }).finally(() => setLoading(false)); else api('/blogs').then(data => setPosts(Array.isArray(data) ? data : [])).catch(error => { console.error('Blog API:', error.message); setPosts([]); }).finally(() => setLoading(false)); }, [slug]);
//   useEffect(() => {
//     if (!article) return;
//     const previousTitle = document.title;
//     document.title = article.meta_title || `${article.title} | Cityscape Greenery`;
//     const description = article.meta_description || article.excerpt || '';
//     const ensureMeta = (selector, create) => {
//       let element = document.head.querySelector(selector);
//       if (!element) { element = document.createElement('meta'); create(element); document.head.appendChild(element); }
//       return element;
//     };
//     const setMeta = (name, content, property = false) => {
//       const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
//       const element = ensureMeta(selector, el => property ? el.setAttribute('property', name) : el.setAttribute('name', name));
//       element.content = content || '';
//     };
//     setMeta('description', description);
//     setMeta('robots', article.meta_robots || 'index,follow');
//     setMeta('og:type', 'article', true);
//     setMeta('og:title', article.og_title || article.meta_title || article.title, true);
//     setMeta('og:description', article.og_description || description, true);
//     setMeta('og:image', article.image ? mediaUrl(article.image) : '', true);
//     setMeta('og:url', article.canonical_url || window.location.href, true);
//     setMeta('twitter:card', article.image ? 'summary_large_image' : 'summary');
//     setMeta('twitter:title', article.og_title || article.meta_title || article.title);
//     setMeta('twitter:description', article.og_description || description);
//     if (article.image) setMeta('twitter:image', mediaUrl(article.image));
//     let canonical = document.head.querySelector('link[rel="canonical"]');
//     if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
//     canonical.href = article.canonical_url || window.location.href;
//     const schema = {
//       '@context': 'https://schema.org',
//       '@type': 'BlogPosting',
//       headline: article.title,
//       description,
//       image: article.image ? [mediaUrl(article.image)] : undefined,
//       datePublished: article.published_at || undefined,
//       dateModified: article.updated_at || article.published_at || undefined,
//       author: { '@type': 'Person', name: article.author || 'Cityscape Team' },
//       mainEntityOfPage: article.canonical_url || window.location.href,
//       publisher: { '@type': 'Organization', name: 'Cityscape Greenery' }
//     };
//     let script = document.getElementById('blog-article-schema');
//     if (!script) { script = document.createElement('script'); script.id = 'blog-article-schema'; script.type = 'application/ld+json'; document.head.appendChild(script); }
//     script.textContent = JSON.stringify(schema);
//     return () => { document.title = previousTitle; };
//   }, [article]);
//   if (slug) return <section className="min-h-[70vh] bg-[#fcfbf7] px-4 py-12 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl">{loading ? <p className="py-16 text-center">Loading article…</p> : article ? <><Link to="/blog" className="text-sm font-bold text-[#2d6a4f]">← All articles</Link>{article.image && <img src={mediaUrl(article.image)} alt={article.title} className="mt-6 max-h-[480px] w-full rounded-3xl object-cover"/>}<p className="mt-8 text-xs font-bold uppercase tracking-widest text-[#2d6a4f]">{article.category || 'The Green Journal'}</p><p className="mt-2 text-xs text-gray-500">By {article.author || 'Cityscape Team'} · {article.reading_minutes || 1} min read</p><h1 className="mt-3 font-serif text-4xl font-bold text-[#1a3c2e]">{article.title}</h1>{article.excerpt && <p className="mt-4 text-lg text-gray-500">{article.excerpt}</p>}{article.hashtags && <p className="mt-4 text-sm text-[#2d6a4f]">{String(article.hashtags).split(',').map(x=>x.trim().startsWith('#')?x.trim():`#${x.trim()}`).join(' ')}</p>}<div className="prose prose-stone mt-8 max-w-none leading-8" dangerouslySetInnerHTML={{ __html: article.content || '' }} /></> : <div className="py-20 text-center"><h1 className="text-3xl font-bold">Article not found</h1><Link to="/blog" className="mt-4 inline-block text-[#2d6a4f]">Back to blog</Link></div>}</div></section>;
//   return <section className="min-h-[70vh] bg-[#fcfbf7] px-4 py-12 sm:px-6 lg:px-8 md:py-16"><div className="mx-auto max-w-7xl"><div className="mx-auto mb-12 max-w-3xl text-center"><span className="inline-flex items-center gap-2 rounded-full bg-[#eef2ed] px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-[#2d6a4f]"><Leaf className="h-4 w-4"/> The Green Journal</span><h1 className="mt-5 font-serif text-4xl font-bold text-[#1a3c2e] sm:text-5xl">Ideas for a greener life</h1><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">Plant care tips, styling inspiration and thoughtful ways to bring nature into your everyday spaces.</p></div>
//   {loading ? <p className="py-16 text-center text-gray-500">Loading articles…</p> : posts.length ? <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{posts.map(post => <article key={post.id} className="group overflow-hidden rounded-3xl border border-[#e7ece6] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><Link to={`/blog/${post.slug}`} className="block"><div className="aspect-[4/3] overflow-hidden bg-[#eef2ed]"><img src={mediaUrl(post.image)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" onError={e => { e.currentTarget.style.display='none'; }}/></div><div className="p-6"><div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#2d6a4f]"><CalendarDays className="h-3.5 w-3.5"/>{post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Cityscape Journal'}</div><h2 className="font-serif text-2xl font-bold leading-tight text-[#1a3c2e] group-hover:text-[#2d6a4f]">{post.title}</h2><p className="mt-3 text-sm leading-6 text-gray-500">{post.excerpt || String(post.content || '').replace(/<[^>]*>/g, '').slice(0, 150)}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2d6a4f]">Read article <ArrowUpRight className="h-4 w-4"/></span></div></Link></article>)}</div> : <div className="rounded-3xl border border-dashed border-[#cbd8cd] bg-white p-12 text-center"><h2 className="font-serif text-2xl font-bold text-[#1a3c2e]">New stories are growing</h2><p className="mt-2 text-sm text-gray-500">Published blog articles from our team will appear here.</p></div>}</div></section>;
// }


import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Leaf,
  CalendarDays,
  Clock,
  Sparkles,
  ChevronRight,
  User,
} from 'lucide-react';
import { api, mediaUrl } from '../utils/api';

export default function Blog() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setLoading(true);
    if (slug) {
      api(`/blogs/${encodeURIComponent(slug)}`)
        .then(setArticle)
        .catch((error) => {
          console.error('Blog article API:', error.message);
          setArticle(null);
        })
        .finally(() => setLoading(false));
    } else {
      api('/blogs')
        .then((data) => setPosts(Array.isArray(data) ? data : []))
        .catch((error) => {
          console.error('Blog API:', error.message);
          setPosts([]);
        })
        .finally(() => setLoading(false));
    }
  }, [slug]);

  useEffect(() => {
    if (!article) return;
    const previousTitle = document.title;
    document.title = article.meta_title || `${article.title} | Cityscape Greenery`;
    const description = article.meta_description || article.excerpt || '';
    const ensureMeta = (selector, create) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        create(element);
        document.head.appendChild(element);
      }
      return element;
    };
    const setMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      const element = ensureMeta(selector, (el) =>
        property ? el.setAttribute('property', name) : el.setAttribute('name', name)
      );
      element.content = content || '';
    };
    setMeta('description', description);
    setMeta('robots', article.meta_robots || 'index,follow');
    setMeta('og:type', 'article', true);
    setMeta('og:title', article.og_title || article.meta_title || article.title, true);
    setMeta('og:description', article.og_description || description, true);
    setMeta('og:image', article.image ? mediaUrl(article.image) : '', true);
    setMeta('og:url', article.canonical_url || window.location.href, true);
    setMeta('twitter:card', article.image ? 'summary_large_image' : 'summary');
    setMeta('twitter:title', article.og_title || article.meta_title || article.title);
    setMeta('twitter:description', article.og_description || description);
    if (article.image) setMeta('twitter:image', mediaUrl(article.image));
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = article.canonical_url || window.location.href;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description,
      image: article.image ? [mediaUrl(article.image)] : undefined,
      datePublished: article.published_at || undefined,
      dateModified: article.updated_at || article.published_at || undefined,
      author: { '@type': 'Person', name: article.author || 'Cityscape Team' },
      mainEntityOfPage: article.canonical_url || window.location.href,
      publisher: { '@type': 'Organization', name: 'Cityscape Greenery' },
    };
    let script = document.getElementById('blog-article-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'blog-article-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    return () => {
      document.title = previousTitle;
    };
  }, [article]);

  /* ============================================================
     ARTICLE VIEW
     ============================================================ */
  if (slug) {
    return (
      <section className="relative min-h-[70vh] bg-gradient-to-b from-[#fbfcf9] via-white to-[#fbfcf9] px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#e8f1e8]/60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#f0f5ec]/70 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl">
          {loading ? (
            <p className="py-16 text-center text-gray-500">Loading article…</p>
          ) : article ? (
            <motion.article
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Back link */}
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#2d6a4f] shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-[#2d6a4f] hover:bg-white"
              >
                <ChevronRight className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-0.5" />
                All articles
              </Link>

              {/* Hero image */}
              {article.image && (
                <div className="mt-6 overflow-hidden rounded-3xl shadow-[0_4px_24px_rgba(26,60,46,0.06)]">
                  <img
                    src={mediaUrl(article.image)}
                    alt={article.title}
                    className="max-h-[480px] w-full object-cover"
                  />
                </div>
              )}

              {/* Meta */}
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dce9dc] bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2d6a4f] shadow-sm backdrop-blur-sm">
                  <Leaf className="h-3 w-3" />
                  {article.category || 'The Green Journal'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f8f2] px-3 py-1.5 text-[10px] font-semibold text-[#2d6a4f]">
                  <User className="h-3 w-3" />
                  {article.author || 'Cityscape Team'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f8f2] px-3 py-1.5 text-[10px] font-semibold text-[#2d6a4f]">
                  <Clock className="h-3 w-3" />
                  {article.reading_minutes || 1} min read
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.15] tracking-tight text-[#1a3c2e] sm:text-4xl">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="mt-4 text-base leading-relaxed text-gray-500 sm:text-lg">
                  {article.excerpt}
                </p>
              )}

              {/* Hashtags */}
              {article.hashtags && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {String(article.hashtags)
                    .split(',')
                    .map((x) => x.trim())
                    .filter(Boolean)
                    .map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-[#f4f8f2] px-2.5 py-1 text-[11px] font-medium text-[#2d6a4f]"
                      >
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                </div>
              )}

              {/* Divider */}
              <div className="mt-7 h-px w-16 bg-gradient-to-r from-transparent via-[#9bb89b] to-transparent" />

              {/* Content */}
              <div
                className="prose prose-stone mt-8 max-w-none leading-8 prose-headings:font-serif prose-headings:text-[#1a3c2e] prose-a:text-[#2d6a4f] prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: article.content || '' }}
              />
            </motion.article>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf1e6] text-[#2d6a4f]">
                <Leaf className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-serif font-bold text-[#1a3c2e] sm:text-3xl">
                Article not found
              </h1>
              <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
                This story may have moved or the link might be broken.
              </p>
              <Link
                to="/blog"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a3c2e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2d6a4f]"
              >
                Back to blog <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ============================================================
     BLOG LIST VIEW
     ============================================================ */
  return (
    <section className="relative min-h-[70vh] bg-gradient-to-b from-[#fbfcf9] via-white to-[#fbfcf9] px-4 py-16 sm:px-6 lg:px-8 md:py-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#e8f1e8]/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#f0f5ec]/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">

        {/* ===== Header ===== */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Leaf className="h-3.5 w-3.5 text-[#2d6a4f]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2d6a4f] sm:text-xs">
              The Green Journal
            </span>
          </div>

          <h1 className="font-serif text-2xl font-medium leading-[1.15] tracking-tight text-[#1a3c2e] sm:text-3xl lg:text-4xl">
            Ideas for a{' '}
            <span className="italic text-[#2d6a4f]">greener</span> life
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-gray-500 sm:text-base">
            Plant care tips, styling inspiration and thoughtful ways to bring
            nature into your everyday spaces.
          </p>

          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#9bb89b] to-transparent" />
        </motion.div>

        {/* ===== Posts grid ===== */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-3xl border border-[#edf0e9] bg-white"
              >
                <div className="aspect-[4/3] bg-[#eef2ed]" />
                <div className="p-6">
                  <div className="mb-3 h-3 w-24 rounded bg-[#E9EDE5]" />
                  <div className="mb-2 h-5 w-full rounded bg-[#E9EDE5]" />
                  <div className="mb-2 h-5 w-2/3 rounded bg-[#E9EDE5]" />
                  <div className="mt-4 mb-2 h-3 w-full rounded bg-[#E9EDE5]" />
                  <div className="h-3 w-5/6 rounded bg-[#E9EDE5]" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {posts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(idx * 0.05, 0.25),
                  ease: 'easeOut',
                }}
                className="group overflow-hidden rounded-3xl border border-[#edf0e9] bg-white shadow-[0_2px_12px_rgba(30,60,40,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9ddc9] hover:shadow-[0_12px_36px_rgba(45,106,79,0.10)]"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden bg-[#eef2ed]">
                    <img
                      src={mediaUrl(post.image)}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2d6a4f]">
                      <CalendarDays className="h-3 w-3" />
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Cityscape Journal'}
                    </div>

                    <h2 className="font-serif text-xl font-bold leading-tight tracking-tight text-[#1a3c2e] transition-colors group-hover:text-[#2d6a4f] sm:text-2xl">
                      {post.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                      {post.excerpt ||
                        String(post.content || '')
                          .replace(/<[^>]*>/g, '')
                          .slice(0, 150)}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2d6a4f] transition-all group-hover:gap-2.5">
                      Read article
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-[#cbd8cd] bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf1e6] text-[#2d6a4f]">
              <Sparkles className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#1a3c2e] sm:text-2xl">
              New stories are growing
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Published blog articles from our team will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}