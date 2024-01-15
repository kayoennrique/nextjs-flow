export default async function handler(req, res) {
  const previousPage = req.headers.referer;

  if (req.preview) {
    res.setPreviewData({});
    res.writeHead(307, { Location: previousPage });
    return res.end();
  }

  const password = 'SECURITYPASSWORD';
  if (req.query.password !== password) {
    return res.status(401).json({ message: 'Invalid Password' });
  }

  res.setPreviewData({});
  res.writeHead(307, { Location: previousPage });
  res.end();
}
