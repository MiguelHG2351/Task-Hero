import { Project, Team, Role, Table } from '@prisma/client'
import type { context } from './types'

export const mutations = {
  async createProject(
    parent: unknown,
    { data }: { data: Project },
    context: context
  ): Promise<Project> {

    return await context.orm.project.create({
      data: {
        name: data.name,
        description: data.description,
        teamId: data.teamId,
      },
    })
  },
  async createTeam(parent: unknown, { data }: { data: Team & {userId: string} }, context: context): Promise<Team> {
    console.log(data.userId)
    const team = await context.orm.team.create({
        data: {
          full_name: data.full_name,
          vaultId: data.vaultId,
        },
      })

    await context.orm.teamAndUser.create({
        data: {
            userId: data.userId,
            teamId: team.id,
            role: Role.ADMIN,
        }
    })

      await context.orm.vaultTeam.create({
        data: {
            teamId: team.id,
            secrets: {
                create: [{
                    teamId: team.id,
                    name: 'default',
                    value: 'default',
                }]
            }
        }
      })
    
    return team
  },
  async createTable(parent: unknown, { data }: { data: Table & {projectId: string} }, context: context): Promise<Table> {
    const table = await context.orm.table.create({
      data: {
          projectId: data.projectId,  
          name: data.name,
          category: data.category,
      }
    })
    return table
  }
}
