import Data from "../data/data";
import { ProjectModel, ProjectStatusEnum } from "../models/ProjectModel";
import { State } from "../reducer";
import { Affaire } from "../typing";

export const DEL_EXCLUDEDE_DATA = Data.filter(
  (item) => item.status !== ProjectStatusEnum.DELETED
);

export const Affaires = DEL_EXCLUDEDE_DATA.map(({ name: pName, affairs }) =>
  affairs?.map((affair) => ({ ...affair, pName }))
)
  .flat(2)
  .filter(Boolean) as Affaire[];

export function toggleIdInArr<K>(arr: K[], id: K) {
  if (!arr || !Array.isArray(arr)) return [];
  const idx = arr.indexOf(id);
  if (idx < 0) return [...arr, id];
  arr.splice(idx, 1);
  return arr.slice();
}

export function filterArrBySearchKw<K extends Affaire | ProjectModel>(arr: K[], keyword: string) {
  return arr
    .filter(item => item?.name.includes(keyword));
}

export function throttle(timeout = 500) {
  let id: NodeJS.Timeout | null = null
  let lastCall: Function | null
  return function(fun: Function) {
    if (id) {
      lastCall = fun
      return
    }
    id = setTimeout(() => {
      if (lastCall)
        lastCall()
      else
        fun()
      lastCall = null;
      id = null;
    }, timeout) as any as NodeJS.Timeout;
  }
}

export function getCOnfirmedIdsFromState(state: State) {
  const { selectedAffairIds, selectedProjetIds } = state;
  return {
    affaires:selectedAffairIds.slice(),
    projets: selectedProjetIds.slice()
  }
}

export function getIdxRandomlly(len: number) {
  return Math.floor(Math.random() * len) 
}