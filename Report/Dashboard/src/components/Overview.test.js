import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import Overview from './Overview';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Overview Component', () => {
    it('Renders Overview component', async () => {
        act(() => {
            render(<Router><Overview /></Router>);
        });

        act(() => {
            expect(screen.getByTestId('overview-component')).toBeInTheDocument();
        });
    });
});