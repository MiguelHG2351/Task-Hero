import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    currentProject: {},
}

export const projectSlice = createSlice({
    name: 'team',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      setProjects: (state, action) => void state.projects.push(action.payload),
      setProject: (state, action) => {
        state.currentProject = action.payload
      },
    },
  })
  
  export const { setProjects, setProject } = counterSlice.actions
  
  export default counterSlice.reducer
