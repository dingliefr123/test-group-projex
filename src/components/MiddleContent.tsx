import React, { useContext, useMemo, useState } from "react";
import { ProjectModel, ProjectStatusEnum } from "../models/ProjectModel";
import { GLOBAL_CONTEXT, ACTION_TYPE_ENUM, Action } from "../reducer";
import { Affaire, LeftBarEnum } from "../typing";
import { CircleMinnus, CirclePlus, SearchIcon, RemoveIcon } from "../icons";
import styles from "./index.module.scss";
import { filterArrBySearchKw, throttle } from "../utils";

interface IMiddleContent {
  projets: ProjectModel[];
  affaires: Affaire[];
  dispatch: React.Dispatch<Action>
}
const startSearchThrottle = throttle();
export const Search: React.FC<{
  dispatch?: React.Dispatch<Action>
}> = ({ dispatch }) => {
  const [ keyword, setKeyW ] = useState('');
  const changeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.currentTarget.value;
    setKeyW(value);
    startSearchThrottle(() =>
      dispatch?.({ type: ACTION_TYPE_ENUM.TOGGLE_SEARCH, payload: value }));
  };
  const removeIconhandler = () => {
    setKeyW('');
    dispatch?.({ type: ACTION_TYPE_ENUM.TOGGLE_SEARCH, payload: '' })
  }
  return (
    <div className={styles.search} data-testid="search">
      <input value={keyword} onChange={changeHandler} data-testid="input" />
      {
        keyword ? <RemoveIcon onClick={removeIconhandler} /> : <SearchIcon />
      }
    </div>
  );
};

function getSelectedClass(selected: boolean | undefined) {
  return [
    styles["row-with-title-span"],
    selected ? styles.selected : "",
  ].join(" ");
}

const RowTitleEmphaszingSearchKw: React.FC<{
  title: string,
  keyword?: string,
  selected?: boolean
  noBold?: boolean
}> = ({ keyword, selected, title, noBold }) => {
  if (noBold)
    return <span className={styles["row-with-title-span"]}>{ title }</span>
  if (!keyword)
    return <span className={getSelectedClass(selected)}>{ title }</span>
  const startIdx = title.indexOf(keyword), 
    endIdx = startIdx + keyword.length;
  return <span className={styles["row-with-title-span"]}>
    { title.substring(0, startIdx) }
    <span className={getSelectedClass(true)}>{ title.substring(startIdx, endIdx) }</span>
    { title.slice(endIdx) }
  </span>
  
}

const getRowClassname = ({ 
  dim,
  selected
}: Pick<
  Parameters<typeof RowWithTitleAndOperBtn>[0],
  'dim' | 'selected'
  >
) => [
  styles["row-with-title"],
  dim ? "dim-text" : "",
  selected ? 'selected' : ''
].join(' ');

export const RowWithTitleAndOperBtn: React.FC<{
  title: string;
  clickHandler?: () => void;
  dim?: boolean;
  selected?: boolean;
  children?: React.ReactElement | null;
  keyword?: string
  noBold?: boolean
}> = ({ title, dim, selected, clickHandler, children, keyword,noBold }) => (
  <div
    className={getRowClassname({ dim, selected })}
    onClick={clickHandler}
    data-testid='oper-row'
  >
    {dim ? (
      <span className={styles["span-placceholder"]}></span>
    ) : selected ? (
      <CircleMinnus />
    ) : (
      <CirclePlus />
    )}
    <RowTitleEmphaszingSearchKw
      title={title}
      keyword={keyword}
      selected={selected}
      noBold={noBold}
    />
    {children ?? null}
  </div>
);

const ProjetList: React.FC<{
  projets: ProjectModel[];
  selectedProjIds: string[];
  selectHandler: (id: string) => void;
  keyword: string
}> = ({ projets, selectedProjIds, selectHandler, keyword }) => {
  return (
    <div data-testid="projet-list">
      {projets.map((item) => {
        const isArchived = item.status === ProjectStatusEnum.ARCHIVED;
        const clickHandler = () => selectHandler(item.id)
        return (
          <RowWithTitleAndOperBtn
            key={item.id}
            title={item.name}
            dim={isArchived}
            clickHandler={clickHandler}
            selected={selectedProjIds.includes(item.id)}
            keyword={keyword}
          >
            {isArchived ? <span className="dim-text">(Archived)</span> : null}
          </RowWithTitleAndOperBtn>
        );
      })}
    </div>
  );
};

const AffaireList: React.FC<{
  affaires: Affaire[];
  selectedAffairIds: number[];
  selectHandler: (id: number) => void;
  keyword: string
}> = ({ affaires, selectedAffairIds, selectHandler, keyword }) => {
  const projetsIncludingAffaires = useMemo(() => {
    const map: Record<string, Affaire[]> = {};
    for (const affich of affaires) {
      const pName = affich.pName;
      if (pName in map) map[pName].push(affich);
      else map[pName] = [affich];
    }
    return Object.values(map);
  }, [affaires]);

  return (
    <div data-testid="affaire-list">
      {projetsIncludingAffaires.map((affaires) => {
        const { pName } = affaires[0];
        return (
          <React.Fragment key={pName}>
            <h4>{pName}</h4>
            {affaires.map((item) => {
              const clickHandler = () => selectHandler(item.id);
              return (
                <RowWithTitleAndOperBtn
                  key={item.id}
                  title={item.name}
                  clickHandler={clickHandler}
                  selected={selectedAffairIds.includes(item.id)}
                  keyword={keyword}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const ListWrapper: React.FC<
  IMiddleContent & {
    ProjetListRender: typeof ProjetList;
    AffairesRender: typeof AffaireList;
  }
> = ({ ProjetListRender, projets, affaires }) => {
  const { state, dispatch } = useContext(GLOBAL_CONTEXT);
  const selectHandler = (type: ACTION_TYPE_ENUM) => (id: number | string) => {
    dispatch({ type, payload: id });
  };
  const isProjet = state.activeBarKey === LeftBarEnum.PROJETS
  const {
    filteredAffaires,
    filteredProjets,
  } = useMemo(() => {
    let filteredProjets = projets,
    filteredAffaires = affaires;
    const { searchKeyword } = state;
    if (searchKeyword) {
      if (isProjet)
        filteredProjets = filterArrBySearchKw(filteredProjets, searchKeyword)
      else
        filteredAffaires = filterArrBySearchKw(filteredAffaires, searchKeyword)
    }
    return { filteredAffaires, filteredProjets }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ state ]);

  if (isProjet)
    return (
      <ProjetListRender
        projets={filteredProjets}
        selectedProjIds={state.selectedProjetIds || []}
        selectHandler={selectHandler(ACTION_TYPE_ENUM.TOGGLE_SELECT_PROJET)}
        keyword={state.searchKeyword || ''}
      />
    );

  return (
    <AffaireList
      affaires={filteredAffaires}
      selectedAffairIds={state.selectedAffairIds || []}
      selectHandler={selectHandler(ACTION_TYPE_ENUM.TOGGLR_SELECT_AFFAIRE)}
      keyword={state.searchKeyword || ''}
    />
  );
};

const MiddleContent: React.FC<IMiddleContent> = (props) => {
  return (
    <div data-testid="middle-content">
      <Search dispatch={props.dispatch} />
      <ListWrapper
        {...props}
        ProjetListRender={ProjetList}
        AffairesRender={AffaireList}
      />
    </div>
  );
};

export default MiddleContent;
