import { default as HighScorePage } from '.';
import { render } from '@testing-library/react';
import { getQuestions } from '.'

describe('About', () => {

    beforeEach(() => {
        render(<HighScorePage />)
    })

    test('it renders h1', () => {        
        const heading = document.getElementById('titleH1');
        expect(heading.textContent).toMatch("Leaderboard");
    });

    

});

describe('getQuestions', () => {
    it('fetches successfully data from an API', async () => {
  
    });
  
    it('fetches erroneously data from an API', async () => {
  
    });
  });