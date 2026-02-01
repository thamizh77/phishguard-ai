import { useAuth } from './useAuth';

export default function GoogleLoginButton() {
  const { loginWithGoogle, loading } = useAuth();

  const handleClick = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      // Error is already logged in AuthContext
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
    >
      {loading ? 'Signing in...' : 'Sign in with Google'}
    </button>
  );
}
