export default (Comp)=>{
    function TestHocComp({Component,pageProps,...rest}){
        console.log(pageProps,rest)
        return <Comp Component = {Component} pageProps ={pageProps} {...rest}/>
    }
    TestHocComp.getInitialProps = Comp.getInitialProps
    return TestHocComp
}