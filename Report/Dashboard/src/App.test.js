import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Login Form', () => {
    render(<App />);

    expect(screen.getByTestId('logincontent-component')).toBeInTheDocument();
});
