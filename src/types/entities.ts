export type Data<T> = {
  id: number;
  attributes: DefaultAttributes & T;
};

type DefaultAttributes = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type User = {
  id: number;
  email: string;
  username: string;
  phoneNumber?: string | null;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  teamName: 'team-1' | 'team-2' | 'team-3';
};

export type Image = {
  id: number;
  url: string;
  width: number;
  height: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};

export type Category = {
  id: number;
  name: string;
};

export type Size = {
  id: number;
  value: number;
};

export type Brand = {
  id: number;
  name: string;
};

export type Color = {
  id: number;
  name: string;
};

export type Gender = {
  id: number;
  name: string;
};
