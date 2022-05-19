import { default as HighScorePage } from '.';
import { render } from '@testing-library/react';
import React from 'react';


describe('About', () => {

    beforeEach(() => {
        render(<HighScorePage />)
    })

    test('it renders h1', () => {        
        const heading = document.getElementById('titleH1');
        expect(heading.textContent).toMatch("Leaderboard");
    });

});

jest.mock('axios');

describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {

  });

  it('fetches erroneously data from an API', async () => {
  });
});






// afterEach(cleanup);



// it('fetches successfully data from an API', async () => {
//     axiosMock.get.mockResolvedValueOnce({data: {greeting: 'hello'}})

//     const {getAllByTestId} = render(<HighScorePage />)

//     const resolved = await waitForElement(() => getByTestId('loading'));

//     expect(resolved).toHaveTextContent('hello')

//     expect(axiosMock.get).toHaveBeenCalledTimes(1);

// });