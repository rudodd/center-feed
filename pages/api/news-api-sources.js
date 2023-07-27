export default function handler(req, res) {
  const body = JSON.parse(req.body)
  return fetch(`https://newsapi.org/v2/sources?apiKey=${body.key}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then((json) => res.status(200).json(json))
      } else {
        res.status(response.status).json(response)
      }
    })
}