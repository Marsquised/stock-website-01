const { getSymbol, cache, finnhub } = require('./_lib');

const ymd = (d) => d.toISOString().slice(0, 10);

module.exports = async (req, res) => {
  const symbol = getSymbol(req, res);
  if (!symbol) return;
  try {
    const to = new Date();
    const from = new Date(Date.now() - 7 * 86400000);
    const items = await finnhub('/company-news', { symbol, from: ymd(from), to: ymd(to) });
    const news = (Array.isArray(items) ? items : [])
      .filter((n) => n.headline && n.url)
      .sort((a, b) => b.datetime - a.datetime)
      .slice(0, 15)
      .map((n) => ({ headline: n.headline, summary: (n.summary || '').slice(0, 220), source: n.source, url: n.url, time: n.datetime, image: n.image || null }));
    cache(res, 300);
    res.status(200).json({ symbol, news });
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
