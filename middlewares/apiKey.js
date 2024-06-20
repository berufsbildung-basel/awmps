const validApiKey = process.env.API_KEY; 

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (apiKey && apiKey === validApiKey) {
    next();
  } else {
    res.status(401).json({ message: "incorrect Api Key" });
  }
};

module.exports = apiKeyMiddleware;
