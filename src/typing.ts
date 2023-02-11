import { AffairModel } from "./models/AffairModel";

export enum LeftBarEnum {
  PROJETS = 'Projets',
  AFFAIRES = 'Affaires',
  ENTITES = 'Entités',
  CLIENTS = 'Clients'
}

export const LeftBarItem = Object.values(LeftBarEnum)

export type Affiche = AffairModel & { pName: string };