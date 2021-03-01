import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  heroesApi = null;
  heroTmp: any;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}


  getHeroesApi() {
    this.messageService.add("Hola en getHeroesApi")
    this.heroService.getHeroesApi().subscribe(heroes => {
      this.heroesApi = heroes;
      this.heroes = this.heroesApi;
    });
  }

  delete(hero: Hero): void {
    /* filter crea otro array filtrando los elementos que sean distintos de el "hero" recibido.
    Se trata de que el array en memoria conincida con el server
    */
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  add(nameP: string, salaryP: string): void {
    const nameV = nameP.trim();
    const salaryV = parseInt(salaryP);
    if (!nameP) {
      return;
    }
    const newDoc: any = {
      name: nameV,
      salary: salaryV
    };
    this.heroService.addHero(newDoc)
    .subscribe(hero => {
      this.heroTmp = hero;
      this.heroes.push(this.heroTmp);
    });
  }

  ngOnInit() {
    this.getHeroesApi();
  }
}
