import React, { useContext, useMemo } from "react";
import { ProjectModel, ProjectStatusEnum } from "../models/ProjectModel";
import { GLOBAL_CONTEXT, ACTION_TYPE_ENUM } from "../reducer";
import { Affiche, LeftBarEnum } from "../typing";
import { CircleMinnus, CirclePlus, SearchIcon } from "../icons";
import styles from "./index.module.scss";

interface IMiddleContent {
  projets: ProjectModel[];
  affiches: Affiche[];
}

const Search: React.FC = () => {
  return (
    <div className={styles.search}>
      <input />
      <SearchIcon />
    </div>
  );
};

const RowWithTitleAndOperBtn: React.FC<{
  title: string;
  dim?: boolean;
  selected?: boolean;
  clickHandler: () => void;
  children?: React.ReactElement | null;
}> = ({ title, dim, selected, clickHandler, children }) => (
  <div
    className={`${dim ? "dim-text" : ""} ${styles["row-with-title"]}`}
    onClick={clickHandler}
  >
    {dim ? (
      <span className={styles["span-placceholder"]}></span>
    ) : selected ? (
      <CircleMinnus />
    ) : (
      <CirclePlus />
    )}
    <span
      className={[
        styles["row-with-title-span"],
        selected ? "selected" : "",
      ].join(" ")}
    >
      {title}
    </span>
    {children ?? null}
  </div>
);

const ProjetList: React.FC<{
  projets: ProjectModel[];
  selectedProjIds: string[];
  selectHandler: (id: string) => void;
}> = ({ projets, selectedProjIds, selectHandler }) => {
  return (
    <div>
      {projets.map((item) => {
        const isArchived = item.status === ProjectStatusEnum.ARCHIVED;
        const clickHandler = () => selectHandler(item.id);
        return (
          <RowWithTitleAndOperBtn
            key={item.id}
            title={item.name}
            dim={isArchived}
            clickHandler={clickHandler}
            selected={selectedProjIds.includes(item.id)}
          >
            {isArchived ? <span className="dim-text">(Archived)</span> : null}
          </RowWithTitleAndOperBtn>
        );
      })}
    </div>
  );
};

const AfficheList: React.FC<{
  affiches: Affiche[];
  selectedAffairIds: number[];
  selectHandler: (id: number) => void;
}> = ({ affiches, selectedAffairIds, selectHandler }) => {
  const projetsIncludingAffiches = useMemo(() => {
    const map: Record<string, Affiche[]> = {};
    for (const affich of affiches) {
      const pName = affich.pName;
      if (pName in map) map[pName].push(affich);
      else map[pName] = [affich];
    }
    return Object.values(map);
  }, [affiches]);

  return (
    <div>
      {projetsIncludingAffiches.map((affiches) => {
        const { pName } = affiches[0];
        return (
          <React.Fragment key={pName}>
            <h4>{pName}</h4>
            {affiches.map((item) => {
              const clickHandler = () => selectHandler(item.id);
              return (
                <RowWithTitleAndOperBtn
                  key={item.id}
                  title={item.name}
                  clickHandler={clickHandler}
                  selected={selectedAffairIds.includes(item.id)}
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
    AffichesRender: typeof AfficheList;
  }
> = ({ ProjetListRender, projets, affiches }) => {
  const { state, dispatch } = useContext(GLOBAL_CONTEXT);
  const selectHandler = (type: ACTION_TYPE_ENUM) => (id: number | string) => {
    dispatch({ type, payload: id });
  };

  if (state.activeBarKey === LeftBarEnum.PROJETS)
    return (
      <ProjetListRender
        projets={projets}
        selectedProjIds={state.selectedProjetIds || []}
        selectHandler={selectHandler(ACTION_TYPE_ENUM.TOGGLE_SELECT_PROJET)}
      />
    );

  return (
    <AfficheList
      affiches={affiches || []}
      selectedAffairIds={state.selectedAffairIds || []}
      selectHandler={selectHandler(ACTION_TYPE_ENUM.TOGGLR_SELECT_AFFAIRE)}
    />
  );
};

const MiddleContent: React.FC<IMiddleContent> = (props) => {
  return (
    <div>
      <Search />
      <ListWrapper
        {...props}
        ProjetListRender={ProjetList}
        AffichesRender={AfficheList}
      />
    </div>
  );
};

export default MiddleContent;
