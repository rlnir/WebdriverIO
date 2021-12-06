import { expect } from 'chai';
import fileServices from '../../helpers/file-services';
import { AboutPage } from '../../pages/about-page';
import { HomePage } from "../../pages/home-page";
import { TEST_ } from "../test-base";

const testData = [
    { name: "Assaf Eisenstein", title: "Co-Founder & President", quote: "“Who dares, wins.”" },
    { name: "Yoni Tserruya", title: "Co-Founder & CEO", quote: '“Everything you want waits on the other side of consistency.”' },
    { name: "Lior Berger", title: "Advisory Board Member", quote: '“Unleashing the power of entrepreneurship...”' },
    { name: "Rachel Haim", title: "VP Growth", quote: '“Greatness. Nothing less.”' },
    { name: "Henry Spitzer", title: "VP Sales", quote: '"If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on."' },
    { name: "Chen Guter", title: "VP Marketing", quote: '“Some people want it to happen, others make it happen.”' },
    { name: "Shai Gottesdiener", title: "VP R&D", quote: '“With data comes power. With power comes responsibility."' },
    { name: "Hila Gilboa", title: "VP Finance", quote: '"A diverse mix of voices leads to better discussions and outcomes for everyone."' },
    { name: "Reut Rubinstein", title: "VP HR", quote: '"It\'s not what you\'ve got, it\'s what you use that makes a difference."' },
];

describe(`${TEST_("Sanity")}`, () => {
    testData.forEach((data, i) => {
        it(`Validate about cards_${data.name}`, () => {
            const homepage = new HomePage();
            //TODO: convert menu items to enum
            const aboutPage = homepage.mainMenu.navigateToPage(AboutPage, "company", "about");

            const card = aboutPage.getCard(i);

            fileServices.write(`\n${card.name}, ${card.title}, ${card.quote} --`);

            expect(card).eql(data);
        });
    });
});
