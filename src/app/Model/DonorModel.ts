import {BloodQuantityLevel} from "./BloodQuantityLevel";
import {BloodBankModel} from "./BloodBankModel";

export class Donor{
  donorId: number;
  donorName: string;
  age: number;
  aadhaarNo: number;
  address: string;
  phoneNo: number;
  bloodGroup: string;
  bloodGroupsMatch:string[];
  bloodBank: BloodBankModel;
  donationQuantity: number;
}
