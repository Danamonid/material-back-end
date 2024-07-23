const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT ST_AsGeoJSON(geom) AS geometry, * FROM "BANTUAN_PEMERINTAH_DJPRL_PT"');
    const features = result.rows.map(row => ({
      type: 'Feature',
      geometry: JSON.parse(row.geometry),
      properties: { ...row, geometry: undefined },
    }));
    client.release();
    res.json({
      type: 'FeatureCollection',
      features: features,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error " + err);
  }
});

module.exports = router;
