import React, {  useContext } from "react"
import type { ProjectModel } from "../models/ProjectModel"
import { GLOBAL_CONTEXT } from "../reducer"
import { Affiche, LeftBarEnum } from "../typing"

interface IMiddleContent {
  projets: ProjectModel[],
  affiches: Affiche[]
}

const RowWithTitleAndOperBtn: React.FC<{
  title: string
}> = ({ title }) => <div>
  <span>+  -</span>
  <span>{ title }</span>
</div>

const ProjetList: React.FC<{
  projets: ProjectModel[],
  selectedProjIds: string[]
}> = ({ projets, selectedProjIds }) => <div>
  {
    projets.map((item) =>
      <RowWithTitleAndOperBtn
        key={item.id}
        title={item.name}
      />
    )
  }
</div>

const AfficheList: React.FC<{
  affiches: Affiche[],
  selectedAffcihIds: number[]
}> = ({ affiches, selectedAffcihIds }) => <div>
  {
    affiches.map((item) =>
      <RowWithTitleAndOperBtn
        key={item.id}
        title={item.name}
      />
    )
  }
</div>

const ListWrapper: React.FC<IMiddleContent & {
  ProjetListRender: typeof ProjetList,
  AffichesRender: typeof AfficheList
}> = ({
  ProjetListRender,
  projets
}) => {
  const { state } = useContext(GLOBAL_CONTEXT);
  //const clickHandler = () => {};
  
  if (state.activeBarKey === LeftBarEnum.PROJETS)
    return <ProjetListRender
      projets={projets}
      selectedProjIds={state.selectedProjetIds || []} 
    />

  return null
}

const MiddleContent: React.FC<IMiddleContent> = (props) => {

  return <div>
    <div>Search</div>
    <ListWrapper
      {...props}
      ProjetListRender={ProjetList}
      AffichesRender={AfficheList}
    />
  </div>
}

export default MiddleContent