import { AuthService } from './auth-service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User, Camp, Zone, Donnor } from './../shared/user-inerface';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  Usercollection: AngularFirestoreCollection<User> | undefined;
  userfromserve: Observable<User[]> | undefined;
  campfromserve: Observable<Camp[]> | undefined;
  Donnorret: Observable<Donnor[]> | undefined;
  UserDoc: AngularFirestoreDocument<User> | undefined;
  Tool: any;
  filter: string | undefined;
  UserCampCollecte: AngularFirestoreCollection<Camp> | undefined;
  constructor(private firestore: AngularFirestore, private authSer: AuthService) {
    this.UserCampCollecte = this.firestore.collection('Campagne');
    this.userfromserve = this.firestore
      .collection('User', ref => ref
        .where('typeCount', '!=', 'AdminG'))
      .snapshotChanges().pipe(map(user => {
        return user.map((a) => {
          const data = a.payload.doc.data() as User;
          data.id = a.payload.doc.id;
          return data;
        });
      }));

    this.campfromserve = this.firestore.collection('Campagne', ref => ref.orderBy('Codecamp', 'asc'))
      .snapshotChanges().pipe(map(obj => {
        return obj.map(b => {
          const datacamp = b.payload.doc.data() as Camp;
          return datacamp;
        });

      }));

    this.Donnorret = this.firestore.collection('Donnor')
      .snapshotChanges().pipe(map(obj => {
        return obj.map(b => {
          const datadonnor = b.payload.doc.data() as Donnor;
          return datadonnor;
        });

      }));

    this.Tool = this.firestore.collection('Materiel').snapshotChanges().pipe(map(obj => {
        return obj.map(b => {
          const datamate = b.payload.doc.data();
          return datamate;
        });

      }));

  }
  // tslint:disable-next-line: typedef
  getUser() {
    return this.userfromserve;
  }
  // tslint:disable-next-line: typedef
  getDonnor() {
    return this.Donnorret;
  }
  // tslint:disable-next-line: typedef
  Ondeleteser(user: User) {
    this.UserDoc = this.firestore.doc(`User/${user.id}`);
    this.UserDoc.delete();
  }
  // tslint:disable-next-line: typedef
  OnattrRole(user: User, data: any) {
    this.UserDoc = this.firestore.doc(`User/${user.id}`);
    this.UserDoc.update({ typeCount: data });
  }
  // tslint:disable-next-line: typedef
  Ongetusertype(type: string) {
    return this.firestore
      .collection('User', ref => ref
        .where('typeCount', '==', type))
      .snapshotChanges().pipe(map(user => {
        return user.map((a) => {
          const data = a.payload.doc.data() as User;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }
  // tslint:disable-next-line: typedef
  OnaddCamp(campadd: Camp) {
   return this.UserCampCollecte?.add(campadd);
  }
  // tslint:disable-next-line: typedef
  OngetCamp() {
    return this.campfromserve;
  }
  // tslint:disable-next-line: typedef
  OngetMate(){
    return this.Tool;
  }

  }


