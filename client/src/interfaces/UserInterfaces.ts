export interface IUserSigninJwtPayload {
  id: string;
  isBusiness: boolean;
  isAdmin: boolean;
  iat: number;
}

export interface IUserDetails {
  id: string;
  name: IName;
  phone: string;
  email: string;
  password: string;
  image: IImage;
  address: IAddress;
  isAdmin: boolean;
  isBusiness: boolean;
  createdAt: string;
}

export interface IUserSignup {
  name: IName;
  phone: string;
  email: string;
  password: string;
  image: IImage;
  address: IAddress;
  isBusiness: boolean;
}

interface IName {
  first: string;
  middle?: string;
  last: string;
}

interface IImage {
  url: string;
  alt: string;
}

interface IAddress {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip: string;
}

// ------------------- JOI schemas -------------------

