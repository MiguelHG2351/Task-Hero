import * as scalars from './scalars'
import { querys } from './querys'
import { mutations } from './mutations'
// import { resolver } from './avocado.model'

export default {
  ...scalars,
  Query: {
    getTeams: querys.getTeams,
    getTeam: querys.getTeam,
    getProjects: querys.getProjects,
    getProject: querys.getProject,
    getTables: querys.getTables,
    getTable: querys.getTable,
  },
  Mutation: {
    createProject: mutations.createProject,
    createTeam: mutations.createTeam,
    createTable: mutations.createTable,
  },
  // Project: resolver
}
