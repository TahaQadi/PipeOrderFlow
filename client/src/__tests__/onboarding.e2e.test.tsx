
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { render, createTestQueryClient } from './test-utils';
import OnboardingPage from '@/pages/OnboardingPage';

// Mock wouter
vi.mock('wouter', () => ({
  useLocation: () => ['/', vi.fn()],
}));

describe('Onboarding E2E Flow', () => {
  let queryClient: ReturnType<typeof createTestQueryClient>;

  beforeEach(() => {
    queryClient = createTestQueryClient();
  });

  it('should complete full onboarding process', async () => {
    const user = userEvent.setup();
    
    render(<OnboardingPage />, { queryClient });

    // Step 1: User Account
    const emailInput = screen.getByTestId('input-user-email');
    await user.type(emailInput, 'test@example.com');

    const passwordInput = screen.getByTestId('input-user-password');
    await user.type(passwordInput, 'password123');

    const confirmPasswordInput = screen.getByTestId('input-user-confirm-password');
    await user.type(confirmPasswordInput, 'password123');

    const nextButton = screen.getByTestId('button-next');
    await user.click(nextButton);

    // Step 2: Company Info
    await waitFor(() => {
      expect(screen.getByTestId('input-company-name-ar')).toBeInTheDocument();
    });

    const companyNameAr = screen.getByTestId('input-company-name-ar');
    await user.type(companyNameAr, 'شركة تجريبية');

    await user.click(nextButton);

    // Verify we moved to step 3
    await waitFor(() => {
      expect(screen.getByTestId('input-location-name-ar')).toBeInTheDocument();
    });
  });
});
