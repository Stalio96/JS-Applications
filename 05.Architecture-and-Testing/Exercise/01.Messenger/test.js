const { chromium } = require('playwright-chromium');
const { expect } = require('chai');


describe('Messenger', async () => {

    let browser, page;

    before(async () => {
        browser = await chromium.launch({headless: false});
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });


    it('Is all messages loaded', async () => {
        await page.goto('http://localhost:5500');
        await page.click('text=Refresh');

        const text = await page.$$eval('textArea', (rows) => rows.map(r => r.value));

        expect(text[0]).to.equal('Spami: Hello, are you there?\nGarry: Yep, whats up :?\nSpami: How are you? Long time no see? :)\nGeorge: Hello, guys! :))\nSpami: Hello, George nice to see you! :)))')
    });

    it('create new message', async () => {
        await page.goto('http://localhost:5500');

        await page.fill('input#author', 'Author');
        await page.fill('input#content', 'Title');


        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('input#submit')
        ]);

        const data = JSON.parse(request.postData());
        expect(data.content).to.equal('Title');
        expect(data.author).to.equal('Author');
    })
})