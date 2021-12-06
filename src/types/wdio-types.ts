/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

export { };
declare global {
    namespace WebdriverIO {
        interface Browser {
            waitForElement: (selector: string, description: string, shouldBeVisible?: boolean, timeout?: number, isDeepSelector?: boolean) =>
                Element;

            waitForElements: (selector: string, description: string, shouldBeVisible?: boolean, timeout?: number, isDeepSelector?: boolean) =>
                ElementArray;

            waitToDisappearBy: (locator: string, description: string, shouldBeVisible?: boolean, timeout?: number, isDeepSelector?: boolean, doTryFindElement?: boolean) =>
                void;

            clickSafelyBy: (selector: string, description: string, shouldBeVisible?: boolean, isWaitForClickable?: boolean, timeout?: number, forceClick?: boolean, isDeepSelector?: boolean) =>
                Element;
        }

        //@ts-ignore
        interface Element {
            waitForElement: (selector: string, description: string, shouldBeVisible?: boolean, timeout?: number, isDeepSelector?: boolean) =>
                Element;

            waitForElements: (selector: string, description: string, shouldBeVisible?: boolean, timeout?: number, isDeepSelector?: boolean) =>
                ElementArray;

            waitToDisappear: (description: string, shoudBeVisible?: boolean, timeout?: number) =>
                void;

            clickSafely: (elementDescription: string, isWaitForClickable?: boolean, timeout?: number, forceClick?: boolean) => void;
        }
    }
}
