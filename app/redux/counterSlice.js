import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [
    {
      projectName: "Real Stable website xd",
      tables: [
          {
            name: "upcoming",
            category: ['Low', 'Medium', 'Hight'],
            cards: [
              {
                name: "Mobile Response",
                description: "Se adaptara a mobiles",
                category: "Low",
                messages: ['xD', 'sasds', 'ddasds'],
                files: ['xD', 'sasds', 'ddasds'],
                links: ['xD', 'sasds', 'ddasds'],
              }
            ]
          }
      ],
      users: [
        {
          image: "/images/examples/user.png",
        },
        {
          image: "/images/examples/user.png",
        },
      ],
    },
  ],
};

export const projectSlice = createSlice({
  name: "team",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setProjects: (state, action) => void state.projects.push(action.payload),
    setProject: (state, action) => {
      state.currentProject = action.payload;
    },
  },
});

export const { setProjects, setProject } = projectSlice.actions;

export const selectProject = (state, projectName) => {
  const findProject = state.projects.find((project) => project.projectName === projectName)
  if(findProject) {
    return findProject
  }
}

export default projectSlice.reducer;
