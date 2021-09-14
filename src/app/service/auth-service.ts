import { Observable } from 'rxjs/Observable';
import { User } from './../shared/user-inerface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  stockuid: any;
  tab: any;
  userislog = false;
  isready = false;
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth, private router: Router
  ) {

    this.OnstatusUser();

    this.stockuid = this.auth.onAuthStateChanged((user) => {
      // tslint:disable-next-line: no-unused-expression
      user?.uid;
    });

  }


  // tslint:disable-next-line: typedef
  Onuserupdate(data: User) {
    return this.firestore.collection('User')
      .doc(this.stockuid)
      .update(data);
  }
  // tslint:disable-next-line: typedef
  Onuserfirebase() {
    return this.firestore.collection('User', ref => ref
      .where('id', '==', this.stockuid)).
      snapshotChanges()
      .pipe(map(user => {
        return user.map((a) => {
          const data = a.payload.doc.data() as User;
          return data;
        });
      }));
  }
  OnstatusUser(): void {
    this.auth.onAuthStateChanged(user => {
      this.stockuid = user?.uid;
      this.isready = true;
      if (user === null) {
        this.userislog = false;
      } else {

        if (user.emailVerified) {
          this.userislog = true;
        } else {
          this.userislog = false;
        }
      }
    });
  }

  // tslint:disable-next-line: typedef
  Onsignin(email: string, password: string) {
    // tslint:disable-next-line: ban-types
    // return new Promise((resolve, reject) => {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(usersigin => {
        // tslint:disable-next-line: max-line-length
        if (usersigin.user && usersigin.user?.emailVerified === true) {
          this.tab = this.firestore.collection('User').doc(usersigin.user?.uid).get().subscribe((userid) => {
            const data = userid.data() as User;
            switch (data.typeCount) {
              case 'AdminG':
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                  }
                });
                Toast.fire({
                  icon: 'success',
                  title: 'Connectez avec succèss'
                }).then(() => {
                  this.router.navigate(['hostAdmin']);

                });

                break;

              case 'Acceuil':
                Swal.fire({
                  icon: 'info',
                  title: 'Information...',
                  text: 'Acceuil'
                });
                break;
              case 'Infirmier':
                Swal.fire({
                  icon: 'info',
                  title: 'Information...',
                  text: 'Infirmier'
                });
                break;
              case 'Prélèvement':
                Swal.fire({
                  icon: 'info',
                  title: 'Information...',
                  text: 'Prélèvement'
                });
                break;
              default:
                Swal.fire({
                  icon: 'info',
                  title: 'Information...',
                  text: 'Contactez l\'administrateur avant de vous connectez. '
                });
                this.Onlogout();
                break;
            }
          });
        }
      })
      .catch((error: Error) => {

        switch (error.message) {
          case 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.':
            Swal.fire(
              'Vous n\'êtes pas connecter a Internet?',
              'Verifier votre connection et réessayer',
              'question'
            );
            // reject();
            break;
          case 'There is no user record corresponding to this identifier. The user may have been deleted.':
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Vous n\'êtes pas autoriser à effectuer une opération. Inscrivez-vous ou vérifiez bien vos identifants!'

            });
            break;
          case 'The password is invalid or the user does not have a password.':
            Swal.fire({
              icon: 'info',
              title: 'Information...',
              text: 'Le mot de passe saisir n\'est pas correcte. Si vous l\'avez oublié veillez appuyer sur mot de passe oublié'

            });
            break;
          case 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
            Swal.fire({
              icon: 'warning',
              title: 'Trop de tentation',
              text: 'L\'accès à ce compte est temporairement bloqué en raison de nombreuses tentatives de connexion infructueuses.Vous pouvez le restaurer immédiatement en réinitialisant votre mot de passe ou vous pouvez réessayer plus tard'

            });
            break;

          default:
            break;
        }
      });
    // });
  }
  // tslint:disable-next-line: typedef
  Onsignup(email: string, password: string, name: string, last: string, prof: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(result => {
      if (result.user?.sendEmailVerification()) {
        this.firestore.collection('User').doc(result.user.uid).set({
          // tslint:disable-next-line: object-literal-shorthand
          id: result.user.uid,
          // tslint:disable-next-line: object-literal-shorthand
          name: name,
          // tslint:disable-next-line: object-literal-shorthand
          last: last,
           // tslint:disable-next-line: object-literal-shorthand
           prof: prof,
          // tslint:disable-next-line: object-literal-shorthand
          email: email,
          typeCount: 'Simple'
        }
        );
        Swal.fire({
          title: 'Un mail a été envoyé a cet addresse.Veillez confirmé pour continuer',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        });
      }
      else {
        Swal.fire({
          icon: 'info',
          title: 'Avez-vous recu le mail?',
          text: 'Apuyer sur ce button pour recevoir un nouveau',
          confirmButtonText: 'J\'ai pas recu.Renvoyer'
        }).then(btnconf => {
          if (btnconf.isConfirmed) {
            result.user?.sendEmailVerification();
            Swal.fire(
              'Email envoyé!',
              'Vérifier votre boîte mail',
              'success'
            );
          }
        });
      }
    })
      .catch((error: Error) => {
        switch (error.message) {
          case 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.':
            Swal.fire(
              'Vous n\'êtes pas connecter a Internet?',
              'Verifier votre connection et réessayer',
              'question'
            );
            break;
          case 'The email address is already in use by another account.':
            Swal.fire({
              icon: 'error',
              title: 'Désolé...',
              text: 'Cette addresse est déjà utilisée.Veuillez réessayer à nouveau',
            });
            break;
          default:
            break;
        }
      });

  }
  OnpasswordRecover(email: string): void {
    this.auth.sendPasswordResetEmail(email)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Envoyé...',
          text: 'Consulté votre boîte Email!'

        });
      })
      .catch((error: Error) => {
        switch (error.message) {
          case 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.':
            Swal.fire(
              'Vous n\'êtes pas connecter a Internet?',
              'Verifier votre connection et réessayé',
              'question'
            );
            break;
          case 'There is no user record corresponding to this identifier. The user may have been deleted.':
            Swal.fire({
              icon: 'info',
              title: 'Information...',
              text: 'L\'adresse email saisir ne correspond à aucune addresse. Veuillez réessayer '

            });
            break;
          default:
            break;
        }

      });
  }
  Onlogout(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['campAdmin']);
    });
  }
  // tslint:disable-next-line: typedef
  isAuthticated() {
    return this.userislog;
  }
}




