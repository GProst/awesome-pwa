describe('Test that module.hot.accept callback is doing right thing', () => {
  let NODE_ENV

  beforeAll(() => {
    NODE_ENV = process.env.NODE_ENV
  })

  afterAll(() => {
    process.env.NODE_ENV = NODE_ENV
  })

  test('module.hot.accept callback SHOULD trigger app re-render', () => {
    jest.mock('react-dom', () => ({render: jest.fn()}))
    jest.mock('../../components/Root', () => 'div')
    jest.mock('react-hot-loader', () => ({AppContainer: 'div'}))
    const ReactDOM = require.requireMock('react-dom')
    const init = require.requireActual('../../index').init
    process.env.NODE_ENV = 'develop'

    let acceptCallback
    const accept = (filePath, callback) => {
      acceptCallback = callback
    }
    const module = {hot: {accept}}

    expect(init(module)).toBe('develop hot')
    ReactDOM.render.mockClear()
    expect(ReactDOM.render.mock.calls.length).toBe(0)
    expect(typeof acceptCallback).toBe('function')

    acceptCallback()
    expect(ReactDOM.render.mock.calls.length).toBe(1)
  })
})
