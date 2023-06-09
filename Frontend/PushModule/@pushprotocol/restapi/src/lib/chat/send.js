"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const helpers_2 = require("./helpers");
const conversationHash_1 = require("./conversationHash");
const start_1 = require("./start");
/**
 *  POST /v1/chat/message
 */
const send = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { messageContent = '', messageType = 'Text', receiverAddress, account, pgpPrivateKey = null, apiKey = '', env = constants_1.default.ENV.PROD, } = options || {};
    try {
        if (!(0, helpers_1.isValidETHAddress)(account)) {
            throw new Error(`Invalid address!`);
        }
        if (!(0, helpers_1.isValidETHAddress)(receiverAddress)) {
            throw new Error(`Invalid address!`);
        }
        const connectedUser = yield (0, helpers_2.getConnectedUser)(account, pgpPrivateKey, env);
        const conversationResponse = yield (0, conversationHash_1.conversationHash)({
            conversationId: receiverAddress,
            account,
            env,
        });
        if (!(conversationResponse === null || conversationResponse === void 0 ? void 0 : conversationResponse.threadHash)) {
            return (0, start_1.start)({
                messageContent: messageContent,
                messageType: 'Text',
                receiverAddress,
                connectedUser,
                apiKey,
                env,
            });
        }
        else {
            const { message, encryptionType, aesEncryptedSecret, signature } = (yield (0, helpers_2.getEncryptedRequest)(receiverAddress, connectedUser, messageContent, env)) || {};
            const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
            const apiEndpoint = `${API_BASE_URL}/v1/chat/message`;
            const body = {
                fromDID: (0, helpers_1.walletToPCAIP10)(account),
                toDID: (0, helpers_1.walletToPCAIP10)(receiverAddress),
                fromCAIP10: (0, helpers_1.walletToPCAIP10)(account),
                toCAIP10: (0, helpers_1.walletToPCAIP10)(receiverAddress),
                messageContent: message,
                messageType,
                signature,
                encType: encryptionType,
                encryptedSecret: aesEncryptedSecret,
                sigType: signature,
            };
            return axios_1.default
                .post(apiEndpoint, body)
                .then((response) => {
                return response.data;
            })
                .catch((err) => {
                throw new Error(err);
            });
        }
    }
    catch (err) {
        console.error(`[EPNS-SDK] - API  - Error - API send() -:  `, err);
        throw Error(`[EPNS-SDK] - API  - Error - API send() -: ${err}`);
    }
});
exports.send = send;
//# sourceMappingURL=send.js.map