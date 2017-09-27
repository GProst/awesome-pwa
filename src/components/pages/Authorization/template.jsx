import React from 'react'
import PropTypes from 'prop-types'

import {FieldShape} from '../../../form/index'

import LinearProgress from 'material-ui/Progress/LinearProgress'
import Email from 'material-ui-icons/Email'
import Lock from 'material-ui-icons/Lock'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Tabs, {Tab} from 'material-ui/Tabs'
import Typography from '../../atoms/Typography'
import Background from '../../atoms/Background'
import {Wrapper, Form, Header, MainContent, Inputs, InputRow, Label, ProgressContainer} from './styles'

class LoginPageTemplate extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      email: FieldShape.isRequired,
      password: FieldShape.isRequired
    }).isRequired,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onInputBlur: PropTypes.func.isRequired
  }

  state = {
    tabIndex: 0
  }

  formShowsErrors(form) {
    return Object.values(form).reduce((hasErrors, field) => {
      return hasErrors || Boolean(field.error)
    }, false)
  }

  onSubmit = (event) => {
    this.props.onSubmit(event)
  }

  onInputChange(fieldName, event) {
    this.props.onInputChange(fieldName, event)
  }

  onInputBlur(fieldName, event) {
    this.props.onInputBlur(fieldName, event)
  }

  onTabChange = (event, tabIndex) => {
    this.setState({tabIndex})
  }

  render() {
    const {form, loading} = this.props
    const disabled = this.formShowsErrors(form)

    return (
      <Wrapper>
        {loading && (
          <ProgressContainer>
            <LinearProgress color='accent' mode='query' />
          </ProgressContainer>
        )}
        <Form onSubmit={this.onSubmit} component='form'>
          <Header>
            <Typography color={{type: 'common', payload: 'white'}} type='display1'>
              Authorize to proceed
            </Typography>
          </Header>
          <Tabs
            value={this.state.tabIndex}
            onChange={this.onTabChange}
            indicatorColor='accent'
            textColor='primary'
            fullWidth
          >
            <Tab label='Sign In' />
            <Tab label='Sign Up' />
          </Tabs>
          <MainContent>
            <Inputs>
              <InputRow>
                <Label htmlFor={form.email.id} error={Boolean(form.email.error)}>
                  <Email />
                </Label>
                <TextField
                  error={Boolean(form.email.error)}
                  id={form.email.id}
                  fullWidth
                  value={form.email.value}
                  type='email'
                  autoComplete='email'
                  label='Email'
                  disabled={loading}
                  helperText={form.email.error}
                  onChange={this.onInputChange.bind(this, 'email')}
                  onBlur={this.onInputBlur.bind(this, 'email')}
                />
              </InputRow>
              <InputRow>
                <Label htmlFor={form.password.id} error={Boolean(form.password.error)}>
                  <Lock />
                </Label>
                <TextField
                  type='password'
                  id={form.password.id}
                  disabled={loading}
                  error={Boolean(form.password.error)}
                  fullWidth
                  value={form.password.value}
                  label='Password'
                  helperText={form.password.error}
                  onChange={this.onInputChange.bind(this, 'password')}
                  onBlur={this.onInputBlur.bind(this, 'password')}
                />
              </InputRow>
            </Inputs>
            <Button color='accent' type='submit' disabled={disabled}>
              Submit
            </Button>
          </MainContent>
        </Form>
        <Background />
      </Wrapper>
    )
  }
}

export default LoginPageTemplate
