import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComunidadComponent } from "./comunidad/comunidad.component";
import { ProvinciasComponent } from "./provincias/provincias.component";
import { MunicipiosComponent } from "./municipios/municipios.component";
import { Grafico01Component } from "./grafico01/grafico01.component";
import { Grafico02Component } from "./grafico02/grafico02.component";

// rutas principales del proyecto
const routes: Routes = [
  { path: "comunidad", component: ComunidadComponent },
  { path: "provincias", component: ProvinciasComponent },
  { path: "municipios", component: MunicipiosComponent },
  { path: "grafico", component: Grafico01Component },
  { path: "graficos-circulares", component: Grafico02Component },
  { path: "", redirectTo: "comunidad", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
