import { createSlice } from '@reduxjs/toolkit'

export const displaySlice = createSlice(
{
    name: 'display',
    initialState: {
      flewClass: 'dynamic-text11',
      instructionClass: 'instruction2',
      waitClass: 'dynamic-text22',
      rStatus: '',
    },
    reducers: {
      setFlewClass: (state, action) => {
        state.flewClass = action.payload
      },
      setInstructionClass: (state, action) => {
        state.instructionClass = action.payload
      },
      setWaitClass: (state, action) => {
        state.waitClass = action.payload
      },
      setRstatus: (state, action) => {
        state.rStatus = action.payload
      },
    },
  }
  
)


export const { setFlewClass, setInstructionClass, setWaitClass, setRstatus } = displaySlice.actions

export default displaySlice.reducer