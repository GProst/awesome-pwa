import path from 'path'

export const getTestId = filename => path.basename(filename).match(/^(\d*)-/)[1]
