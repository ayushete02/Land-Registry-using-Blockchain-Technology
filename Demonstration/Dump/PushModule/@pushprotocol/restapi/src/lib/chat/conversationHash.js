"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationHash = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
const helpers_2 = require("./helpers");
const conversationHash = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { conversationId, account, env = constants_1.default.ENV.PROD } = options || {};
    try {
        if (!(0, helpers_1.isValidETHAddress)(account)) {
            throw new Error(`Invalid address!`);
        }
        const response = yield (0, helpers_2.getConversationHashService)({
            conversationId: conversationId,
            account,
            env,
        });
        return response;
    }
    catch (err) {
        console.error('[EPNS-SDK] - Error - API conversationHash() - ', err);
        throw Error(`[EPNS-SDK] - Error - API conversationHash(): ${err}`);
    }
});
exports.conversationHash = conversationHash;
//# sourceMappingURL=conversationHash.js.map