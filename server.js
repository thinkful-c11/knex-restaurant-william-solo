const express = require('express');
const bodyParser = require('body-parser');
const treeize = require('treeize');
const tree = new treeize();

const { DATABASE, PORT } = require('./config');

const knex = require('knex')(DATABASE);

const app = express();
app.use(bodyParser.json());
// app.use(morgan, 'common');

///////////// MANUAL HYDRATION /////////////

// app.get('/restaurants/:id', (req, res) => {

//   knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
//       .from('restaurants')
//       .where('restaurants.id', req.params.id)
//       .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//       .orderBy('date', 'desc')
//       .limit(10)
//       .then(r => {
//         const hydrated ={};
//         r.forEach(row=>{
//           if(!(row.id in hydrated)){
//             hydrated[row.id] = {
//               name: row.name,
//               cuisine: row.cuisine,
//               borough: row.borough,
//               grades:[]
//             };
//           }
//           hydrated[row.id].grades.push(
//             {
//               gradeId: row.gradeId,
//               grade: row.grade,
//               score: row.score
//             });
//         });
//         res.json(hydrated);
//       });

// });

///////////// TREEIZE /////////////

app.get('/restaurants/:id', (req, res) => {

  knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
      .from('restaurants')
      .where('restaurants.id', req.params.id)
      .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
      .orderBy('date', 'desc')
      .limit(10)
      .then(r => {
        const data =[];
        r.forEach(row=>{
          data.push({
            id: row.id,
            name: row.name,
            cuisine: row.cuisne,
            borough: row.borough,
            'grades:gradeId': row.gradeId,
            'grades:grade': row.grade,
            'grades:score': row.score
          });
        });
        tree.grow(data);
        res.json(tree.getData());
      });

});

app.post('/restaurants/',(req,res)=>{

  const required = ['name','cuisine','borough','grades'];

  required.forEach(requiredField =>{
    if(!(requiredField in req.body)){
      const errorMessage = `You're missing a requried field: ${requiredField}`;
      console.error(errorMessage);
      res.status(400).end();
      return;
    }
  });
  
  let promises=[];

  knex('restaurants')
    .returning('id')
    .insert({
      name: req.body.name,
      cuisine: req.body.cuisine,
      borough: req.body.borough,
    })
    .then(id=>{
      console.log(id[0]);
      req.body.grades.forEach(grade=>{
        knex('grades')
          .insert({
            restaurant_id: id[0],
            grade: grade.grade,
            score: grade.score,
            date: knex.fn.now()
          })
          .then(promise=> promises.push(promise));
      })
      Promise.all(promises)
      .then(()=>{
        console.log('done. :)');
        res.location(`/restaurants/${id}`).sendStatus(200);
      });
    });
});

// app.get('/restaurants/:id', (req,res)=>{

//   knex.first('restaurants.id', 'name','cuisine','borough','grades.id','grade','date as inspectionDate','score')
//     .select(knex.raw("CONCAT(address_building_number, ' ', address_street, ' ', address_zipcode ) as address"))
//     .from('restaurants')
//     .where('restaurants.id', req.params.id)
//     .innerJoin('grades','restaurants.id','grades.restaurant_id')
//     .orderBy('date','desc')
//     .then(r=>res.json(r));

// });

app.listen(PORT);
