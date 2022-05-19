import { default as Index } from '.';
import { render, fireEvent } from '@testing-library/react';
import * as React from 'react'

import * as router from 'react-router'


describe('Index', () => {

    beforeEach(() => {
        render(<Index />)
    })

    test('it renders h1', () => {        
        const heading = document.getElementById('titleH1');
        expect(heading.textContent).toMatch("Trivia Quiz");
    });
});


const navigate = jest.fn()

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})
  
describe('Index Page', () => {
    it('Should navigate to options page', () => {
      const { getByText } = render(<Index />)
      fireEvent.click(getByText(/Play/i))
      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith('/options')
    })
})