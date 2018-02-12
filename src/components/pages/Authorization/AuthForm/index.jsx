import React from 'react'
import {Subscribe} from 'unstated'

import {Form} from './Form'
import {PaperContainer} from './PaperContainer'

import {AuthPageStateContainer} from '../stateAuthPage'

export class AuthForm extends React.Component {
  static displayName = 'AuthForm'

  getParentNode = () => {
    return this.container.animContainer.refs.node
  }

  render() {
    return (
      <Subscribe to={[AuthPageStateContainer]}>
        {stateContainer => (
          <PaperContainer
            ref={elem => { this.container = elem }}
            authType={stateContainer.state.authType}
          >
            <Form authType={stateContainer.state.authType} getParentNode={this.getParentNode} />
          </PaperContainer>
        )}
      </Subscribe>
    )
  }
}
