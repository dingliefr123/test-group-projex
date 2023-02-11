import Data from '../data/data';
import { ProjectStatusEnum } from '../models/ProjectModel';
import { Affiche } from '../typing';

type StrOrNum = string | number
export function delItemInArrById<K extends StrOrNum>(
  arr: K[],
  id: K
) {
  const idx = arr.indexOf(id);
  if (idx < 0) return arr;
  arr.splice(idx, 1)
  return [ ...arr ]
}

export const DEL_EXCLUDEDE_DATA = Data
  .filter(item => item.status !== ProjectStatusEnum.DELETED);

export const AFFICHES = DEL_EXCLUDEDE_DATA
  .map(({ name: pName, affairs }) =>
    affairs?.map(affair => ({ ...affair, pName }))
  )
  .flat(2)
  .filter(Boolean) as Affiche[];