import { useEffect, useState } from 'react';
import { api } from '../utils/api';
export const useSiteSettings = () => { const [settings, setSettings] = useState({}); useEffect(() => { api('/settings').then(setSettings).catch(() => {}); }, []); return settings; };
