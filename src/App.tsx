import {
  DEL_EXCLUDEDE_DATA as Projets,
  Affaires
} from './utils';
import styles from './App.module.scss';
import { useCallback, useReducer } from 'react';
import { ACTION_TYPE_ENUM, GLOBAL_CONTEXT, initiaState, reducer } from './reducer';
import { LeftBar, RightBar, MiddleContent } from './components'
import { LeftBarEnum } from './typing';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initiaState);

  const setActiveBarIdx = useCallback((barIdx: LeftBarEnum) => {
    if ([LeftBarEnum.ENTITES,LeftBarEnum.CLIENTS].includes(barIdx))
      return;
    dispatch({ type: ACTION_TYPE_ENUM.CHANGE_BAR, payload: barIdx })
  }, [])

  return (
    <GLOBAL_CONTEXT.Provider value={{ state, dispatch }}>
      <div className={styles['container']}>
        <LeftBar activeIdx={state.activeBarKey} setActiveIdx={setActiveBarIdx} />
        <MiddleContent
          projets={Projets}
          affaires={Affaires}
          dispatch={dispatch}
        />
        <RightBar
          projets={Projets}
          affaires={Affaires}
          dispatch={dispatch}
          confirmedIds={state.confirmedIds}
        />
      </div>
    </GLOBAL_CONTEXT.Provider>
  )
};
export default App