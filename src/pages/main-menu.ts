import { PageBase } from "./page-base";

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export class MainMenuPage extends PageBase {
    protected get pageLoadWaitElementLocator(): string {
        return ".navbar";
    }

    private get container(): WebdriverIO.Element {
        return browser.waitForElement(this.pageLoadWaitElementLocator, "menu container");
    }

    private get menuItems(): WebdriverIO.ElementArray {
        return this.container.waitForElements("#menu-mega-menu>li", "menu items");
    }

    private get subMenuItems(): WebdriverIO.ElementArray {
        return this.container.waitForElements(".sub-menu>li", "submenu items");
    }

    navigateToPage<T>(pageType: new () => T, menuItem: string, subMenuItem?: string): T {
        const item = this.menuItems.find(it => it.getText().trim().toLowerCase() == menuItem);

        if (!item) {
            throw new Error(`'${menuItem}' not found in main menu`);
        }

        if (subMenuItem) {
            item.moveTo();

            const subItem = this.subMenuItems.find(it => it.getText().toLowerCase().includes(subMenuItem));

            if (!subItem) {
                throw new Error(`'${subMenuItem}' not found in sub menu`);
            }
            subItem.moveTo();

            subItem.clickSafely(`Click sub menu item: ${subMenuItem}`);
        }

        else {
            item.clickSafely(`Click menu item: ${menuItem}`);
        }

        return new pageType();
    }
}