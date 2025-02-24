export default function handler(req, res) {
  const requestApiKey = req.headers['x-cfapi-key'];

  if (requestApiKey === process.env.BACKEND_API_KEY) {
    return fetch(`https://ok.surf/api/v1/news-feed`)
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((json) => res.status(200).json(json))
        } else {
          res.status(response.status).json(response)
        }
      })
  } else {
    return res.status(401).json({status: 401, error: 'Unauthorized', message: 'You are not authorized to access this API endpoint.'})
  }
}