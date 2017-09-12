import {createStore} from './create'
import {validateStore} from './validation/index'

const store = createStore()
validateStore(store)

export default store
