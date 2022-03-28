
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Lesson } from "../model/lesson";
import { map } from "rxjs/operators";


@Injectable()
export class LessonsService {

  constructor(private http: HttpClient) {

  }

  loadAllLessons() {
    return this.http.get<{ lessons: Lesson[] }>('/api/lessons').pipe(map(res => res.lessons));
  }

  findLessonById(id: number) {
    return this.http.get<Lesson>('/api/lessons/' + id);
  }

}

