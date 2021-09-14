export interface User {
  id?: string;
name?: string;
last?: string;
prof?: string;
email?: string;
typeCount?: string;
}
export interface Camp {
  Codecamp?: number;
  Datecapm?: string;
  Description?: string;
  Lieucamp?: string;
  heure_dep?: string;
  heure_fin?: string;
  donneur?: {date?: string, id?: string};
equipe?: {acceuil?: any, infirmier?: any, prelevement?: any};
materiel?: {libele?: any, qte?: any};

}

export interface Zone {
  Id?: string;
  arro?: any;
  com?: any;
  dep?: any;
  zonecoor?: {lat?: any, lon?: any};
}
export interface Donnor {
  Contact?: string;
  Id?: string;
  arro?: string;
  com?: string;
  dep?: string;
  firstname?: string;
  lastname?: string;
  pict?: string;
}
