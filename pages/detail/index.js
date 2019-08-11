export default ()=><span>detail</span>

// import Repo from "../../components/Repo";
// import Link from "next/link";
// import api from "../../lib/api";
// import { withRouter } from "next/router";
// // import WithRepoBasic from '../../components/with-repo-basic'
// function makeQuery(queryObject){
//     const query = Object.entries(queryObject).reduce((reuslt,entry)=>{
//         reuslt.push(entry.join('='))
//         return reuslt
//     },[]).join('&')
//     return `?${query}`
// }
// function Detail({ repoBasic,router }) {
//     console.log("repoBasic",repoBasic)
//     const query = makeQuery(router.query)
//   return (
//     <div className="root">
//       <div className="repo-basic">
//         <Repo repo={repoBasic} />
//         <div className="tab">
//           <Link href={`/detail${query}`}>
//             <a className="tab index">Readme</a>
//           </Link>
//           <Link href={`/detail/issues${query}`}>
//             <a className="tab issues">Issues</a>
//           </Link>
//         </div>
//       </div>
//       <div>Readme</div>
//       <style jsx>
//           {`
//             .root{
//                 padding-top:20px;
//             }
//             .repo-basic{
//                 padding:20px;
//                 border:1px solid #eee;
//                 margin-bottom:20px;
//                 border-radius:5px;
//             }
//             .tab + .tab{
//                 margin-left:20px;
//             }
//           `}
//       </style>
//     </div>
//   );
// }
// Detail.getInitialProps = async ({ ctx }) => {
//   const { owner, name } = ctx.query;
//   const repoBasic = await api.request(
//     {
//       url: `/repos/${owner}/${name}`
//     },
//     ctx.req,
//     ctx.res
//   );
//   return {
//     repoBasic:repoBasic.data
//   };
// };
// export default withRouter(Detail);
