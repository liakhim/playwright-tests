import {BaseTest} from "./BaseTest";

export class AuthTest extends BaseTest {
    constructor(page) {
        super(page);
    }

    async beforeEach() {
        await this.loadStateOrLogin(true);
    }
}