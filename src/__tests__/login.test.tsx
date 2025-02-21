// src/__tests__/LoginPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '@/app/login/page';
import { signIn } from 'next-auth/react';

// Mock the signIn function
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  useSession: () => ({ data: null, status: 'unauthenticated' }),
}));

describe('LoginPage', () => {
  it('renders a "Sign in with Google" button', () => {
    render(<LoginPage />);
    const button = screen.getByRole('button', { name: /sign in with google/i });
    expect(button).toBeInTheDocument();
  });

  it('calls signIn with "google" when button is clicked', () => {
    render(<LoginPage />);
    const button = screen.getByRole('button', { name: /sign in with google/i });
    fireEvent.click(button);
    expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/dashboard' });
  });
});
