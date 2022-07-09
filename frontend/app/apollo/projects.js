import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetTeams($userId: String, $skip: Int, $take: Int) {
    getTeams(userId: $userId, skip: $skip, take: $take) {
      full_name
      id
      vaulTeam {
        secrets {
          name
          value
        }
      }
      projects {
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
        name
        description
      }
    }
  }
`;

export const CREATE_TEAM = gql`
  mutation Mutation($data: TeamInput!) {
    createTeam(data: $data) {
      full_name,
      image
    }
  }
`;
