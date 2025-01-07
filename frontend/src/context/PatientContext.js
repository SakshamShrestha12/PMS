import {createContext, useReducer} from 'react'

export const PatientsContext = createContext()

export const patientsReducer=(state, action)=>{
    switch(action.type){
        case 'SETPATIENTS':
            return {
                patients: action.payload
            }
        case 'CREATE_PATIENT':
            return{
                patients: [action.payload, ...state.patients]
            }
            default:
                return state
    }

}

export const PatientContextProvider=({children})=>{
    const[state, dispatch] = useReducer(patientsReducer,{
        patients: null
    })

    return(
        <PatientsContext.Provider value={{ patients: state.patients, dispatch }}>
            {children}
            </PatientsContext.Provider>

    )
}
