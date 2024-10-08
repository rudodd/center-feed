export default function handler(req, res) {
  return fetch(`https://ok.surf/api/v1/news-feed`)
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then((json) => res.status(200).json(json))
      } else {
        res.status(response.status).json(response)
      }
    })
}