import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Glossary from './Glossary';

describe('Glossary Component', () => {
    it('Renders Glossary component', () => {
        act(() => {
            render(<Glossary />);
        });

        act(() => {
            expect(screen.getByTestId('glossary-component')).toBeInTheDocument();
        });
    });
});