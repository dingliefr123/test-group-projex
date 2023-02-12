/* eslint-disable testing-library/prefer-presence-queries */
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MiddleContent } from "../components";
import { Search } from "../components/MiddleContent";
import { ACTION_TYPE_ENUM, GlobalContextType, GLOBAL_CONTEXT } from "../reducer";
import { LeftBarEnum } from "../typing";
import {
  DEL_EXCLUDEDE_DATA as Projets,
  Affaires,
  getIdxRandomlly
} from '../utils';

const withContext =
  (value: GlobalContextType) =>
  ({ children }: { children: React.ReactElement }) =>
    <GLOBAL_CONTEXT.Provider value={value}>
      { children }
    </GLOBAL_CONTEXT.Provider>

describe("les tests du rendu de composant 'MiddleContent'", () => {
  let DefaultProps = {
    projets: Projets,
    affaires: Affaires,
    dispatch: ()=>{}
  }
  beforeEach(() => {
    DefaultProps.dispatch = () => {}
  })
  test("le composant peut rendre correctemnt, c'est-à-dire il faut avoir 2 élements initialement, " +
  "'search' et 'projet-list', en même temps, le 'affaire-list' dois être invisible", async () => {
    const wrapper = withContext({ dispatch:()=>{}, state: { activeBarKey: LeftBarEnum.PROJETS } })
    render(<MiddleContent {...DefaultProps} />, { wrapper })
    expect(screen.queryByTestId('search')).not.toBeNull()
    expect(screen.queryByTestId('projet-list')).not.toBeNull()
    expect(screen.queryByTestId('affaire-list')).toBeNull()
  })

  test("après le changement de attribute 'activeIdx' de store, le composant doit renouveler " +
  "puis après le 'update', l'élement 'Affaires' doit être 'active', " +
  "c'est-à-dire il a un class, qui s'apelle 'active'", () => {
    const contextValue = {
      dispatch: () => {},
      state: { activeBarKey: LeftBarEnum.PROJETS }
    }
    const wrapper = withContext(contextValue)
    const {rerender} = render(<MiddleContent {...DefaultProps} />, { wrapper })
    contextValue.state = { activeBarKey: LeftBarEnum.AFFAIRES }
    rerender(<MiddleContent {...DefaultProps} />);
    expect(screen.queryByTestId('affaire-list')).not.toBeNull()
    expect(screen.queryByTestId('projet-list')).toBeNull()
  })

  test("après le clique sur n'import quel 'projet', le composant doit dispatch l'évenement avec type 'TOGGLE_SELECT_PROJET' " +
  "et envoyer le id du 'projet', puis après le mise-à-jour, ce projet doit être 'selected', " + 
  "c'est-à-dire il a un class, qui s'apelle 'selected'", () => {
    const mockDispatch = jest.fn()
    const contextValue = {
      dispatch: mockDispatch,
      state: {
        activeBarKey: LeftBarEnum.PROJETS,
        selectedProjetIds: [] as string[]
      }
    }
    DefaultProps.dispatch = mockDispatch
    const wrapper = withContext(contextValue)
    const { rerender } = render(<MiddleContent {...DefaultProps} />, { wrapper })
    const rows = screen.getAllByTestId('oper-row')
    expect(rows.length).toBeGreaterThan(0);
    const randomIdx = getIdxRandomlly(rows.length);
    const selectedRow = rows[randomIdx];
    fireEvent.click(selectedRow)
    const selectedRowId = Projets[randomIdx].id
    expect(mockDispatch)
      .toHaveBeenCalledWith(
        expect.objectContaining({
          type: ACTION_TYPE_ENUM.TOGGLE_SELECT_PROJET,
          payload: selectedRowId
        })
      );
    contextValue.state = {
      ...contextValue.state,
      selectedProjetIds: [selectedRowId]
    }
    rerender(<MiddleContent {...DefaultProps} />)
    const newRows = screen.getAllByTestId('oper-row')
    expect(newRows[randomIdx].className).toMatch(/selected/i)
  })

});

describe("les tests de la functionalité 'search'", () => {
  test("tout d'abord, ce composant doit être rendu correctement, c'est-à-dire il faut avoir l'élement d'input", () => {
    render(<Search />)
    expect(screen.getByTestId('input')).not.toBeNull();
  })

  test("après l'entrée des quelques mots, ces mots doivent être viisble et appeler le 'dispatch'", async () => {
    const mockFn = jest.fn()
    render(<Search dispatch={mockFn} />)
    const inputEl = screen.getByTestId('input')
    const value = '123'
    fireEvent.change(inputEl, { target: { value } })
    await new Promise(res => setTimeout(res, 1000))
    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ACTION_TYPE_ENUM.TOGGLE_SEARCH,
        payload: value
      })
    )
  })
})