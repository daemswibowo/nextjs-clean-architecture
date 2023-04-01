import { Failure } from './failure';

export interface BaseResponse<T> {
  data: T | null;
  error: Failure | null;
  count?: number;
}
