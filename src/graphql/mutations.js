/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFeed = /* GraphQL */ `
  mutation CreateFeed(
    $input: CreateFeedInput!
    $condition: ModelFeedConditionInput
  ) {
    createFeed(input: $input, condition: $condition) {
      id
      timestamp
      articles
      sources
      createdAt
      updatedAt
    }
  }
`;
export const updateFeed = /* GraphQL */ `
  mutation UpdateFeed(
    $input: UpdateFeedInput!
    $condition: ModelFeedConditionInput
  ) {
    updateFeed(input: $input, condition: $condition) {
      id
      timestamp
      articles
      sources
      createdAt
      updatedAt
    }
  }
`;
export const deleteFeed = /* GraphQL */ `
  mutation DeleteFeed(
    $input: DeleteFeedInput!
    $condition: ModelFeedConditionInput
  ) {
    deleteFeed(input: $input, condition: $condition) {
      id
      timestamp
      articles
      sources
      createdAt
      updatedAt
    }
  }
`;
