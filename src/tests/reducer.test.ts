import { reducer, initiaState, ACTION_TYPE_ENUM } from '../reducer';
import { LeftBarEnum } from '../typing';

describe("les tests de 'reducer'", () => {
  let state = initiaState
  beforeEach(() => {
    state = JSON.parse(JSON.stringify(initiaState))
  })
  test("quand il évoke l'évenement de 'CHANGE_BAR' et envoyer le nouveau 'activeBarKey' comme 'payload', " + 
  "'activeBarKey' dedans doit renouveler", () => {
    const action = { type: ACTION_TYPE_ENUM.CHANGE_BAR, payload: LeftBarEnum.AFFAIRES };
    const newState = reducer(state, action);
    expect(newState.activeBarKey).not.toBe(state.activeBarKey);
  })

  test("quand il évoke l'évenement de 'TOGGLE_SELECT_PROJET' et envoyer le nouveau 'selectedProjetIds' comme 'payload', " +
  "'selectedProjetIds' dedans doit renouveler", () => {
    const inputId = '1';
    const action = { type: ACTION_TYPE_ENUM.TOGGLE_SELECT_PROJET, payload: inputId };
    const newState = reducer(state, action);
    expect(newState.selectedProjetIds).toContain(inputId);
  })

  test("quand il évoke l'évenement de 'TOGGLE_SEARCH' et envoyer le nouveau 'searchKeyword' comme 'payload', " +
  "'searchKeyword' dedans doit renouveler", () => {
    const searchKeyword = 'abc';
    const action = { type: ACTION_TYPE_ENUM.TOGGLE_SEARCH, payload: searchKeyword };
    const newState = reducer(state, action);
    expect(newState.searchKeyword).toEqual(searchKeyword);
  })

  test("quand il évoke l'évenement de 'CONFIRMATION', " +
  "'confirmedIds' dedans doit renouveler", () => {
    const projetId = '1', affaireId = 1;
    state.selectedAffairIds = [affaireId];
    state.selectedProjetIds = [projetId];
    const action = { type: ACTION_TYPE_ENUM.CONFIRMATION, payload: null };
    const { confirmedIds: { affaires, projets } } = reducer(state, action);
    expect(projets).toContain(projetId);
    expect(affaires).toContain(affaireId);
  })

})