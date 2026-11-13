import { useEffect, useState } from 'react';
import { api } from '../utils/api';
const fallback = {};
export default function useSection(key) {
  const [section, setSection] = useState(fallback);
  useEffect(() => { let live = true; api(`/sections/${encodeURIComponent(key)}`).then(data => { if (live) setSection(data || {}); }).catch(() => {}); return () => { live = false; }; }, [key]);
  return section;
}
