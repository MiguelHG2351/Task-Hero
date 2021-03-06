import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamList: [],
  currentUser: {},
  currentTeam: {},
  users: [
    {
      image: "/images/examples/user.png",
    },
    {
      image: "/images/examples/user.png",
    },
  ],
};

export const projectSlice = createSlice({
  name: "team",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTeams: (state, action) => {
      state.teamList = action.payload;
    },
    setProject: (state, action) => {
      state.currentProject = action.payload;
    },
    setUser: (state,action) => {
      console.log('cambiando el estado')
      state.currentUser = action.payload;
    },
    setCurrentTeam: (state,action) => {
      state.currentTeam = action.payload;
    }
  },
});

export const { setTeams, setProject, setUser, setCurrentTeam } = projectSlice.actions;


export const selectProject = (state, projectName) => {
  const findProject = state.teamList.find((project) => project.projectName === projectName)
  if(findProject) {
    return findProject
  }
}

export const selectProjects = (state) => state.projects;

export const selectCurrentTeam = (state) => state.currentTeam;

export const selectUser = (state) => state.team.currentUser;

export default projectSlice.reducer;
