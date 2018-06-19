# GraphQLObjectId

[![Build Status](https://travis-ci.org/isayme/graphql-scalar-objectid.svg?branch=master)](https://travis-ci.org/isayme/graphql-scalar-objectid)
[![Coverage Status](https://coveralls.io/repos/github/isayme/graphql-scalar-objectid/badge.svg?branch=master)](https://coveralls.io/github/isayme/graphql-scalar-objectid?branch=master)
[![npm](https://img.shields.io/npm/v/graphql-scalar-objectid.svg)](https://www.npmjs.com/package/graphql-scalar-objectid)

GraphQL scalar type for mongodb ObjectId.

## Example
```
const { GraphQLObjectType, GraphQLString } = require('graphql')
const GraphQLObjectId = require('graphql-scalar-objectid')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {
      type: GraphQLObjectId
    },
    name: {
      type: GraphQLString
    }
  }
})
```
