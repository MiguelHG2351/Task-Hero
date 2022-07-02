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
