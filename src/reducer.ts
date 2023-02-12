import { LeftBarEnum } from "./typing";
import { getCOnfirmedIdsFromState, toggleIdInArr } from "./utils";
import React, { createContext } from "react";

export const initiaState: {
  selectedProjetIds: string[];
  selectedAffairIds: number[];
  activeBarKey: LeftBarEnum;
  searchKeyword: string
  confirmedIds: {
    projets: string[],
    affaires: number[]
  }
} = {
  activeBarKey: LeftBarEnum.PROJETS,
  selectedProjetIds: [],
  selectedAffairIds: [],
  searchKeyword: '',
  confirmedIds: {
    projets: [],
    affaires: []
  }
};

export type State = typeof initiaState;

export type Confirmed_Key = keyof State['confirmedIds']

export enum ACTION_TYPE_ENUM {
  CHANGE_BAR = "CHANGE_BAR",
  TOGGLE_SELECT_PROJET = "TOGGLE_SELECT_PROJET",
  TOGGLR_SELECT_AFFAIRE = "TOGGLR_SELECT_AFFAIRE",
  TOGGLE_SEARCH = 'TOGGLE_SEARCH',
  CONFIRMATION = 'CONFIRMATION',
  REMOVE_CONFIRMED_ITEM = 'REMOVE_CONFIRMED_ITEM'
}

type ACTION_TYPE = keyof typeof ACTION_TYPE_ENUM;

export type Payload = string | number | LeftBarEnum;

export type Action = { type: ACTION_TYPE; payload: any };

export type GlobalContextType = {
  dispatch: React.Dispatch<Action>;
  state: Partial<State>;
}

export const GLOBAL_CONTEXT = createContext<GlobalContextType>({} as any);

export function reducer(state: State, { type, payload }: Action) {
  switch (type) {
    case ACTION_TYPE_ENUM.CHANGE_BAR:
      return {
        ...state,
        activeBarKey: payload,
      };
    case ACTION_TYPE_ENUM.TOGGLE_SELECT_PROJET:
      return {
        ...state,
        selectedProjetIds: toggleIdInArr(
          state.selectedProjetIds,
          payload.toString()
        ),
      };
    case ACTION_TYPE_ENUM.TOGGLR_SELECT_AFFAIRE:
      return {
        ...state,
        selectedAffairIds: toggleIdInArr(
          state.selectedAffairIds,
          Number(payload)
        ),
      };
    case ACTION_TYPE_ENUM.TOGGLE_SEARCH:
      return {
        ...state,
        searchKeyword: payload
      }
    case ACTION_TYPE_ENUM.CONFIRMATION:
      return {
        ...state,
        confirmedIds: getCOnfirmedIdsFromState(state)
      }
    case ACTION_TYPE_ENUM.REMOVE_CONFIRMED_ITEM: {
      let { confirmedKey, id } =
        payload as { confirmedKey: Confirmed_Key, id: number | string }
      if (confirmedKey === 'projets') {
        state.confirmedIds[confirmedKey] =
          toggleIdInArr(state.confirmedIds[confirmedKey], id.toString())
      } else if (confirmedKey === 'affaires')
        state.confirmedIds[confirmedKey] =
          toggleIdInArr(state.confirmedIds[confirmedKey], Number(id))
      state.confirmedIds = { ...state.confirmedIds }
      return { ...state }
    }
    default:
  }
  return state;
}
