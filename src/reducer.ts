import { LeftBarEnum } from "./typing";
import { toggleIdInArr } from "./utils";
import React, { createContext } from "react";

export const initiaState: {
  selectedProjetIds: string[];
  selectedAffairIds: number[];
  activeBarKey: LeftBarEnum;
} = {
  activeBarKey: LeftBarEnum.PROJETS,
  selectedProjetIds: [],
  selectedAffairIds: [],
};

type State = typeof initiaState;

export enum ACTION_TYPE_ENUM {
  CHANGE_BAR = "CHANGE_BAR",
  TOGGLE_SELECT_PROJET = "TOGGLE_SELECT_PROJET",
  TOGGLR_SELECT_AFFAIRE = "TOGGLR_SELECT_AFFAIRE",
}

type ACTION_TYPE = keyof typeof ACTION_TYPE_ENUM;

export type Payload = string | number | LeftBarEnum;

export type Action = { type: ACTION_TYPE; payload: any };

export const GLOBAL_CONTEXT = createContext<{
  dispatch: React.Dispatch<Action>;
  state: Partial<State>;
}>({} as any);

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
    default:
  }
  return state;
}
