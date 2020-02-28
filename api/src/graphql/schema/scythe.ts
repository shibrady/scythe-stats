import { gql } from 'apollo-server';

import Schema from './codegen';

export const typeDef = gql`
  extend type Query {
    playerMat(name: String!): PlayerMat
  }

  type PlayerMat {
    id: Int!
    name: String!
  }
`;

export const resolvers = {
  Query: {
    playerMat: (): Schema.Query['playerMat'] => null
  }
};
