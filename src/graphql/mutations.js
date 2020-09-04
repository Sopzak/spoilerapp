/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSpoiler = /* GraphQL */ `
  mutation CreateSpoiler(
    $input: CreateSpoilerInput!
    $condition: ModelSpoilerConditionInput
  ) {
    createSpoiler(input: $input, condition: $condition) {
      id
      name
      email
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateSpoiler = /* GraphQL */ `
  mutation UpdateSpoiler(
    $input: UpdateSpoilerInput!
    $condition: ModelSpoilerConditionInput
  ) {
    updateSpoiler(input: $input, condition: $condition) {
      id
      name
      email
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteSpoiler = /* GraphQL */ `
  mutation DeleteSpoiler(
    $input: DeleteSpoilerInput!
    $condition: ModelSpoilerConditionInput
  ) {
    deleteSpoiler(input: $input, condition: $condition) {
      id
      name
      email
      description
      createdAt
      updatedAt
    }
  }
`;
