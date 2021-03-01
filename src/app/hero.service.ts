import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";
import { HttpClient } from "@angular/common/http";
import { Hero } from "./hero";

/*
Los componentes consumen servicios; es decir, puede inyectar un servicio en un componente, dándole acceso al componente a ese servicio.

Una aplicación real buscará héroes de un servidor remoto, que es una operación inherentemente asincrónica.

En este tutorial, HeroService.getHeroes() devolverá un Observable porque eventualmente usará el método angular HttpClient.get para buscar a los héroes y HttpClient.get() devuelve un Observable.

observable
Un productor de múltiples valores, que empuja a suscriptores. Se utiliza para el manejo de eventos asíncronos en todo Angular. Ejecutas un observable suscribiéndote con su método subscribe(), pasando devoluciones de llamada para notificaciones de nuevos valores, errores o finalización.
*/

@Injectable({
  providedIn: "root"
})
export class HeroService {
  //private urlAPI = "http://localhost:3000/api";

  // Está subida a heroku:
  private urlAPI = "https://restapiheroes.herokuapp.com/api"
  // Estoy sustituyendo la api de mockapi por la mia
  private url = "https://5fc9f2333c1c22001644152b.mockapi.io/api/heroresapi";

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getHeroesApi() {
    this.messageService.add("Cargamos los documentos");
    return this.http.get(this.urlAPI);
  }

  /** PUT: update the hero by ID on the server */
  updateHero(doc: any) {
    console.log("en update");
    console.log(doc);
    const urlId = `${this.urlAPI}/${doc.id}`;
    return this.http.put(urlId, doc);
  }

  /** DELETE: delete the hero by Id from the server */
  deleteHero(hero: Hero) {
    // const id = typeof hero === "number" ? hero : hero.id;
    const urlId = `${this.urlAPI}/${hero.id}`;
    return this.http.delete(urlId);
  }
  /** POST: add a new hero to the server */
  addHero(doc: any) {
    return this.http.post(this.urlAPI, doc);
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number) {
    const url = `${this.urlAPI}/${id}`;
    return this.http.get(url);
  }
}
