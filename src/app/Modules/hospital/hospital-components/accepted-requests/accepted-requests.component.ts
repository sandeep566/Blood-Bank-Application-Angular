import { Component } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { BloodRequestModel } from 'src/app/Model/BloodRequestModel';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-accepted-requests',
  templateUrl: './accepted-requests.component.html',
  styleUrls: ['./accepted-requests.component.css']
})
export class AcceptedRequestsComponent {

  constructor(private hospitalService:HospitalService){
    this.getAcceptedRequests();

  }

  acceptedRequests:BloodRequestModel[] = []


  patientName:string ="";

  fileName= 'supplyReport.xlsx';


  searchByName(){
    return this.acceptedRequests.filter(req => req.patientName.includes(this.patientName))
  }

  getAcceptedRequests(){
    this.hospitalService.getAcceptedRequests()
    .subscribe(
      res => this.acceptedRequests = res
    )
  }


  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

}
