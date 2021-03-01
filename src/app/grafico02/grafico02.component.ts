import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MunicipioService } from '../municipios.service';

@Component({
  selector: 'app-grafico02',
  templateUrl: './grafico02.component.html',
  styleUrls: ['./grafico02.component.css'],
})

// Clase que implementa el Gráfico de Circular
export class Grafico02Component implements OnInit {

  // Llamada a la librería de gráficos Highcharts
  Highcharts: typeof Highcharts = Highcharts;

  // Creación de una variable conlos valores por defecto de la gráfica (% de pacientes críticos por municipios)
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
       // Información que se muestra al realizar un hover sobre cada porción del gráfico
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
        name: 'Críticos',
        colorByPoint: true,
        type: undefined,
        data: [],
      },
    ],
  };

  // Constructor de la clase
  constructor(private municipiosService: MunicipioService) { }

  // Método que iniciializa las gráficas y las devuelve en el HTML
  ngOnInit(): void {
    this.casosCriticos();
  }

  // Método que nos devuelve la información (data) de los porcentajes de los casos críticos por Municipios
  casosCriticos() {

    // Llamada a la función getMunicipioApi de la clase de Servicio
    this.municipiosService.getMunicipioApi().subscribe(
      (result) => {
        const list = [];
        let suma = 0;
        const confirmados: any = result;

        confirmados.map((mun: any) =>
          // Obtener y devolver el nombre y el número de casos críticos (value)
          list.push({ name: mun.nombre, y: mun.criticos })
        );

        // Devuelve el total de casos críticos de toda España (suma de los casos críticos por provincias)
        confirmados.map((mun: any) =>
          suma += mun.criticos
        );

        // Asiganr un título a la gráfica en función del total de casos críticos
        this.chartOptions.title["text"] = "% de Casos Críticos por Municipios (" + suma + " casos críticos totales)";

        this.chartOptions.series[0]['data'] = list;

        // imprime los valores y la variable de inicialización sobre el div con id= miGraficoCircular
        Highcharts.chart('miGraficoCircular', this.chartOptions);
      },
      (error) => console.log(error)
    );
  }

}
