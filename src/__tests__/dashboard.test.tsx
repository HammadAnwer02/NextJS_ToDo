import { render, screen } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock useSession
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

// Create a mock for useRouter.push
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Stub global fetch to return an empty list for todos
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe('Dashboard', () => {
  it('displays welcome message when session is present', async () => {
    // Provide a mocked authenticated session
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'Test User' } },
      status: 'authenticated',
    });

    render(<Dashboard />);

    // Using findByText to await for the element to appear.
    const welcomeMessage = await screen.findByText(/welcome, test user/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
