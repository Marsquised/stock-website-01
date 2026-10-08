const { getSymbol, cache, yahooChart } = require('./_lib');

const RANGES = { '1M': ['1mo', '1d'], '3M': ['3mo', '1d'], '6M': ['6mo', '1d'], '1Y': ['1y', '1d'], '5Y': ['5y', '1wk'] };

module.exports = async (req, res) => {
  const symbol = getSymbol(req, res);
  if (!symbol) return;
  const [range, interval] = RANGES[req.query.range] || RANGES['6M'];
  try {
    const r = await yahooChart(symbol, range, interval);
    const q = r.indicators.quote[0];
    const candles = [];
    (r.timestamp || []).forEach((t, i) => {
      if (q.open[i] == null || q.close[i] == null) return;
      candles.push({ time: t, open: q.open[i], high: q.high[i], low: q.low[i], close: q.close[i], volume: q.volume[i] || 0 });
    });
    cache(res, 120);
    res.status(200).json({ symbol, candles });
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
