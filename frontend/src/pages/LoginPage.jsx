import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login({
        email: form.email.trim(),
        password: form.password
      });
      navigate('/');
    } catch (err) {
      const serverMessage = err?.response?.data?.message;
      setError(serverMessage || 'Unable to sign in. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Account</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Login</h1>
        <p className="mt-2 text-slate-600">Sign in with your registered email and password.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          New here?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}

