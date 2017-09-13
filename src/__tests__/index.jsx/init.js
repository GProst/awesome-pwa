describe('Test how init() method behavior depends on NODE_ENV var', () => {
  let init
  let NODE_ENV

  beforeAll(() => {
    NODE_ENV = process.env.NODE_ENV
    jest.mock('react-dom', () => ({render: () => null}))
    jest.mock('../../components/Root', () => 'div')
    init = require.requireActual('../../index').init
  })

  afterAll(() => {
    process.env.NODE_ENV = NODE_ENV
  })

  test('init() method SHOULD initialize in production mode if NODE_ENV === \'production\'', () => {
    process.env.NODE_ENV = 'production'
    const module = {hot: false}
    expect(init(module)).toBe('production')
  })

  test(`init() method SHOULD initialize in 'develop' mode if NODE_ENV !== 'production' and !module.hot`, () => {
    process.env.NODE_ENV = 'develop'
    const module = {hot: false}
    expect(init(module)).toBe('develop')
  })

  test(`init() method SHOULD initialize in 'develop hot' mode if NODE_ENV !== 'production' and module.hot`, () => {
    process.env.NODE_ENV = 'develop'
    const module = {hot: true, hotAccept: () => null}
    expect(init(module)).toBe('develop hot')
  })
})
