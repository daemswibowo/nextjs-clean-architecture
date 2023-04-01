export enum HTTPErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN = 'UNKNOWN',
}

export interface Failure {
  code: string;
  message: string;
  hint?: string;
  details?: any;
}
