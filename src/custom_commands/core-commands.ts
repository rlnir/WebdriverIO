class CoreCommands {

    addCoreCommands(): void {
        const configTimeout = browser.config.waitforTimeout as number;

        function waitForElementBrowser(selector: string, description: string, shouldBeVisible = true, timeout = configTimeout, isDeepSelector = false): WebdriverIO.Element {
            const deepSelector = isDeepSelector ? ">>>" : "";

            const element = browser.$(`${deepSelector}${selector}`);

            return waitForElementInternal(element, description, shouldBeVisible, timeout);
        }

        function waitForElementElement(selector: string, description: string, shouldBeVisible = true, timeout = configTimeout, isDeepSelector = false): WebdriverIO.Element {
            const deepSelector = isDeepSelector ? ">>>" : "";
            // `this` is return value of $(selector)
            // @ts-ignore
            const container = this as WebdriverIO.Element;

            const element = container.$(`${deepSelector}${selector}`);

            return waitForElementInternal(element, description, shouldBeVisible, timeout);
        }

        function waitForElementInternal(element: WebdriverIO.Element, description: string, shouldBeVisible = true, timeout: number = configTimeout): WebdriverIO.Element {
            element.waitForExist({ timeout: timeout, reverse: false, timeoutMsg: `'${description}' not found after ${timeout} ms` });

            if (shouldBeVisible == true) {
                element.waitForDisplayed({ timeout: timeout, reverse: false, timeoutMsg: `'${description}' not diplayed after ${timeout} ms` });
            }

            return element;
        }

        function waitForElementsBrowser(selector: string, description: string, shouldBeVisible = false, timeout = configTimeout, isDeepSelector = false): WebdriverIO.ElementArray {
            const container = browser as WebdriverIO.Browser;

            return waitForElementsInternal(container, selector, description, shouldBeVisible, timeout, isDeepSelector);
        }

        function waitForElementsElement(selector: string, description: string, shouldBeVisible = false, timeout: number = configTimeout, isDeepSelector = false): WebdriverIO.ElementArray {
            // `this` is return value of $(selector)
            // @ts-ignore
            const container = this as WebdriverIO.Element;

            return waitForElementsInternal(container, selector, description, shouldBeVisible, timeout, isDeepSelector);
        }

        function waitForElementsInternal(container: WebdriverIO.Browser | WebdriverIO.Element, selector: string, description: string, shouldBeVisible: boolean, timeout: number, isDeepSelector: boolean): WebdriverIO.ElementArray {
            const deepSelector = isDeepSelector ? ">>>" : "";
            let elements: WebdriverIO.ElementArray = new Array<WebdriverIO.Element>() as WebdriverIO.ElementArray;

            const toTime = Date.now() + timeout;

            while (elements.length == 0 && Date.now() < toTime) {
                browser.pause(250);

                elements = container.$$(`${deepSelector}${selector}`);
            }

            if (shouldBeVisible) {
                if (elements != undefined && elements.length > 0) {
                    elements[0].waitForDisplayed({ timeout: timeout });
                }
                else {
                    throw new Error(`No elements displayed for '${description}' after ${timeout} ms`);
                }
            }

            return elements;
        }

        function waitToDisappearBrowser(locator: string, description: string, shouldBeVisible = true, timeout = configTimeout, isDeepSelector = false, doTryFindElement = false): void {
            const toTime = Date.now() + timeout;
            const deepSelector = isDeepSelector ? ">>>" : "";
            let isExists = true;
            locator = `${deepSelector}${locator}`;

            if (browser.$(locator).error?.message.includes("no such element")) {
                if (!doTryFindElement) {
                    throw new Error(`waitToDisappear: '${description}' not found`);
                }
                else {
                    console.warn(`waitToDisappear: '${description}' not found. Skipping the wait...`);

                    return;
                }
            }

            while (isExists == true && Date.now() < toTime) {
                try {
                    if (shouldBeVisible) {
                        isExists = $(locator).isDisplayed();
                    }
                    else {
                        isExists = $(locator).isExisting();
                    }
                }
                catch
                {
                    console.warn(`waitToDisappear: ${description} not found in repeat.`);
                    isExists = false;
                    break;
                }

                browser.pause(50);
            }

            if (isExists) {
                throw new Error(`'${description}' did not disappear after ${timeout} ms`);
            }
        }

        function waitToDisappearElement(description: string, shoudBeVisible = true, timeout: number = configTimeout): void {
            // `this` is return value of $(selector)
            // @ts-ignore
            const element = this as WebdriverIO.Element;

            const toTime = Date.now() + timeout;

            let isExists = true;

            while (isExists == true && Date.now() < toTime) {
                browser.pause(200);

                try {
                    if (shoudBeVisible) {
                        isExists = element.isDisplayed();
                    }
                    else {
                        isExists = element.isExisting();
                    }
                }
                catch
                {
                    console.warn(`waitToDisappear: ${description} not found.`);
                    isExists = false;
                    break;
                }
            }

            if (isExists) {
                throw new Error(`waitToDisappear: '${description}' did not disappear after ${timeout} ms`);
            }
        }

        function clickSafelyBrowser(selector: string, elementDescription: string, shouldBeVisible = true, isWaitForClickable = true, timeout: number = configTimeout, forceClick = false, isDeepSelector = false): void {
            const deepSelector = isDeepSelector ? ">>>" : "";
            const element = browser.$(`${deepSelector}${selector}`);

            element.waitForExist({ timeout: timeout, reverse: false, timeoutMsg: `'${elementDescription}' not found after ${timeout} ms` });

            if (shouldBeVisible == true) {
                element.waitForDisplayed({ timeout: timeout, reverse: false, timeoutMsg: `'${elementDescription}' not diplayed after ${timeout} ms` });
            }

            clickSafelyInternal(element, elementDescription, isWaitForClickable, timeout, forceClick);
        }

        function clickSafelyElement(elementDescription: string, isWaitForClickable = true, timeout = configTimeout, forceClick = false): void {
            // `this` is return value of $(selector)
            // @ts-ignore
            const element = this as WebdriverIO.Element;

            clickSafelyInternal(element, elementDescription, isWaitForClickable, timeout, forceClick);
        }

        function clickSafelyInternal(element: WebdriverIO.Element, elementDescription: string, isWaitForClickable = true, timeout: number, forceClick: boolean): void {
            timeout = timeout == undefined ? configTimeout : timeout;

            console.log(`Clicking on '${elementDescription}' (locator: ${element.selector})`);

            if (isWaitForClickable) {
                browser.waitUntil(() => element.isClickable(), { timeout: timeout, timeoutMsg: `${elementDescription} was not clickable after ${timeout} ms ` });
            }

            try {
                element.click();
                return;
            }
            catch (err) {
                console.warn(`Click on '${elementDescription}' (locator: ${element.selector}) failed: ${err}. Trying to scroll into view...`);
            }

            element.moveTo();

            try {
                element.click();
                return;
            }
            catch (err) {
                console.warn(`Clicking after scroll into view also failed: ${err}`);
            }

            if (forceClick) {
                console.log(`Regular click failed. Forcing click on ${element.selector}`);

                browser.execute(
                    "arguments[0].click()", element
                );
            }
            else {
                console.log(`clickSafely on '${elementDescription}'(${element.selector}) failed with parameters: isWaitForClickable= ${isWaitForClickable}, timeout= ${timeout}, forceClick= ${forceClick}`);
            }
        }

        browser.addCommand("waitForElement", waitForElementBrowser);

        browser.addCommand("waitForElement", waitForElementElement, true);

        browser.addCommand("waitForElements", waitForElementsBrowser);

        browser.addCommand("waitForElements", waitForElementsElement, true);

        browser.addCommand("waitToDisappearBy", waitToDisappearBrowser);

        browser.addCommand("waitToDisappear", waitToDisappearElement, true);

        browser.addCommand("clickSafely", clickSafelyElement, true);

        browser.addCommand("clickSafelyBy", clickSafelyBrowser);
    }
}

export default new CoreCommands();