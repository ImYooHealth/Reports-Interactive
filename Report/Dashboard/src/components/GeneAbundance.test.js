import React from 'react';
import { act, render, screen } from '@testing-library/react';
import GeneAbundance from './GeneAbundance';

describe('GeneAbundance Component', () => {
    beforeEach(() => {
        global.document = document;
    });

    it('Renders Gene Abundance component', () => {
        act(() => {
            render(<GeneAbundance title="Gene Abundance" />);
        });

        act(() => {
            expect(screen.getByTestId('geneabundance-component')).toBeInTheDocument();
        });

        act(() => {
            expect(screen.getByTestId('geneabundance-abundance-component')).toBeInTheDocument();
        });

        act(() => {
            expect(screen.getByTestId('comment-box')).toBeInTheDocument();
        });
    });
});
