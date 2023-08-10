import {BloodQuantityLevel} from "./BloodQuantityLevel";

export class BloodBankModel{
  bloodBankId: number;
  bloodBankName: string;
  address: string;
  phoneNumber: number;
  mailAddress: string;
  bloodGroups: BloodQuantityLevel;
}
