import { PatientsContext} from '../context/PatientContext'
import {useContext} from 'react'

export const usePatientsContext=()=>{
    const context = useContext(usePatientsContext)

    if(!context){
        throw Error('usePatientsContext')
    }

    return context
}