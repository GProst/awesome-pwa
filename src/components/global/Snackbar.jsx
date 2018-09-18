import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Transition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'

import {hideSnackbarMessage} from '../../redux/reducers/snackbar'

const snackbarPaddingOnBigScreen = 24

const Container = styled.div`
  position: absolute;
  z-index: 10000;
  bottom: 0;
  left: 0;
  width: 100%;
`
const transitionDuration = 150
const Message = styled.div`
  width: 100%;
  min-width: 288px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 50%;
  border-radius: 2px;
  color: #fff;
  display: flex;
  padding: 6px 24px;
  flex-wrap: wrap;
  align-items: center;
  background-color: rgb(49, 49, 49);
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  font-size: 14px;
  margin: 0;
  transform: translate(-50%, 0);
  transition: transform ${transitionDuration}ms ease-out 0ms;

  ${props =>
    /^(entering|exiting|exited)$/.test(props.state) &&
    `
  transform: translate(-50%, 100%);
  `};
  
  @media (min-width: 961px) {
    width: auto;
    max-width: 568px;
    left: ${snackbarPaddingOnBigScreen}px;
    bottom: ${snackbarPaddingOnBigScreen}px;
    transform: translate(0, 0);
    ${props =>
    /^(entering|exiting|exited)$/.test(props.state) &&
      `
    transform: translate(0, calc(100% + ${snackbarPaddingOnBigScreen}px));
    `};
  }
`

const Text = styled.div`
  padding: 8px 0;
`

const ActionButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-left: 24px;
  margin-right: -8px;
`

const ActionButton = styled.button`
  padding: 7px 8px;
  min-width: 64px;
  font-size: 13px;
  min-height: 32px;
  color: rgb(225, 0, 80);
  font-weight: 500;
  border-radius: 2px;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0;
  border: 0;
  outline: none;
  position: relative;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-decoration: none;
  background-color: transparent;

  :hover {
    text-decoration: none;
    background-color: rgba(225, 0, 80, 0.12);
  }
`

const connector = connect(
  state => ({
    message: state.snackbar
  }),
  dispatch => ({
    onHideMessage() {
      dispatch(hideSnackbarMessage())
    }
  })
)

class Snackbar extends React.Component {
  static displayName = 'Snackbar'

  static propTypes = {
    message: PropTypes.shape({
      id: PropTypes.number,
      timeoutDelay: PropTypes.number,
      text: PropTypes.string,
      closeOnOuterClick: PropTypes.bool,
      ignoreOuterClickTime: PropTypes.number,
      action: PropTypes.shape({
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
      })
    }).isRequired,
    onHideMessage: PropTypes.func.isRequired
  }

  static defaultProps = {
    message: {}
  }

  timeout = null

  hideMessage = () => {
    if (this.timeout) clearTimeout(this.timeout)
    this.props.onHideMessage()
  }

  onActionClick = () => {
    this.hideMessage()
    const {onClick} = this.props.message.action
    if (onClick) onClick()
  }

  onDocumentClick = e => {
    if (!this.snackbar.contains(e.target)) {
      // hide snackbar if clicking outside of it
      this.hideMessage()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {id, closeOnOuterClick, timeoutDelay, ignoreOuterClickTime} = this.props.message
    if (prevProps.message.id !== id) {
      if (timeoutDelay) this.timeout = setTimeout(this.hideMessage, timeoutDelay)
      document.removeEventListener('click', this.onDocumentClick)
      if (id && closeOnOuterClick !== false) {
        setTimeout(() => {
          document.addEventListener('click', this.onDocumentClick)
        }, ignoreOuterClickTime || 2000) // show snackbar for some time regardless of outside clicks
      }
    }
  }

  render() {
    const {message: {text, action, id}} = this.props
    return (
      <Container>
        <TransitionGroup appear>
          {text ? (
            <Transition key={id} timeout={{enter: transitionDuration, exit: transitionDuration}}>
              {state => (
                <Message
                  state={state}
                  innerRef={elem => {
                    this.snackbar = elem
                  }}
                >
                  <Text>{text}</Text>
                  {action && (
                    <ActionButtonContainer>
                      <ActionButton onClick={this.onActionClick}>{action.text}</ActionButton>
                    </ActionButtonContainer>
                  )}
                </Message>
              )}
            </Transition>
          ) : null}
        </TransitionGroup>
      </Container>
    )
  }
}

const SnackbarConnected = connector(Snackbar)

export {SnackbarConnected as Snackbar}
