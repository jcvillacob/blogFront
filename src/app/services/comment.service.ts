import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { API_CONFIG } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl  = `${API_CONFIG.baseUrl}/comments`;

  constructor(private http: HttpClient) { }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}?post=${postId}`);
  }

  getCommentById(id: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${id}`);
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  updateComment(id: string, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/${id}`, comment);
  }

  deleteComment(id: string): Observable<Comment> {
    return this.http.delete<Comment>(`${this.apiUrl}/${id}`);
  }
}
