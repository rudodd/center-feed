export default function handler(req, res) {
  return fetch('https://www.allsides.com/media-bias/json/noncommercial/publications')
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then((json) => res.status(200).json(json))
      } else {
        res.status(response.status).json(response)
      }
    })
}