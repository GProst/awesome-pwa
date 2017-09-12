import React from 'react'
import {shallow} from 'enzyme'

describe('Test that Root component renders correctly', () => {
  let RootWrapper, reduxStore, Provider, ConnectedRouter, ThemeProvider, Route, Switch, Redirect, Routes, MainPage,
    LoginPage, LoaderPage, PostListPage, injectGlobal, WebLoader

  beforeAll(() => {
    jest.mock('../../../theme', () => ({ThemeProvider() { return null }}))
    jest.mock('../../services/ErrorHandler', () => function ErrorHandler() { return null })
    jest.mock('../../../redux/store', () => 'my redux store')
    jest.mock('../../../history', () => 'my history')
    jest.mock('../../pages/Main', () => 'MainPage')
    jest.mock('../../pages/Login', () => 'LoginPage')
    jest.mock('../../pages/Loader', () => 'LoaderPage')
    jest.mock('../../pages/PostList', () => 'PostListPage')
    jest.unmock('../../../routes')
    jest.unmock('../../../font')
    MainPage = require('../../pages/Main')
    LoginPage = require('../../pages/Login')
    LoaderPage = require('../../pages/Loader')
    PostListPage = require('../../pages/PostList')
    Routes = require('../../../routes').Routes
    reduxStore = require('../../../redux/store')
    Provider = require('react-redux').Provider
    ConnectedRouter = require('react-router-redux').ConnectedRouter
    ThemeProvider = require('../../../theme').ThemeProvider
    injectGlobal = require('styled-components').injectGlobal
    WebLoader = require('webfontloader').default
    Switch = require('react-router-dom').Switch
    Redirect = require('react-router-dom').Redirect
    Route = require('react-router-dom').Route

    injectGlobal.mockClear()
    WebLoader.load.mockClear()

    const Root = require.requireActual('../../Root').default
    RootWrapper = shallow(<Root />)
  })

  test('Root component file should invoke webfontloader lib loader', () => {
    expect(WebLoader.load.mock.calls.length).toBe(1)
  })

  test('Root component file should invoke styled-component injectGlobal() method with app global styles', () => {
    expect(injectGlobal.mock.calls.length).toBe(1)
  })

  test('Root component should render react-redux Provider comp before any others with a correct store', () => {
    expect(RootWrapper.is(Provider)).toBe(true)
    expect(RootWrapper.prop('store')).toBe(reduxStore)
  })

  test('Root component should render ThemeProvider comp after Provider and before ConnectedRouter', () => {
    const ThemeProviderWrapper = RootWrapper.find(ThemeProvider)
    expect(ThemeProviderWrapper.length).toBe(1)
    expect(ThemeProviderWrapper.parents().some(Provider)).toBe(true)
    expect(ThemeProviderWrapper.parents().some(ConnectedRouter)).toBe(false)
  })

  test('Root component should render ErrorHandler comp after Provider + ThemeProvider and before ConnectedRouter', () => {
    const ErrorHandler = require('../../services/ErrorHandler')
    const ErrorHandlerWrapper = RootWrapper.find(ErrorHandler)
    expect(ErrorHandlerWrapper.length).toBe(1)
    expect(ErrorHandlerWrapper.parents().some(Provider)).toBe(true)
    expect(ErrorHandlerWrapper.parents().some(ThemeProvider)).toBe(true)
    expect(ErrorHandlerWrapper.parents().some(ConnectedRouter)).toBe(false)
  })

  test('Root component should render react-router-redux ConnectedRouter comp after Provider with correct store and history', () => {
    const history = require('../../../history')
    const ConnectedRouterWrapper = RootWrapper.find(ConnectedRouter)
    expect(ConnectedRouterWrapper.length).toBe(1)
    expect(ConnectedRouterWrapper.parents().some(Provider)).toBe(true)
    expect(ConnectedRouterWrapper.prop('store')).toBe(reduxStore)
    expect(ConnectedRouterWrapper.prop('history')).toBe(history)
  })

  test('Root component should render react-router Switch comp right after ConnectedRouter', () => {
    const SwitchWrapper = RootWrapper.find(Switch)
    expect(SwitchWrapper.length).toBe(1)
    expect(SwitchWrapper.parents().some(ConnectedRouter)).toBe(true)
  })

  test(
    `Root component should render react-router Redirect comp as the last child of Switch comp with the path to main
    route and no 'exact' prop`,
    () => {
      const SwitchWrapper = RootWrapper.find(Switch)
      const RedirectWrapper = SwitchWrapper.children().last()
      expect(RedirectWrapper.type()).toBe(Redirect)
      expect(RedirectWrapper.prop('exact')).toBe(undefined)
      expect(RedirectWrapper.prop('to')).toBe(Routes.main)
    })

  test(`Root component should render react-router Route comps as children of Switch comp only`, () => {
    const SwitchWrapper = RootWrapper.find(Switch)
    const Routes = SwitchWrapper.find(Route)
    expect(Routes.everyWhere(w => w.parent().type() === Switch)).toBe(true)
  })

  test(
    `Root component should render react-router Route comp with 'exact' prop and path to main page with correct component`,
    () => {
      const RoutesWrapper = RootWrapper.find(Route)
      expect(RoutesWrapper.someWhere(w => (
        w.prop('exact') === true &&
        w.prop('path') === Routes.main &&
        w.prop('component') === MainPage
      ))).toBe(true)
    })

  test(
    `Root component should render react-router Route comp with 'exact' prop and path to login page with correct component`,
    () => {
      const RoutesWrapper = RootWrapper.find(Route)
      expect(RoutesWrapper.someWhere(w => (
        w.prop('exact') === true &&
        w.prop('path') === Routes.login &&
        w.prop('component') === LoginPage
      ))).toBe(true)
    })

  test(
    `Root component should render react-router Route comp with 'exact' prop and path to fetch-profile-data page with
    correct component`,
    () => {
      const RoutesWrapper = RootWrapper.find(Route)
      expect(RoutesWrapper.someWhere(w => (
        w.prop('exact') === true &&
        w.prop('path') === Routes.fetchingProfileData &&
        w.prop('component') === LoaderPage
      ))).toBe(true)
    })

  test(
    `Root component should render react-router Route comp with 'exact' prop and path to post-list page with correct component`,
    () => {
      const RoutesWrapper = RootWrapper.find(Route)
      expect(RoutesWrapper.someWhere(w => (
        w.prop('exact') === true &&
        w.prop('path') === Routes.postList &&
        w.prop('component') === PostListPage
      ))).toBe(true)
    })
})
