// import { Avocado } from "./base/avocado.model"
import type { Project, Team, TeamAndUser, VaultTeam, Table } from '@prisma/client'
import type { context } from './types'

type TeamData = {
    TeamAndUser: TeamAndUser[],
    vaulTeam: VaultTeam[]
} & Team

export const querys = {
    async getTeams(root: unknown, args: {userId: string, skip?: number, take?:number}, context: context): Promise<TeamData[]> {
        
        const teams = await context.orm.team.findMany({
            where: {
                TeamAndUser: {
                    every: {
                        userId: {
                            equals: args.userId
                        }
                    }
                }
            },
            include: {
                TeamAndUser: {
                    include: {
                        user: true
                    }
                },
                projects: true,
                vaulTeam: {
                    include: {
                        secrets: true
                    }
                }
            }
        });

        return teams
    },
    async getTeam(root: unknown, args: { id: string }, context: context): Promise<TeamData | null> {
        return  await context.orm.team.findFirst({
            where: {
                id: args.id,
            },
            include: {
                TeamAndUser: {
                    include: {
                        user: true
                    }
                },
                vaulTeam: {
                    include: {
                        secrets: true
                    }
                },
                projects: true
            }
        });
    },
    async getProjects(root: unknown, args: { id: string }, context: context): Promise<Project[] | null> {
        return  await context.orm.project.findMany({
            where: {
                teamId: args.id,
            }
        });
    },
    async getProject(root: unknown, args: { id: string }, context: context): Promise<Project | null> {
        const project= await context.orm.project.findFirst({
            where: {
                teamId: args.id,
            }
        });
        
        console.log(project)
        
        return project
    },
    async getTables(root: unknown, args: { id: string }, context: context): Promise<Table[] | null> {
        return await context.orm.table.findMany({
            where: {
                projectId: args.id,
            }
        });
    },
    async getTable(root: unknown, args: { id: string }, context: context): Promise<Table | null> {
        return  await context.orm.table.findUnique({
            where: {
                id: args.id,
            }
        });
    }
}
