import { AffairModel } from './AffairModel';

export enum ProjectStatusEnum {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

export type ProjectModel = {
  id: string; //Primary Key
  name: string;
  status: ProjectStatusEnum;
  affairs?: AffairModel[];
};
