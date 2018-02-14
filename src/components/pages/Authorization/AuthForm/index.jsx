import React from 'react'
import {Subscribe} from 'unstated'

import {Form} from './Form'
import {PaperContainer} from './PaperContainer'

import {AuthPageStateContainer} from '../stateAuthPage'

export class AuthForm extends React.Component {
  static displayName = 'AuthForm'

  render() {
    return (
      <Subscribe to={[AuthPageStateContainer]}>
        {stateContainer => (
          <PaperContainer
            authType={stateContainer.state.authType}
            animating={stateContainer.state.animating}
            getFormHeight={stateContainer.getFormHeight}
          >
            <Form setFormNode={stateContainer.setFormNode} authType={stateContainer.state.authType} animating={stateContainer.state.animating} />
          </PaperContainer>
        )}
      </Subscribe>
    )
  }
}
