import { PageBase } from "./page-base";

export class cookieAlertPage extends PageBase {
    protected get pageLoadWaitElementLocator(): string {
        return "#hs-eu-cookie-confirmation";
    }

    private get acceptButton(): WebdriverIO.Element {
        return browser.waitForElement("#hs-eu-confirmation-button", "accept button")
    }

    acceptCookies(): void {
        this.acceptButton.clickSafely("accept");
    }
}
