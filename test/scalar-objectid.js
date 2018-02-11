const assert = require('assert')
const {
  graphql,
  isScalarType,
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql')
const ObjectId = require('bson').ObjectId
const GraphQLObjectId = require('../lib/scalar-objectid')

describe('GraphQLObjectId', () => {
  it('should be scalar type', () => {
    assert.equal(isScalarType(GraphQLObjectId), true)
  })

  let id

  it('serialize', done => {
    id = String(ObjectId())
    assert.equal(GraphQLObjectId.serialize(ObjectId(id)), id)

    id = String(ObjectId())
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
          _id: {
            type: GraphQLObjectId,
            resolve: () => ObjectId(id)
          }
        }
      })
    })
    graphql(schema, '{ _id }')
      .then(data => {
        assert.deepEqual(data, { data: { _id: id } })
        done()
      })
      .catch(done)
  })

  const errChecker = err =>
    err.message === 'ObjectId must be a single String of 24 hex characters'

  it('parseValue', done => {
    assert.throws(() => GraphQLObjectId.parseValue('not ObjectId'), errChecker)

    id = String(ObjectId())
    assert.ok(GraphQLObjectId.parseValue(id) instanceof ObjectId)

    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
          _id: {
            type: GraphQLObjectId,
            args: {
              _id: {
                type: GraphQLObjectId
              }
            },
            resolve: (root, args) => args._id
          }
        }
      })
    })
    graphql(schema, `{ _id(_id: "${id}") }`)
      .then(data => {
        assert.deepEqual(data, { data: { _id: id } })
        done()
      })
      .catch(done)
  })

  it('parseLiteral', done => {
    assert.throws(
      () => GraphQLObjectId.parseLiteral({ value: 'not ObjectId' }),
      errChecker
    )

    id = String(ObjectId())
    assert.ok(GraphQLObjectId.parseLiteral({ value: id }) instanceof ObjectId)

    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
          _id: {
            type: GraphQLObjectId,
            args: {
              _id: {
                type: GraphQLObjectId
              }
            },
            resolve: (root, args) => args._id
          }
        }
      })
    })
    graphql(
      schema,
      `
        query Test($id: ObjectId) {
          _id(_id: $id)
        }
      `,
      undefined,
      undefined,
      { id: id }
    )
      .then(data => {
        assert.deepEqual(data, { data: { _id: id } })
        done()
      })
      .catch(done)
  })
})
