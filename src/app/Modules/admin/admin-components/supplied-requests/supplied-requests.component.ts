import { SuppliedRequest } from 'src/app/Model/SuppliedRequest';
import { BloodRequestService } from './../blood-requests/blood-request.service';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-supplied-requests',
  templateUrl: './supplied-requests.component.html',
  styleUrls: ['./supplied-requests.component.css']
})
export class SuppliedRequestsComponent {

  fileName= 'supplyReport.xlsx';
  
  constructor(private bloodRequestService:BloodRequestService){
    this.getSuppliedRequests();
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


  suppliedRequests:SuppliedRequest[] = [];

  getSuppliedRequests(){
    this.bloodRequestService.getSuppliedRequests()
    .subscribe(
      (res) => this.suppliedRequests = res
    )
  }
}
