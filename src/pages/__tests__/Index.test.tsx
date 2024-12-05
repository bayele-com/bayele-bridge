import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from '../Index';

describe('Index Page', () => {
  it('renders the welcome message', () => {
    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Welcome to Bayele/i)).toBeInTheDocument();
  });

  it('renders the main call-to-action buttons', () => {
    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Find a House/i)).toBeInTheDocument();
    expect(screen.getByText(/List & Sell/i)).toBeInTheDocument();
    expect(screen.getByText(/Promote & Earn/i)).toBeInTheDocument();
    expect(screen.getByText(/Post an Ad/i)).toBeInTheDocument();
  });
});