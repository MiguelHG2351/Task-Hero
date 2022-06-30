import { SET_PROJECT, SET_PROJECTS } from './types';

export const setProjects = (payload) => ({
  type: SET_PROJECTS,
  payload,
});

export const setProject = (payload) => ({
  type: SET_PROJECT,
  payload,
});
