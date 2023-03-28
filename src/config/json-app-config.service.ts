import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class JsonAppConfigService extends AppConfig{

  constructor(private http: HttpClient) { super(); }

  // This function needs to return a promise
  load():Observable<any> {
    /*return this.http.get<AppConfig>('app.config.json')
      .toPromise()
      .then(data => {
        this.title = data!.title;
        this.baseUrl = data!.baseUrl;
      })
      .catch(() => {
        console.error('Could not load configuration');
      });*/

      return this.http.get<AppConfig>('app.config.json').pipe(
        map(response => {
          this.title = response.title;
          this.baseUrl = response.baseUrl;
        })
      );
      
    /*return this.http.get<AppConfig>('app.config.json').subscribe({
      
      next: (data) => {
        
        this.title = data['title'];
        this.baseUrl = data!.baseUrl;
      },
      error: (err) =>{console.error('Could not load configuration', err);}
    })*/
  }
}
