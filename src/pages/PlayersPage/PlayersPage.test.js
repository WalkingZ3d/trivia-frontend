import { default as PlayersPage } from '.';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('HighScore', () => {

    beforeEach(() => {
        render(<HighScorePage />)
    })

    test('it renders h1', () => {        
        const heading = screen.getByRole('heading');
        expect(heading.textContent).toMatch("Leaderboard");
    });

    test('should call axios.get', async () => {
        expect(axios.get).toHaveBeenCalled();        
    });

    test('it displays the data as paragraphs', () => {
        const para = screen.getByText('hello');
        expect(para.textContent).toBe('hello1')
    })
});
