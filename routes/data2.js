const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/data2', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT ST_AsGeoJSON(ST_Simplify(geom, 0.01)) AS geometry, provinsi, shape_leng, shape_area 
      FROM batas_provinsi
    `);

    const features = result.rows.map(row => ({
      type: 'Feature',
      geometry: JSON.parse(row.geometry),
      properties: { ...row, geometry: undefined },
    }));

    res.json({
      type: 'FeatureCollection',
      features: features,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
