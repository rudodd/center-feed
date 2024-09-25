import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("news");
  const sources = await db.collection("sources").find({}).toArray();
  const today = new Date().getTime();
  const expireDate = new Date(sources[0].expire).getTime();
  // if (today > expireDate) {
  //   console.log('fetch new sources');
  //   const expires = new Date();
  //   expires.setDate(expires.getDate() + 7);
  //   const options = {
  //     method: 'GET',
  //     hostname: 'political-bias-database.p.rapidapi.com',
  //     port: null,
  //     path: '/',
  //     headers: {
  //       'x-rapidapi-key': 'f096819199msh539dfcd3b2394c1p128b3cjsn2307ae796a4c',
  //       'x-rapidapi-host': 'political-bias-database.p.rapidapi.com'
  //     }
  //   };
  //   fetch('https://political-bias-database.p.rapidapi.com/ASdata', options)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json()
  //           .then((json) => {
  //             const updated = {sources: json, expire: expires}
  //             db.collection("sources").updateOne(
  //               {id: 1},
  //               {
  //                 $set: {...updated},
  //                 $currentDate: { lastModified: true }
  //               }
  //             )
  //             .then(() => {
  //               return res.status(200).json(json);
  //             })
  //           })
  //       } else {
  //         return res.status(200).json(sources[0].sources);
  //       }
  //     })
  // } else {
  //    return res.status(200).json(sources[0].sources);  
  // }
  return res.status(200).json(sources[0].sources);
}