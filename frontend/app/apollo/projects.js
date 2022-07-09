import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
    query GetTeams($userId: String, $skip: Int, $take: Int) {
        getTeams(userId: $userId, skip: $skip, take: $take) {
            full_name
            image
            id
            vaulTeam {
                secrets {
                    name
                    value
                }
            }
            projects {
                id
                name
                description
            }
            TeamAndUser {
                userId
                role
            }
        }
    }
`;

export const GET_TEAM = gql`
    query Query($getTeamId: String!) {
        getTeam(id: $getTeamId) {
            full_name
            id
            projects {
                id
                name
                description
            }
        }
    }
`;

export const CREATE_TEAM = gql`
    mutation Mutation($data: TeamInput!) {
        createTeam(data: $data) {
            full_name
            image
        }
    }
`;

export const CREATE_PROJECT = gql`
    mutation CreateProject($data: ProjectInput!) {
        createProject(data: $data) {
            description
            name
        }
    }
`;

export const GET_TABLES = gql`
    query GetTables($getTablesId: String) {
        getTables(id: $getTablesId) {
            name
            category
            id
            cards {
                id
                name
                description
                category
            }
        }
    }
`;

export const CREATE_CARD = gql`
    mutation CreateCard($data: CardInput!) {
        createCard(data: $data) {
            name
            description
            category
        }
    }
`;

export const MOVE_CARD = gql`
    mutation MoveCard($data: moveCard!) {
        moveCard(data: $data) {
            name
            description
        }
    }
`;
