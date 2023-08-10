import { HospitalModel } from './HospitalModel';

export class BloodRequestModel{

    patientName: string
    age: number
    bloodGroup: string
    priority: string
    hospital: HospitalModel
    quantity: number
    supplied: boolean
    bloodRequestId: number
}

