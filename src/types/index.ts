export type Data = {
  id: number;
  attributes: Attributes;
};

export type Attributes = {
  name: string;
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

export type ResponseData = {
  data: Data[];
  meta: Meta;
};
