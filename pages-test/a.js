import Comp from "../components/Comp"
import Router from "next/router"
import dynamic from 'next/dynamic'
import getConfig from 'next/config'
import Head from 'next/head'
import styled from 'styled-components'
import moment from 'moment'
import { withRouter} from "next/router"
const Title = styled.h1`
color:yellow;
font-size:40px
`
const DynaComponent = dynamic(import('../components/dynamic'))
const A = ({id,time})=>(
  <>
        <div>
            跳转到{id}
            <div>
            <Title>{time}{process.env.customKey}</Title>
            </div>
            <DynaComponent />
        </div>
        <style jsx>
          {`
            div{
                color:red
            }
          `}
        </style>
        <style jsx global>{`
            div{
                color:#111
            }
            `}</style>
        </>
)
A.getInitialProps =async (ctx)=>{
    const moment = await import('moment')
    return {
        id:123456,
        time:moment.default(Date.now() - 60*1000).fromNow()
    }
}
export default withRouter(A)