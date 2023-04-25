import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { API_CONFIG } from 'src/api.config';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${API_CONFIG.baseUrl}/posts`;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikp1YW5DYW1pbG9AZXhhbXBsZS5jb20iLCJ1c2VySWQiOiI2NDM5ODFiNmMyMDgxNDVmZDFjMzk3MjQiLCJyb2xlIjoiQWRtaW4iLCJuYW1lIjoiSnVhbiBDYW1pbG8iLCJpYXQiOjE2ODI0NDcxNjAsImV4cCI6MTY4MjQ1MDc2MH0.58INxROKizxjmdbAgqZC-I3i5-QaHdy0xhDB-rE_nRg";
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<Post[]>(this.apiUrl, { headers });
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${post._id}`, post);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}