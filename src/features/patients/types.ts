export interface IPatient {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    idImg: string
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links?: {
    next?: string;
    prev?: string;
  };
}