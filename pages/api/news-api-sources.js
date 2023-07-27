export default function handler(req, res) {
  console.log(req);
  fetch(`https://newsapi.org/v2/sources?apiKey=${req.body.key}`)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((json) => res.status(200).json(json))
      } else {
        res.status(response.status).json(response)
      }
    })
}