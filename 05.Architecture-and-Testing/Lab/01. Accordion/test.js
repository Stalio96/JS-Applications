const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;

it('load static page', async () => {

    await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html');

    const content = await page.textContent('accordion .head span');
    expect(content).to.contains('Scalable Vector Graphics');
})