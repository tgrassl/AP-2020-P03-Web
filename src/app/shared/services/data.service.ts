import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Listing } from '../models/listing.model';
import { Note } from '../models/note.model';
import { ListingSearch } from '../models/listingSearch.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getListings(search: ListingSearch): Observable<Listing[]> {
      // return this.http.get<Listing[]>(
      // this.getFullUrl(
      //   `/listings?dest=${search.destination}&start=${search.start}&end=${search.end}&guests=${search.guests}`
      // ));
      return this.http.get<Listing[]>('assets/test/listing.json');
  }

  public getUser(uid: string): Observable<User> {
    return this.http.get<User>(this.getFullUrl('/user?uid=' + uid));
  }

  public getNotes(uid: string): Observable<Note[]> {
    return this.http.get<Note[]>(this.getFullUrl('/notes?uid=' + uid));
  }

  public login(email: string, pwd: string): Observable<User> {
    return this.http.post<User>(this.getFullUrl('/login'), {email, pwd});
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(this.getFullUrl('/register'), user);
  }

  public getFullUrl(url: string): string {
    return environment.apiUrl + encodeURIComponent(url);
  }
}