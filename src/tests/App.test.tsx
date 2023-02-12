import { fireEvent, render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import App from '../App';
import { LeftBar, RightBar } from '../components';
import { ProjectModel } from '../models/ProjectModel';
import { ACTION_TYPE_ENUM } from '../reducer';
import { LeftBarEnum, Affaire } from '../typing';

describe("les tests du rendu de 'App'", () => {
  test("le composant peut rendre correctemnt, c'est-à-dire il faut avoir 3 élements, " +
  "'left-bar', 'middle-content' et 'right-bar'", () => {
    render(<App />)
    const required3TestIds = [ 'left-bar', 'middle-content', 'right-bar' ]
    for(const testId of required3TestIds)
      expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

});

describe("les tests de comportement du composant'LeftBar', qui fonctionne à choisir entre 'Projets' et 'Affaires'", () => {
  test("le composant 'LeftBar' doit être rendu correctement initialement " +
  "c'est-à-dire il faut avoir 4 élements et le premier élement dois être focused", () => {
    render(<LeftBar activeIdx={LeftBarEnum.PROJETS} setActiveIdx={()=>{}} />)
    const leftBarItems = screen.queryAllByTestId('left-bar-item')
    expect(leftBarItems).toHaveLength(4);
    const projectBar = leftBarItems[0];
    expect(projectBar).toHaveTextContent(LeftBarEnum.PROJETS);
    expect(projectBar.className).toMatch(/active/i)
  })

  test("après le clique de l'élement 'Affaires', le composant doit appeler le callbacl 'setActiveIdx' " +
  "puis après le 'update', l'élement 'Affaires' doit être 'active'", () => {
    const mockSetActiveIdx = jest.fn();
    let activeIdx = LeftBarEnum.PROJETS
    const { rerender } = render(
      <LeftBar
        activeIdx={activeIdx}
        setActiveIdx={mockSetActiveIdx}
      />
    );
    activeIdx = LeftBarEnum.AFFAIRES
    const affaireEle = screen.getByText(activeIdx);
    expect(affaireEle).toBeInTheDocument();
    fireEvent.click(affaireEle);
    expect(mockSetActiveIdx).toHaveBeenCalledWith(activeIdx)
    rerender(
      <LeftBar
        activeIdx={activeIdx}
        setActiveIdx={mockSetActiveIdx}
      />
    );
    expect(screen.getByText(activeIdx).className).toMatch(/active/i)
  })
});

describe("les tests du rendu de 'RightBar'", () => {
  test("le composant peut rendre correctemnt, c'est-à-dire il faut avoir 4 élements, " +
  "'title', 'list' et 'confirm-btn'", () => {
    render(<RightBar
      projets={[] as ProjectModel[]}
      affaires={[] as Affaire[]}
      confirmedIds={{ projets: [], affaires: [] }}
      dispatch={() => {}}
    />)
    const required4Texts = [ 'SÉLECTION', '0 Projet', '0 Affaire', 'Confirmer' ]
    for(const text of required4Texts)
      expect(screen.getByText(text)).toBeInTheDocument()
  })

  test("après le clique de button 'Confirmer', le composant doit appeler le callback 'dispatch' " +
  "et l'argument doit avoir 'type' avec la valeur égale à 'CONFIRMATION'", () => {
    const mockDispatch = jest.fn()
    render(<RightBar
      projets={[] as ProjectModel[]}
      affaires={[] as Affaire[]}
      confirmedIds={{ projets: [], affaires: [] }}
      dispatch={mockDispatch}
    />)
    const btnEl = screen.getByText('Confirmer');
    fireEvent.click(btnEl);
    expect(mockDispatch)
      .toHaveBeenCalledWith(
        expect.objectContaining({
          type: ACTION_TYPE_ENUM.CONFIRMATION
        })
      );
  })

});