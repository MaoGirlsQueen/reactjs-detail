import {Button} from "antd"
import {useEffect} from 'react'
import axios from 'axios'
import Link from "next/link"
import {add} from '../store/store'
import {connect} from 'react-redux'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();
const Index = ({count,name,add,rename})=>{
  useEffect(()=>{
    axios.get('/api/user/info').then(resp=> console.log(resp.data))
  },[])
  return (
    <div>
       <p>count:{count}</p>
       <p>{name}</p>
      <input value = {name} onChange={(e)=>rename(e.target.value)}/>
      <button onClick = {()=>add(count)}>add</button>
      <a href={publicRuntimeConfig.OAUTH_URL}>登录</a>
    </div>
  )
}
Index.getInitialProps =  ({reduxStore})=>{
     reduxStore.dispatch({type:'UPDATE_NAME',username:'lilei'})
     reduxStore.dispatch(add(5))
  return {}
}
export default connect(({count,user})=>{
  return {
    count:count.count,
    name:user.username
    }
},(dispatch)=>{
  return {
     add:(num)=>dispatch({type:'ADD',num}),
     rename:(name)=>dispatch({type:'UPDATE_NAME',username:name})
  }
})(Index)
// export default connect(
//   function mapStateToProps(state){
//     console.log('state====',state)
//     return {
//       count:state.count.count,
//       name:state.user.username
//     }
//   },
//   function mapDispatchTpProps(dispatch){
//     return {
//       add:(num)=>dispatch({type:'ADD',num}),
//       rename:(name)=>dispatch({type:'UPDATE_NAME',username:name})
//    }
//   }
// )(Index)