import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, isAxiosError} from 'axios';
import {BaseResponse} from "@/modules/core/common/baseResponse";
import {Failure, HTTPErrorCode} from "@/modules/core/common/failure";
import lodash from "@/modules/core/utils/lodash";
import {singleton} from "tsyringe";

const HTTP_ERR_MSG = {
    400: 'Server tidak dapat memproses permintaan Anda',
    422: 'Server tidak dapat memproses permintaan Anda',
    401: 'Sesi anda telah habis, silakan masuk kembali',
    403: 'Anda tidak memiliki akses untuk membuka halaman ini',
    404: 'Sumber tidak dapat ditemukan',
    503: 'Server tidak dapat diakses untuk sementara',
    DEFAULT: 'Terjadi kesalahan pada server',
};

export const HTTP_ERR_CODE = {
    400: HTTPErrorCode.BAD_REQUEST,
    422: HTTPErrorCode.UNPROCESSABLE_ENTITY,
    401: HTTPErrorCode.UNAUTHENTICATED,
    403: HTTPErrorCode.FORBIDDEN,
    404: HTTPErrorCode.NOT_FOUND,
    503: HTTPErrorCode.SERVICE_UNAVAILABLE,
    DEFAULT: HTTPErrorCode.SERVER_ERROR,
};

@singleton()
export default class HttpClient {
    private name: string = 'hello world';
    client: AxiosInstance;
    serverTimeout: number = 60 * 2 * 1000; // 2 min
    constructor() {
        const requestHeader: any = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };

        // TODO: get bearer from async storage
        // if (localStorage.value !== '') {
        //     requestHeader['Authorization'] = `Bearer ${localStorage.value}`;
        // }

        this.client = axios.create({
            headers: requestHeader,
            timeout: this.serverTimeout,
            timeoutErrorMessage: 'Request timeout',
        });

        this.client.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        // TODO: handle default error toast
                    }
                }
                throw error;
            }
        );
    }

    overrideAuthToken(authToken: string) {
        if (authToken) {
            this.client.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        }

        return true;
    }

    /**
     * Send GET Request
     *
     * @param URL
     * @param params
     * @param config
     */
    async sendGetRequest<Entity>(
        URL: string,
        params: object = {},
        config: AxiosRequestConfig = {withCredentials: false}
    ): Promise<BaseResponse<Entity>> {
        let data: Entity | null = null;
        let error: Failure | null = null;
        try {
            const result = await this.client.get(URL, {params, ...config});
            if (result.data) {
                data = result.data;
            }
        } catch (e) {
            error = this.errorHandler(e);
        }

        return {
            data,
            error,
        };
    }

    /**
     * Send GET request for binary
     *
     * @param URL
     * @param params
     */
    sendGetRequestForBinary(URL: string, params: object) {
        return this.client.get(URL, {
            params,
            responseType: 'arraybuffer',
        });
    }

    /**
     * Send POST Request
     *
     * @param URL
     * @param requestBody
     * @param config
     */
    async sendPostRequest<Entity>(
        URL: string,
        requestBody: any,
        config?: AxiosRequestConfig
    ): Promise<BaseResponse<Entity>> {
        let data: Entity | null = null;
        let error: Failure | null = null;

        try {
            const result = await this.client.post(URL, requestBody, config);
            if (result.data) {
                data = result.data;
            }
        } catch (e) {
            error = this.errorHandler(e);
        }

        return {
            data,
            error,
        };
    }

    /**
     * Send PUT request
     *
     * @param URL
     * @param requestBody
     * @param config
     */
    async sendPutRequest<Entity>(
        URL: string,
        requestBody: any,
        config?: AxiosRequestConfig
    ): Promise<BaseResponse<Entity>> {
        let data: Entity | null = null;
        let error: Failure | null = null;

        try {
            const result = await this.client.put(URL, requestBody, config);
            if (result.data) {
                data = result.data;
            }
        } catch (e) {
            error = this.errorHandler(e);
        }

        return {
            data,
            error,
        };
    }

    /**
     * Send DELETE request
     *
     * @param URL
     * @param requestBody
     */
    async sendDeleteRequest<Entity>(URL: string, requestBody?: any): Promise<BaseResponse<Entity>> {
        let data: Entity | null = null;
        let error: Failure | null = null;

        try {
            const result = await this.client.delete(URL, requestBody);
            if (result.data) {
                data = result.data;
            }
        } catch (e) {
            error = this.errorHandler(e);
        }

        return {
            data,
            error,
        };
    }

    /**
     * Parse Data to base64
     *
     * @param data
     * @param mimeType
     */
    parseToBase64(data: any, mimeType: any) {
        const base64Str = Buffer.from(data, 'binary').toString('base64');
        return 'data:' + mimeType + ';base64,' + base64Str;
    }

    /**
     * Convert file to base64
     *
     * @param file
     */
    fileToBase64(file: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    /**
     * Generate axios error message
     *
     * @param error
     */
    generateErrMessage(error: AxiosError) {
        let errMessage = error.message;
        if (error.response) {
            const code = parseInt(String(error.response.status), 10);
            // @ts-ignore
            errMessage = HTTP_ERR_MSG[code]
                ? // @ts-ignore
                HTTP_ERR_MSG[code]
                : HTTP_ERR_MSG.DEFAULT;
        }
        return errMessage;
    }

    /**
     * Handle error
     *
     * @param error
     */
    errorHandler(error: any): Failure {
        let code: string;
        let message: string;
        let details: any = error;

        // if the error response from axios
        if (isAxiosError(error) && error.response) {
            // @ts-ignore
            code = HTTP_ERR_CODE[error.response.status] ? HTTP_ERR_CODE[error.response.status] : HTTP_ERR_CODE.DEFAULT;
            message = `${this.name}: ${lodash.get(
                error,
                'response.data.message',
                this.generateErrMessage(error)
            )}`;
            // default to get errors validation data from laravel backend api
            details = lodash.get(error, 'response.data.errors', error);
        } else {
            code = HTTPErrorCode.UNKNOWN;
            message = `${this.name}: Unknown error`;
        }

        if (process.env.NODE_ENV !== 'production') {
            console.warn(message);
        }

        return {
            code,
            message,
            details,
        };
    }
}