const assert = require('power-assert')
const isObjectId = require('../lib/is-objectid')

describe('isObjectId', () => {
  it('should ok', () => {
    const sucesses = [
      '0'.repeat(24),
      'A'.repeat(24),
      'a'.repeat(24),
      '5a7dbe8cb5f46143098b4254'
    ]

    sucesses.forEach(str => {
      assert.equal(isObjectId(str), true)
    })
  })

  it('should fail', () => {
    const failures = [
      'g'.repeat(24),
      '1'.repeat(23),
      'a'.repeat(25),
      '-a7dbe8cb5f46143098b4254',
      null,
      undefined,
      true,
      false,
      123,
      12.45
    ]

    failures.forEach(str => {
      assert.equal(isObjectId(str), false)
    })
  })
})
