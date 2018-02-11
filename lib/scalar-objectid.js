const { GraphQLScalarType } = require('graphql')
const ObjectId = require('bson').ObjectId

const isObjectId = require('./is-objectid')

const parseObjectId = _id => {
  if (isObjectId(_id)) {
    return ObjectId(_id)
  }

  throw new Error('ObjectId must be a single String of 24 hex characters')
}

const GraphQLObjectId = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'The `ObjectId` scalar type represents a mongodb unique ID',
  serialize: String,
  parseValue: parseObjectId,
  parseLiteral: function parseLiteral (ast) {
    return parseObjectId(ast.value)
  }
})

module.exports = GraphQLObjectId
