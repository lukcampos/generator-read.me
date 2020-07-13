import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReadFileService {

  constructor(
    private http: HttpClient
  ) { }

  async read(fileName: string) {
    return this.http.get(`/assets/templates/${fileName}`, {
      responseType: 'text'
    }).toPromise()
  }
}
