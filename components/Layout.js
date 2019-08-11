import Link from "next/link"
import { connect } from 'react-redux'
import { useState, useCallback } from 'react'
import { Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'
import Container from "./Container"
import getConfig from 'next/config'
import axios from 'axios'
import { withRouter} from "next/router"
import { logout } from "../store/store"
const { Header, Content, Footer } = Layout;
const { publicRuntimeConfig } = getConfig();
const githubIconStyle = {
    color: '#fff',
    fontSize: 40,
    display: 'block',
    marginTop: 10,
    marginRight: 10
}
const footerStyle = {
    textAlign: 'center'
}
const Comp = ({ children, color, style }) => <div style={{ color, ...style }}>{children}</div>
function Index({ children, user,logout,router }) {
    const initSearch = router.query && router.query.query
    const [search, setSearch] = useState(initSearch || '')
    const handleSearch = useCallback((e) => {
        setSearch(e.target.value)
    }, [search])
    const handleOnSearch = useCallback(() => { 
        router.push(`/search?query=${search}`)
    }, [search])
    const handleLogout = useCallback(() => {
        logout()
    }, [logout])
    const userDropDown = (
        <Menu>
            <Menu.Item>
                <a href="javascript:void(0)" onClick={handleLogout}>Login out</a>
            </Menu.Item>
        </Menu>
    )
    const handleGoToOAuth =useCallback((e)=>{
        e.preventDefault();
        
        axios.get(`/prepare-auth?url=${router.asPath}`).then(resp=>{
            if(resp.status === 200){
                location.href = publicRuntimeConfig.OAUTH_URL
            }else{
                console.log('prepare auth failed',resp)
            }
        }).catch(err=>{
            console.log('prepare auth failed',err)
        })
    },[]) 
    return (
        <>
            <Layout>
                <Header>
                    <Container render={<div className="header-inner" />}>
                        <div className="header-left">
                            <div className="logo">
                               <Link href="/"><Icon type="github" style={githubIconStyle} /></Link> 
                            </div>
                            <div>
                                <Input.Search placeholder="搜索仓库" value={search} onChange={handleSearch} onSearch={handleOnSearch} />
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="user">
                                {
                                    user && user.id ?
                                        (
                                            <Dropdown overlay={userDropDown}>
                                                <a href={'/'}>
                                                    <Avatar size={40} src={user.avatar_url} />
                                                </a>
                                            </Dropdown>
                                        )
                                        :
                                        (
                                            <Tooltip title="点击进行登录">
                                                <a href={`/prepare-auth?url=${router.asPath}`}>
                                                    <Avatar size={40} icon='user' />
                                                </a>
                                            </Tooltip>
                                        )
                                }

                            </div>
                        </div>
                    </Container>
                </Header>
                <Content>
                    <Container>{children}</Container>
                </Content>
                <Footer style={footerStyle}>Develop By MaoGirlsQueen</Footer>
                <style jsx>{`
                    .header-inner{
                        display:flex;
                        justify-content:space-between
                    }
                    .header-left{
                        display:flex;
                        justify-content:flex-start;
                    }
                  
                    `}
                </style>
                <style jsx global>{`
                    #__next{
                        height:100%
                    }
                    .ant-layout{
                        min-height:100%
                    }
                    .ant-layout-header{
                        padding:0
                    }
                    .ant-layout-content{
                        background:#fff
                    }
                    `}</style>
            </Layout>
        </>)
}
export default connect(({ user }) => ({ user }), (dispatch) => ({ logout: () => dispatch(logout()) }))(withRouter(Index))