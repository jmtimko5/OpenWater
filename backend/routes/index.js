const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://root:root@localhost:5432/openwater';
module.exports = router;
// postgres://[username]:[password]@[host]:[port]/[databasename]

// GET User
router.get('/api/v1/users/:user_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.user_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query("SELECT *, to_char(time_added, 'MM/DD/YY') as joined FROM AppUser WHERE id=$1;", [id]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

// POST new site
router.post('/api/v1/sites', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {
  	creator_id: req.body.creator_id,
  	name: req.body.name,
  	lat: req.body.lat,
    lng: req.body.lng,
  	description: req.body.description,
  };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO Site (creator_id, name, lat, lng, description) values($1, $2, $3, $4, $5)',
    [data.creator_id, data.name, data.lat, data.lng, data.description]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM Site ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

// GET all sites
router.get('/api/v1/sites', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT s.*, round(AVG(r.rating),1) as avg, count(r.*) as count FROM Site as s LEFT JOIN Review as r ON s.id=r.site_id GROUP BY s.id ORDER BY s.id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

// GET site
router.get('/api/v1/sites/:site_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.site_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT s.*, round(AVG(r.rating),1) as avg FROM Site as s LEFT JOIN Review as r ON s.id=r.site_id WHERE s.id=$1 GROUP BY s.id;', [id]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

// GET reviews for site
router.get('/api/v1/sites/:site_id/reviews', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.site_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query("SELECT r.*, to_char(r.time_added, 'MM/DD/YY') as date, u.username FROM Review AS r, AppUser as u WHERE r.site_id=$1 AND u.id = r.user_id ORDER BY r.id ASC;", [id]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

// GET reviews for user
router.get('/api/v1/users/:user_id/reviews', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.user_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query("SELECT r.*, to_char(r.time_added, 'MM/DD/YY') as date, s.name AS site_name FROM Review AS r, Site as s WHERE r.user_id=$1 AND s.id = r.site_id ORDER BY r.id ASC;", [id]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

// UPDATE username
router.put('/api/v1/users/:user_id/username', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.user_id;
  // Grab data from http request
  const data = {username: req.body.username};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE AppUser SET username=($1) WHERE id=($2)',
    [data.username, id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM AppUser ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

// UPDATE location
router.put('/api/v1/users/:user_id/location', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.user_id;
  // Grab data from http request
  const data = {location: req.body.location};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE AppUser SET location=($1) WHERE id=($2)',
    [data.location, id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM AppUser ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

// POST new review
router.post('/api/v1/reviews', (req, res, next) => {
  const results = [];
  // Grab data from http request

  const data = {
  	user_id: req.body.user_id,
  	site_id: req.body.site_id,
  	rating: req.body.rating,
  	message: req.body.message,
  };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO Review (user_id, site_id, rating, message) values($1, $2, $3, $4)',
    [data.user_id, data.site_id, data.rating, data.message]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM Review ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

// DELETE Review
router.delete('/api/v1/reviews/:review_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.review_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM Review WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM Review ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});
