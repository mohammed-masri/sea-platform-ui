export interface IArrayDataResponse<T> {
  totalCount: number;
  page: number;
  limit: number;
  data: Array<T>;
  totalPages: number;
}
