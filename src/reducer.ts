import { LeftBarEnum } from "./typing";
import { delItemInArrById } from "./utils";
import React, { createContext } from 'react'

export const initiaState: {
  selectedProjetIds: string[],
  selectedAffairIds: number[],
  activeBarKey: LeftBarEnum
} = {
  activeBarKey: LeftBarEnum.PROJETS,
  selectedProjetIds: [],
  selectedAffairIds: []
}

type State = typeof initiaState;

export enum ACTION_TYPE_ENUM {
  CHANGE_BAR = 'CHANGE_BAR',
  SELECT_PROJET = 'SELECT_PROJET',
  DE_SELECT_PROJET = 'DE_SELECT_PROJET',
  SELECT_AFFAIRE = 'SELECT_AFFAIRE',
  DE_SELECT_AFFAIRE = 'DE_SELECT_AFFAIRE'
}

type ACTION_TYPE = keyof typeof ACTION_TYPE_ENUM

export type Payload = string | number | LeftBarEnum;

export type Action = { type: ACTION_TYPE, payload: any }

export const GLOBAL_CONTEXT = createContext<{
  dispatch: React.Dispatch<Action>,
  state: Partial<State>
}>({} as any);

export function reducer(
  state: State,
  { type, payload }: 
) {
  switch(type) {
    case ACTION_TYPE_ENUM.CHANGE_BAR:
      return {
        ...state,
        activeBarKey: payload
      };
    case ACTION_TYPE_ENUM.SELECT_PROJET: 
      return {
        ...state,
        selectedProjetIds: state.selectedProjetIds.concat([payload.toString()])
      }
    case ACTION_TYPE_ENUM.DE_SELECT_AFFAIRE:
      return {
        ...state,
        selectedAffairIds: delItemInArrById(state.selectedAffairIds, payload)
      }
    case ACTION_TYPE_ENUM.DE_SELECT_PROJET:
      return {
        ...state,
        selectedProjetIds: delItemInArrById(state.selectedProjetIds, payload)
      }
    default:
  }
  return state;
}