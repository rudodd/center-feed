const apiKey = process.env.API_KEY;
export default function handler(req, res) {
  return fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then((json) => res.status(200).json(json))
      } else {
        res.status(response.status).json(response)
      }
    })
}