import React from 'react';
import { act, render, screen } from '@testing-library/react';
import CellAbundance from './CellAbundance';

describe('CellAbundance Component', () => {
    beforeEach(() => {
        global.document = document;
    });

    it('Renders Cell Abundance component', () => {
        act(() => {
            render(<CellAbundance title="Some Title" />);
        });

        act(() => {
            expect(screen.getByText('Cell Abundance')).toBeInTheDocument();
        });

        act(() => {
            expect(screen.getByTestId('cellabundance-component')).toBeInTheDocument();
        });

        act(() => {
            expect(screen.getByTestId('cellabundance-abundance-component')).toBeInTheDocument();
        });

        act(() => {
            expect(screen.getByTestId('comment-box')).toBeInTheDocument();
        });
    });
});