export interface IPatient {
  id: number;
  firstName: string;      
  lastName: string;       
  email: string;
  phoneNumber: string;          
  countryIso: string;     
  documentImage: string;   
  isEditing?: boolean       
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
  links?: {
    next?: string;
    prev?: string;
  };
}