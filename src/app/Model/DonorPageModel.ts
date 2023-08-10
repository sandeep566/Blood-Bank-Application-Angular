import {Donor} from "./DonorModel";

export class PageModel{
  content: Donor[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number:number;
  first: boolean;
  numberOfElements: number;
}
