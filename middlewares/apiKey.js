const validApiKey = "your_secret_api_key"; // Replace this with your actual API key

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (apiKey && apiKey === validApiKey) {
    next();
  } else {
    res.status(401).json({ message: "incorrect Api Key" });
  }
};

module.exports = apiKeyMiddleware;
