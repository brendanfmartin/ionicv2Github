import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Import the user model
import { User } from '../../models/user';

@Injectable()
export class GithubUsers {
  githubUsers: any = null;

  constructor(public http: Http) {
    
  }

  load() {
    if (this.githubUsers) {
      return Promise.resolve(this.githubUsers);
    }

    return new Promise(resolve => {
      this.http.get('https://api.github.com/users')
        .map(res => <Array<User>>res.json())
        .subscribe(users => {
          this.githubUsers = users;
          resolve(this.githubUsers);
        });
    });
  }

  loadDetails(login: string) {
    return new Promise<User>(resolve => {
      this.http.get(`https://api.github.com/users/${login}`)
        .map(res => <User>(res.json()))
        .subscribe(user => {
          resolve(user);
        })
    })
  }

  searchUser(searchParam: string) {
    return new Promise<Array<User>>(resolve => {
      this.http.get(`https://api.github.com/search/users?q=${searchParam}`)
      .map(res => <Array<User>>(res.json().items))
      .subscribe(users => {
        resolve(users);
      })
    })
  }

}

