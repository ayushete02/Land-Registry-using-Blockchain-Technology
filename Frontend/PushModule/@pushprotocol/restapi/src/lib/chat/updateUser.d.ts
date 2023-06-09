/**
 *  PUT '/v1/w2w/users/:did
 */
export declare type ChatUpdateUserOptionsType = {
    user: string;
    profilePictureCID?: string;
    name?: string;
    env?: string;
};
export declare const updateUser: (options: ChatUpdateUserOptionsType) => Promise<import("axios").AxiosResponse<any, any>>;
