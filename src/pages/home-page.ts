import { BaseAppPage } from "./base-app-page";

export class HomePage extends BaseAppPage {

    protected get pageLoadWaitElementLocator(): string {
        return ".home";
    }
}
