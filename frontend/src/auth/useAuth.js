import { useContext } from 'react';
import AuthContext from './AuthContext';

/**
 * Custom hook to access authentication context
 * @returns {Object} Auth context value containing user, loading, signInWithGoogle, and logout
 * @throws {Error} If used outside of AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
