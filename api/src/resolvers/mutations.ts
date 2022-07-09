import { Project, Team, Role, Table, Card } from "@prisma/client";
import type { context } from "./types";

// https://askubuntu.com/questions/180336/how-to-find-the-process-id-pid-of-a-running-terminal-program
export const mutations = {
    async createProject(
        parent: unknown,
        { data }: { data: Project },
        context: context
    ): Promise<Project> {
        const project = await context.orm.project.create({
            data: {
                name: data.name,
                description: data.description,
                image: data.image,
                teamId: data.teamId,
            },
        });
        await context.orm.table.createMany({
            data: [
                {
                    name: "Upcoming",
                    projectId: project.id,
                    category: "Low|Medium|High",
                },
                {
                  name: 'In progress',
                  projectId: project.id,
                  category: 'Low|Medium|High',
                },
                {
                  name: 'Done',
                  projectId: project.id,
                  category: 'Low|Medium|High',
                }
            ],
        });

        return project;
    },
    async createTeam(
        parent: unknown,
        { data }: { data: Team & { userId: string } },
        context: context
    ): Promise<Team> {
        console.log(data);
        const team = await context.orm.team.create({
            data: {
                full_name: data.full_name,
                image: data.image,
            },
        });

        await context.orm.teamAndUser.create({
            data: {
                userId: data.userId,
                teamId: team.id,
                role: Role.ADMIN,
            },
        });

        await context.orm.vaultTeam.create({
            data: {
                teamId: team.id,
                secrets: {
                    create: [
                        {
                            teamId: team.id,
                            name: "default",
                            value: "default",
                        },
                    ],
                },
            },
        });

        return team;
    },
    async createTable(
        parent: unknown,
        { data }: { data: Table & { projectId: string } },
        context: context
    ): Promise<Table> {
        const table = await context.orm.table.create({
            data: {
                projectId: data.projectId,
                name: data.name,
                category: data.category,
            },
        });
        return table;
    },
    async createCard(
        parent: unknown,
        { data }: { data: Card & { tableId: string } },
        context: context
    ): Promise<Card> {
        console.log(data)
        const newCard = await context.orm.card.create({
            data: {
                tableId: data.tableId,
                name: data.name,
                description: data.description,
                category: data.category,
            }
        });
        return newCard;
    }
};
