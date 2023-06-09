"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesService = exports.getConversationHashService = exports.createUserService = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const constants_1 = require("../../constants");
const helpers_1 = require("../../helpers");
const createUserService = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { user, publicKey = '', encryptedPrivateKey = '', encryptionType = '', signature = '', sigType = '', env = constants_1.default.ENV.PROD, } = options || {};
    const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
    const requestUrl = `${API_BASE_URL}/v1/users/`;
    const body = {
        caip10: (0, helpers_1.walletToPCAIP10)(user),
        did: (0, helpers_1.walletToPCAIP10)(user),
        publicKey,
        encryptedPrivateKey,
        encryptionType,
        signature,
        sigType,
    };
    return axios_1.default
        .post(requestUrl, body)
        .then((response) => {
        return response.data;
    })
        .catch((err) => {
        console.error(`[EPNS-SDK] - API ${requestUrl}: `, err);
        throw Error(`[EPNS-SDK] - API ${requestUrl}: ${err}`);
    });
});
exports.createUserService = createUserService;
const getConversationHashService = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { conversationId, account, env = constants_1.default.ENV.PROD, } = options || {};
    const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
    const requestUrl = `${API_BASE_URL}/v1/chat/users/${(0, helpers_1.walletToPCAIP10)(account)}/conversations/${(0, helpers_1.walletToPCAIP10)(conversationId)}/hash`;
    return axios_1.default
        .get(requestUrl)
        .then((response) => {
        return response.data;
    })
        .catch((err) => {
        throw new Error(err);
    });
});
exports.getConversationHashService = getConversationHashService;
const getMessagesService = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { threadhash, limit, env = constants_1.default.ENV.PROD, } = options || {};
    const API_BASE_URL = (0, helpers_1.getAPIBaseUrls)(env);
    const apiEndpoint = `${API_BASE_URL}/v1/chat/conversationhash/${threadhash}`;
    const queryObj = {
        fetchLimit: limit,
    };
    const requestUrl = `${apiEndpoint}?${(0, helpers_1.getQueryParams)(queryObj)}`;
    return axios_1.default
        .get(requestUrl)
        .then((response) => {
        return response.data;
    })
        .catch((err) => {
        throw new Error(err);
    });
});
exports.getMessagesService = getMessagesService;
//# sourceMappingURL=service.js.map