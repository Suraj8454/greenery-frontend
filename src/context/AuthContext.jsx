import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, getToken } from '../utils/api';
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('cs_currentUser') || 'null'); } catch { return null; } });
  const [pendingPhone, setPendingPhone] = useState('');
  useEffect(() => { if (getToken()) api('/auth/me').then(u => { setUser(u); localStorage.setItem('cs_currentUser', JSON.stringify(u)); }).catch(() => { localStorage.removeItem('cs_token'); localStorage.removeItem('cs_currentUser'); setUser(null); }); }, []);
  const sendOtp = async (phone) => { try { const data = await api('/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone }) }); setPendingPhone(phone); return { success: true, otp: data.otp, message: data.message }; } catch (e) { return { success: false, error: e.message }; } };
  const verifyOtp = async (phone, otp) => { try { if (phone !== pendingPhone) return { success: false, error: 'Request OTP again' }; const data = await api('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone, otp }) }); localStorage.setItem('cs_token', data.token); localStorage.setItem('cs_currentUser', JSON.stringify(data.user)); setUser(data.user); setPendingPhone(''); return { success: true, user: data.user }; } catch (e) { return { success: false, error: e.message }; } };
  const signup = async (form) => { try { await api('/auth/signup', { method: 'POST', body: JSON.stringify(form) }); return await sendOtp(form.phone); } catch (e) { return { success: false, error: e.message }; } };
  const logout = () => { localStorage.removeItem('cs_token'); localStorage.removeItem('cs_currentUser'); setUser(null); setPendingPhone(''); };
  return <AuthContext.Provider value={{ user, sendOtp, verifyOtp, signup, logout, pendingPhone }}>{children}</AuthContext.Provider>;
};
