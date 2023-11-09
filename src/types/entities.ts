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
  email: string;
  username: string;
  phoneNumber?: string | null;
};

export type Product = {
  name: string;
  description: string;
  price: number;
  teamName: 'team-1' | 'team-2' | 'team-3';
};

export type Image = {
  url: string;
  width: number;
  height: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};

export type Category = {
  name: string;
};

export type Size = {
  value: number;
};

export type Brand = {
  name: string;
};

export type Color = {
  name: string;
};

export type Gender = {
  name: string;
};
