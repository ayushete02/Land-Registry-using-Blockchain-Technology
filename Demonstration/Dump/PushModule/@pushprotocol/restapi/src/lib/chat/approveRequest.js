"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approve = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const helpers_2 = require("./helpers");
const approve = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { status = "Approved", 
    // sigType = 'sigType',
    // privateKey = null,
    account, senderAddress, env = constants_1.default.ENV.PROD, } = options || {};
    // get user with raw privateKey
    // const createdUser: IConnectedUser = await getConnectedUser(account, privateKey, env);
    // TODO: make signature
    const signature = '1';
    const connectedUser = yield (0, helpers_2.createUserIfNecessary)({ account, env });
    const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
    const apiEndpoint = `${API_BASE_URL}/v1/chat/request/accept`;
    const requestUrl = `${apiEndpoint}`;
    const body = {
        fromDID: (0, helpers_1.walletToPCAIP10)(senderAddress),
        toDID: (0, helpers_1.walletToPCAIP10)(account),
        signature,
        status,
        sigType: 'sigType',
    };
    return axios_1.default.put(requestUrl, body)
        .catch((err) => {
        console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
        throw Error(`[EPNS-SDK] - API ${requestUrl}: ${err}`);
    });
});
exports.approve = approve;
//# sourceMappingURL=approveRequest.js.map