import { expect } from 'chai'
import * as sinon from 'sinon'
import { validateNodeEngineVersion } from './validate_node_engine_version'

describe(validateNodeEngineVersion.name, () => {
  it('calls the onError callback when the version is lower than specified in package.json', () => {
    // Arrange
    const errorSpy = sinon.spy()

    // Act
    validateNodeEngineVersion('v11.0.0', errorSpy, () => ({
      engines: {
        node: '>=12',
      },
    }))

    // Assert
    expect(errorSpy).to.have.been.calledOnceWith(
      'Cucumber can only run on Node.js versions >=12. This Node.js version is v11.0.0'
    )
  })

  it('does not call the onError callback when the version is greater than specified in package.json', () => {
    // Arrange
    const errorSpy = sinon.spy()

    // Act
    validateNodeEngineVersion('v17.0.0', errorSpy, () => ({
      engines: {
        node: '>=12',
      },
    }))

    // Assert
    expect(errorSpy).not.to.have.been.called()
  })
})