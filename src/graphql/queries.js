/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSpoiler = /* GraphQL */ `
  query GetSpoiler($id: ID!) {
    getSpoiler(id: $id) {
      id
      name
      email
      description
      createdAt
      updatedAt
    }
  }
`;
export const listSpoilers = /* GraphQL */ `
  query ListSpoilers(
    $filter: ModelSpoilerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpoilers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
