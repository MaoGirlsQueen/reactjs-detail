import Comp from  "../../components/Comp"
import Link from "next/link"
import Router,{withRouter} from "next/router"
 const B = ({router})=>{
    function linkToA(){
        Router.push({
            pathname:"/a",
            query:{
                id:7
            }
        },'/a/7')
    }
    const {name,id}=router.query
    return (
        <Comp>
            <Link href="/a?id=5" as="/a/8">跳转到a</Link>
            <button onClick={linkToA}>to a</button>
            <h1>{name}{id}</h1>
            </Comp>
    )
}
export default withRouter(B)