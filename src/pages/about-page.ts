import { Card } from '../entities/card';
import { BaseAppPage } from "./base-app-page";

export class AboutPage extends BaseAppPage {
    protected get pageLoadWaitElementLocator(): string {
        return ".page-about";
    }

    get cardLocator(): string {
        return ".our-team__member";
    }

    get cardQuote(): string {
        return ".our-team__quate";
    }

    get cardtitle(): string {
        return ".our-team__position";
    }

    get cardName(): string {
        return "h4";
    }

    getCard(index: number): Card {
        const card = new Card();

        const cardContainer = browser.waitForElements(this.cardLocator, "card")[index];

        cardContainer.scrollIntoView();

        card.name = cardContainer.waitForElement(this.cardName, "Card Name").getText();
        card.title = cardContainer.waitForElement(this.cardtitle, "Card Title").getText();
        card.quote = cardContainer.waitForElement(this.cardQuote, "Card Name").getText();

        return card;
    }
}
