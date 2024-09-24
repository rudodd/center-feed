export default function handler(req, res) {
  const options = {
    method: 'GET',
    hostname: 'political-bias-database.p.rapidapi.com',
    port: null,
    path: '/',
    headers: {
      'x-rapidapi-key': 'f096819199msh539dfcd3b2394c1p128b3cjsn2307ae796a4c',
      'x-rapidapi-host': 'political-bias-database.p.rapidapi.com'
    }
  };
  return fetch('https://political-bias-database.p.rapidapi.com/ASdata', options)
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then((json) => res.status(200).json(json))
      } else {
        res.status(response.status).json(response)
      }
    })
}