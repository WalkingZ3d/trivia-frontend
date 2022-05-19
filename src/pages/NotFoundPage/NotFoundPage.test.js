import { default as NotFoundPage } from '.';
import { render, fireEvent } from '@testing-library/react';
import * as React from 'react'

import * as router from 'react-router'

describe('NotFoundPage', () => {

    beforeEach(() => {
        render(<NotFoundPage />)
    })

    test('it renders h1', () => {        
        const heading = document.getElementById('titleNotFound');
        expect(heading.textContent).toMatch("404 - Not Found!");
    });

});

const navigate = jest.fn()

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})
  
describe('Not Found Page', () => {
    it('Should navigate to options page', () => {
      const { getByText } = render(<NotFoundPage />)
      fireEvent.click(getByText(/Home/i))
      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith('/')
    })
})