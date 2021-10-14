const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
  SELECT students.id as id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
    })
  })
  .catch(err => console.error('query error', err.stack));

  
// pool.query(`
//   SELECT students.id AS id, students.name AS name, cohorts.name AS cohort 
//   FROM students
//   JOIN cohorts ON cohorts.id = cohort_id
//   WHERE cohorts.name LIKE '%${process.argv[2]}%'
//   LIMIT ${process.argv[3] || 5};
//   `)
//   .then(res => {
//     res.rows.forEach(user => {
//       console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
//     })
//   })
//   .catch(err => console.error('query error', err.stack));
