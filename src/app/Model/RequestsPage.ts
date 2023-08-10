import { BloodRequestModel } from "./BloodRequestModel";

export class RequestsPage{
  content: BloodRequestModel[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number:number;
  first: boolean;
  numberOfElements: number;
}
