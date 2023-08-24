import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { map } from "rxjs";
import { BloodRequestModel } from 'src/app/Model/BloodRequestModel';
import { BloodQuantityLevel } from "../../../../Model/BloodQuantityLevel";
import { AdminService } from "../admin-home/admin.service";
import { BloodRequestService } from '../blood-requests/blood-request.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: 'bar-chart.component.html'
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild('barChartCanvas') private barChartCanvasRef: ElementRef;

  bloodLevel:BloodQuantityLevel;
  constructor(private adminService:AdminService,private bloodRequestService:BloodRequestService) {
    this.getAllBloodRequests();
  }



  bloodRequests:BloodRequestModel[] = [];

  async ngAfterViewInit() {

    await this.adminService.getBloodQuantity();

    this.bloodLevel = this.adminService.getBloodLevel();



    Chart.register(...registerables); // Register all chart components

    const barChartCanvas = this.barChartCanvasRef.nativeElement.getContext('2d');

    new Chart(barChartCanvas, {
      type: 'bar',
      data: {
        labels: Object.keys(this.bloodLevel),
        datasets: [
          {
            label: 'Blood-Quantity(ml)',
            data: Object.values(this.bloodLevel),
            backgroundColor: 'rgba(217, 39, 39, 0.8)',
            borderColor: '',
            borderWidth: 1.5
          }
        ]
      },
      options: {
        scales: {
          y: {
            type: 'linear' // Specify the scale type as 'linear'
          }
        }
      }
    });

    setInterval(() =>  {
      this.bloodLevel = this.adminService.getBloodLevel();
    },2000);

  }

  getAllBloodRequests(){
    this.bloodRequestService.getAllBloodRequests()
    .pipe(
      map((bloodRequests: BloodRequestModel[]) => {
        // Perform your filtering logic here
        // For example, filtering by blood group 'A+':
        return bloodRequests.filter(request => request.supplied === false);
      })
    ).subscribe((res) => this.bloodRequests = res);
  }

}
