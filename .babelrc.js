'use strict'

module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': 'Chrome >= 68',
        'modules': false,
        'loose': true,
        'useBuiltIns': 'usage'
      }
    ],
    [
      '@babel/preset-react',
      {
        'useBuiltIns': true
      }
    ]
  ],
  'plugins': [
    'babel-plugin-styled-components',
    [
      '@babel/plugin-proposal-class-properties',
      {
        'loose': true
      }
    ]
  ]
}
