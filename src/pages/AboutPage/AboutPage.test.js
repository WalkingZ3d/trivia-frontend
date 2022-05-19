import { default as About } from '.';
import { render } from '@testing-library/react';

describe('About', () => {

    beforeEach(() => {
        render(<About />)
    })

    test('it renders h1', () => {        
        const heading = document.getElementById('titleH1');
        expect(heading.textContent).toMatch("Welcome to Neweet's Trivia Game!");
    });

    test('it renders h4', () => {        
        const heading = document.getElementById('optionsInfoH4');
        expect(heading.textContent).toMatch("Pick the options for your game:");
    });

    test('normal span is green', () => {        
        const span = document.getElementById('infoLiSpan');
        span.style.color = '#0f0';
        expect(span).toHaveStyle({color: '#0f0'});
    });

    test('incorrect span is red', () => {        
        const span = document.getElementById('infoLiSpanRed');
        span.style.color = '#f00';
        expect(span).toHaveStyle({color: '#f00'});
    });

    test('play again span is blue', () => {        
        const span = document.getElementById('infoLiSpanCyan');
        span.style.color = 'cyan';
        expect(span).toHaveStyle({color: 'cyan'});
    });
    
    test('link takes you to home page', () => {
        const link = document.getElementById('playLink');
        expect(link).toHaveAttribute('href', '/')
    })

});