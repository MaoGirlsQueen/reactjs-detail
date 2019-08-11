import App, { Container } from "next/app";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import "antd/dist/antd.css";
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Spin from "../components/PageLoading";
import withReduxHoc from "../lib/with-redux";
class MyApp extends App {
    state = {
        loading:false 
    }
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps
    };
  }
  startLoading = ()=>{
      this.setState({
          loading:true
      })
  }
  stopLoading = ()=>{
    this.setState({
        loading:false
    })
}
  componentDidMount() {
    Router.events.on('routeChangeStart',this.startLoading)
    Router.events.on('routeChangeComplete',this.stopLoading)
    Router.events.on('routeChangeError',this.stopLoading)

    // axios.get('https://api.github.com/search/repositories?q=react').then(resp=>console.log("---",resp))
    // axios.get('/github/search/repositories?q=react').then(resp=>console.log('+++',resp))
  }
  componentWillUnmount() {
    Router.events.off('routeChangeStart',this.startLoading)
    Router.events.off('routeChangeComplete',this.stopLoading)
    Router.events.off('routeChangeError',this.stopLoading)
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    
    return (
      <Container>
        <Provider store={reduxStore}>
          {this.state.loading ? <Spin  /> : null}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}
export default withReduxHoc(MyApp);
