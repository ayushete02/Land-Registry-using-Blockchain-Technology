import { AccountEnvOptionsType } from '../types';
/**
 *  POST '/v1/chat/request/accept
 */
interface ApproveRequestOptionsType extends AccountEnvOptionsType {
    senderAddress: string;
    status?: 'Approved';
}
export declare const approve: (options: ApproveRequestOptionsType) => Promise<import("axios").AxiosResponse<any, any>>;
export {};
