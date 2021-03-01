import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MunicipioService } from '../municipios.service';

@Component({
  selector: 'app-grafico02',
  templateUrl: './grafico02.component.html',
  styleUrls: ['./grafico02.component.css'],
})
export class Grafico02Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        type: undefined,
        data: [],
      },
    ],
  };

  constructor(private municipiosService: MunicipioService) {}

  ngOnInit(): void {
    this.pieChartBrowser();
  }

  pieChartBrowser() {
    this.municipiosService.getMunicipioApi().subscribe(
      (result) => {
        const list = [];
        let suma = 0;
        const confirmados: any = result;
        confirmados.map((x: any) =>
          list.push({ name: x.nombre, y: x.criticos })
        );

        confirmados.map((x: any) =>
          suma += x.criticos
        );

        this.chartOptions.title["text"] = "% de Casos Críticos por Municipios (" + suma + " casos críticos totales)";
        console.log(suma);

        this.chartOptions.series[0]['data'] = list;
        Highcharts.chart('miGraficoCircular', this.chartOptions);
      },
      (error) => console.log(error)
    );
  }
}
