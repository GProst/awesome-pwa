import {createStore} from './create'
import {validateStore} from './genericValidation/index'

const store = createStore()
validateStore(store)

export default store
