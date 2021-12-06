import { MainMenuPage } from "./main-menu";
import { PageBase } from "./page-base";

export abstract class BaseAppPage extends PageBase {
    get mainMenu(): MainMenuPage {
        return new MainMenuPage();
    }
}
