# GraphQLObjectId
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
