import React, { useCallback, useMemo } from "react";
import { ProjectModel } from "../models/ProjectModel";
import { Action, ACTION_TYPE_ENUM, Confirmed_Key, State } from "../reducer";
import { Affaire } from "../typing";
import styles from "./index.module.scss";
import { RowWithTitleAndOperBtn } from "./MiddleContent";

interface IRightBar {
  projets: ProjectModel[];
  affaires: Affaire[];
  dispatch: React.Dispatch<Action>
  confirmedIds: State['confirmedIds']
}

const List: React.FC<{
  type: string,
  arr: (Affaire | ProjectModel)[]
  clickHandler: (id: number | string) => void
}>= ({ type, arr,clickHandler }) => {
  const len = arr.length,
    title = `${len} ${type}${len ? 's' : ''}`
  return <div className={styles.list}>
    <div className="big-text">{ title }</div>
    {
      arr.map(item => {
        const onClick = () => clickHandler(item.id)
        return <RowWithTitleAndOperBtn
          key={item.id}
          title={item.name}
          selected={true}
          noBold={true}
          clickHandler={onClick}
        />
      })
    }
  </div>
}

const RightBar: React.FC<IRightBar> = ({ projets, affaires, dispatch, confirmedIds }) => {
  const btnClickHandler = () =>
    dispatch({ type: ACTION_TYPE_ENUM.CONFIRMATION,payload: null })

  const { confirmedAff, confirmedP } = useMemo(() => {
    const confirmedP = projets
      .filter(p => confirmedIds.projets.includes(p.id));
    const confirmedAff = affaires
      .filter(a => confirmedIds.affaires.includes(a.id))
    return { confirmedP, confirmedAff }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedIds]);

  const clickHandler = useCallback((confirmedKey: Confirmed_Key) => (id: string | number) => {
    dispatch({
      type: ACTION_TYPE_ENUM.REMOVE_CONFIRMED_ITEM,
      payload: { confirmedKey, id }
    })
  }, [dispatch])

  return (
    <div className={styles["right-bar-container"]} data-testid="right-bar">
      <h2>SÉLECTION</h2>
      <div className={styles['list-wrapper']}>
        <List type="Projet" arr={confirmedP} clickHandler={clickHandler('projets')} />
        <List type="Affaire" arr={confirmedAff} clickHandler={clickHandler('affaires')} />
      </div>
      <div>
        <div className={styles.btn} onClick={btnClickHandler}>Confirmer</div>
      </div>
    </div>
  );
};

export default RightBar;
