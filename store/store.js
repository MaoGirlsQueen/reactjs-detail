import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import ReduxThunk from 'redux-thunk'
import axios from 'axios'
const userInitialState = {}

const LOGOUT = 'LOGOUT'

function userReducer(state = userInitialState, action) {
    switch (action.type) {
          case LOGOUT:
              return {}
            default:
                return state
    }
}

const allResuders = combineReducers({
    user: userReducer
})

export function logout(){
  return dispatch =>{
      axios.post('/logout').then(resp =>{
          console.log("resp",resp)
          if(resp.status === 200){
              dispatch({
                  type:LOGOUT
              })
          }else{
              console.log('logout fail',resp)
          }
      }).catch(err=>{
          console.log("err",err)
      })
  }
}


export default function initializeStore(state) {
    const store = createStore(allResuders,Object.assign({}, {
        user: userInitialState
    }, state), applyMiddleware(ReduxThunk))
    return store
}