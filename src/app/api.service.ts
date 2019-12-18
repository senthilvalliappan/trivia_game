import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {map} from 'rxjs/operators'
@Injectable({
    providedIn: 'root'
})

export class ApiService {
    url:string ="https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
    constructor(private http: HttpClient) {

    }

    getQuizData():any {
        return this.http.get(this.url).pipe(map((res) => {
            return res;
        }))
    }
}