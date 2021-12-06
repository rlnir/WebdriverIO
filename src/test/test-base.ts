import { Capabilities } from "@wdio/types";
import fileServices from "../helpers/file-services";
import { cookieAlertPage } from '../pages/alert-page';

export function TEST_(suiteName: string): string {
  //@ts-ignore
  const browserMode = browser.config.browserMode == undefined ? "" : browser.config.browserMode;

  return `${(browser.capabilities as Capabilities.DesiredCapabilities).browserName}${browserMode}_${suiteName}`;
}
beforeEach(function () {
  browser.url(browser.config.baseUrl as string);

  browser.maximizeWindow();

  try {
    new cookieAlertPage().acceptCookies();
  }
  catch (e) {
    console.info("cookie alert not found");
  }
});

afterEach(function () {
  const testTitle = this.currentTest?.title;
  if (this.currentTest?.isPassed() != true) {
    console.error("Test failed!!!");

    fileServices.write(`${testTitle}: Test failed! ${Date.now()}\n`);
  }
  else {
    console.info("Test passed! 😀");

    fileServices.write(`${testTitle}: Test passed! ${Date.now()}\n`);
  }
});