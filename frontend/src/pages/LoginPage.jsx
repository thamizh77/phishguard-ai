import GoogleLoginButton from '../auth/GoogleLoginButton';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="glass-card w-full max-w-md p-10 text-center">
        <h2 className="text-xl font-semibold mb-6 text-white">
          Sign in to continue
        </h2>
        <GoogleLoginButton />
      </div>
    </div>
  );
}
