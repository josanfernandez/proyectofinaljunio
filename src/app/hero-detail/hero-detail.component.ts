import { Component, OnInit, Input } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit {
  // @Input() and @Output() allow Angular to share data between the parent context and child directives or components
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getHero();
  }
  save(salaryP: string): void {
    const doc = {
      id: this.hero.id,
      name: this.hero.name,
      salary: parseInt(salaryP)    
    };
    this.heroService
      .updateHero(doc)
      .subscribe(() => this.goBack());
  }
  /*
  Para recuperar el documento por el Id reicibido como parámetro
  */
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.messageService.add(`HeroesComponent: Selected hero id=${id}`);
    this.heroService.getHero(id)
    .subscribe(
      hero => {
      const heroTmp: any = hero;
      this.hero = heroTmp;
    });
  }
  goBack(): void {
    this.location.back();
  }
}
