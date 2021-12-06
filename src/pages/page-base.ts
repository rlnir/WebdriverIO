export abstract class PageBase {
    constructor() {
        this.waitForPageLoad();
    }

    protected get className(): string {
        return this.constructor.name;
    }

    

    protected abstract get pageLoadWaitElementLocator(): string;

    protected waitForPageLoad(): void {
        const className = this.className;

        try {
            browser.waitForElement(this.pageLoadWaitElementLocator, `Page load element: ${this.pageLoadWaitElementLocator} in ${className}`);

            console.info(`${className} loaded (${browser.getUrl()})`);
        }
        catch (err) {
            const message = `Element '${this.pageLoadWaitElementLocator}' in ${className} not found after ${browser.config.waitforTimeout}ms. Error: ${err}`;
            console.error(message);
            throw new Error(message);
        }
    }
}
