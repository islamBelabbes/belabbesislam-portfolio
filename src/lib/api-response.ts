export type TApiSuccessResponse<T> = {
  success: true;
  status: number;
  message: string;
  data?: T;
};

export type TApiErrorResponse = {
  success: false;
  status: number;
  message: string;
  errors?: unknown;
};

type TApiResponseParams<T> = {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  errors?: unknown;
};

export type TApiResponse<T> = TApiSuccessResponse<T> | TApiErrorResponse;

const apiResponse = <T>({
  data,
  message,
  status,
  success,
}: TApiResponseParams<T>): TApiResponse<T> => {
  return {
    success: success ? true : false,
    status,
    message,
    ...(success && { data }),
    ...(!success && { errors: data }),
  };
};

export default apiResponse;
