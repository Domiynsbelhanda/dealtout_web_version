import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Utilisateur { name: string; email: string; key: string; password:string, telephone: string }
export interface Utilisateurid extends Utilisateur { id: string; }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;

  private userCollection: AngularFirestoreCollection<Utilisateur>;
  utilisateur: Observable<Utilisateurid[]>;

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    public afs: AngularFirestore
  ) {
    this.userCollection = this.afs.collection('Users');
    this.utilisateur = this.userCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Utilisateur;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if(this.user.toString() === 'null'){
      this.router.navigate(['/home/home/'])
    }
  }

}
