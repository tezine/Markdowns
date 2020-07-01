import { Component, OnInit } from '@angular/core';
import {Defines} from '../../codes/defines';
import {EChartItem} from '../../entities/echart-item';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {HttpClient} from '@angular/common/http';
import {EUser} from '../../entities/euser';
import {ESkill} from '../../entities/eskill';

@Component({
  selector: Defines.routeChart,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  loading=false;
  chartItems: EChartItem[]=[];
  public barChartLabels: Label[]=[] ;
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartOptions: ChartOptions = {
    responsive: true, scales: { xAxes: [{}], yAxes: [{ticks: {
          suggestedMin: 0,
          beginAtZero: true
        }}] },
    plugins: {datalabels: {anchor: 'end', align: 'end',}}
  };

  public barChartData: ChartDataSets[] = [
    { data: [], },
  ];

  constructor(private httpClient:HttpClient) {
  }

  async ngOnInit() {
    let users:EUser[]=await this.httpClient.get<EUser[]>(Defines.mockAPIBaseUrl+'/user').toPromise();
    let usersCount=users.length;

    for(let user of users){
      let skills:ESkill[]= await this.httpClient.get<ESkill[]>(Defines.mockAPIBaseUrl+'/user/'+user.id+"/skills").toPromise();
      for(let skill of skills){
        if(!this.chartItems.find(x => x.name === skill.name)) this.chartItems.push(<EChartItem>{name:skill.name,value:1})
        else {
          let eSkill=this.chartItems.find(x=>x.name===skill.name);
          if(eSkill) eSkill.value+=1;
        }
      }
    }

    for(let chartItem of this.chartItems){
      this.barChartLabels.push(chartItem.name);
      if(this.barChartData[0].data)this.barChartData[0].data.push(chartItem.value)
    }
  }

}
