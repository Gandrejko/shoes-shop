export type Data<T> = {
  id: number;
  attributes: DefaultAttributes & T;
};

export type DefaultAttributes = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Meta = {
  pagination: Pagination;
};

export type ResponseData<T> = {
  data: Data<T>[];
  meta: Meta;
};

export type GendersResponse = ResponseData<{
  name: string;
}>;

export type BrandsResponse = ResponseData<{
  name: string;
}>;

export type ColorsResponse = ResponseData<{
  name: string;
}>;

export type SizesResponse = ResponseData<{
  value: number;
}>;
