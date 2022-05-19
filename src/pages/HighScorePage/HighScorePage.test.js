import { default as HighScorePage } from '.';
import { render, screen } from '@testing-library/react';
import React from 'react';
import axios from 'axios';

jest.mock('axios');

describe('HighScore', () => {

    beforeEach(() => {
        axios.get.mockResolvedValue({data: [{_id: 'hello', totWins: 1}]})
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
