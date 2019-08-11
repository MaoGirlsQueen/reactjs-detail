import { Button, Icon, Tabs } from "antd";
import {useEffect} from 'react'
import Repo from "../components/Repo";
import { connect } from "react-redux";
import LRU from 'lru-cache';
import Router, { withRouter } from "next/router";
import getConfig from "next/config";
const api = require("../lib/api");
const { publicRuntimeConfig } = getConfig();

const isServer = typeof window === "undefined";

const cache = new LRU({
  maxAge:1000*60*10
})
function Index({ userPosData, userStarredData, user, router }) {

  const tabKey = router.query.key || "1";
  const handleTabChange = activeKey => {
    Router.push(`/?key=${activeKey}`);
  };
  useEffect(()=>{
    if (!isServer) {
      if(userPosData){
        cache.set('userPosData',userPosData)
      }
      if(userStarredData){
        cache.set('userStarredData',userStarredData)
      }
      
    }
  },[userPosData,userStarredData])
  if (!user ||  !user.id) {
    return (
      <div className="root">
        <p>你还没有登录呢？等啥呢</p>
        <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
          去登录
        </Button>
        <style jsx>
          {`
            .root {
              height: 400px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </div>
    );
  }
  return (
    <div className="root">
      <div className="user-info">
        <img src={user.avatar_url} alt="user avatar" className="avatar" />
        <span className="login">{user.login}</span>
        <span className="name">{user.name || "****"}</span>
        <span className="bio">{user.bio || "****"}</span>
        <p className="email">
          <Icon type="mail" style={{ marginRight: 10 }} />
          <a href={`mailto:${user.email}`}>{user.email || "****"}</a>
        </p>
      </div>
      <div className="user-repos">
      
        <Tabs
          defaultActiveKey={tabKey}
          onChange={handleTabChange}
          animated={false}
        >
          <Tabs.TabPane tab="你的仓库" key="1">
            {userPosData.map(repo => {
              return <Repo key= {repo.id} repo={repo} />;
            })}
          </Tabs.TabPane>
          <Tabs.TabPane tab="你关注的仓库" key="2">
            {userStarredData.map(repo => {
              return <Repo key= {repo.id} repo={repo} />;
            })}
          </Tabs.TabPane>
        </Tabs>
      </div>
      <style jsx>
        {`
          .root {
            display: flex;
            align-item: flex-start;
            padding: 20px 0;
          }
          .user-info {
            width: 200px;
            margin-right: 40px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
          }
          .login {
            font-weight: 800;
            font-size: 20px;
            margin-top: 20px;
          }
          .name {
            font-size: 16px;
            color: #777;
          }
          .bio {
            margin-top: 20px;
            color: #333;
          }
          .avatar {
            width: 100%;
            border-radius: 5px;
          }
          .user-repos {
            flex-grow: 1;
          }
        `}
      </style>
    </div>
  );
}




Index.getInitialProps = async ({ ctx }) => {


  if (!isServer) {
    if (cache.get('userPosData') && cache.get('userStarredData')) {
      return {
        userPosData: cache.get('userPosData'),
        userStarredData: cache.get('userStarredData')
      };
    }
  }

  const userPos = await api.request({ url: "/user/repos" }, ctx.req, ctx.res);

  const userStarred = await api.request(
    { url: "/user/starred" },
    ctx.req,
    ctx.res
  );


  return {
    userPosData: userPos.data,
    userStarredData: userStarred.data
  };
};
export default withRouter(connect(state => ({ user: state.user }))(Index));
