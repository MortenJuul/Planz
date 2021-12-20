import React from 'react'
import newPlanStore from './planStore'
import { useLocalStore } from 'mobx-react'

const PlanContext = React.createContext(null)

export const PlanProvider = ({children}) => {
  // const planStore = useLocalStore(newPlanStore)

  return <PlanContext.Provider value={newPlanStore}>
    {children}
  </PlanContext.Provider>
}

export const usePlanStore = () => React.useContext(PlanContext)