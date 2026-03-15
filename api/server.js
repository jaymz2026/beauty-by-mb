import app from './index.js';

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API Server running on http://localhost:${port}`);
});
