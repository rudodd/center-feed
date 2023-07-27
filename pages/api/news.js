export default function handler(req, res) {
  fetch(`https://newsapi.org/v2/top-headlines?sources=${req.body.sources}&apiKey=${req.body.key}&pageSize=100`)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((json) => res.status(200).json(json))
      } else {
        res.status(response.status).json(response)
      }
    })
}