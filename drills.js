const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

// clear the console before each run
process.stdout.write('\033c');

//restaurants variable
let restaurants = '';

// Sample select 
// knex.select().from('restaurants')
//   .debug(true)
//   .then(results => console.log(results));

//Drill 1
// knex.select().from('restaurants')
//   .then(results => console.log(results));

//Drill 2
// knex.select().from('restaurants')
//   .where({cuisine:'Italian'})
//   .then(r => console.log(r));

//Drill 3
// knex.select('id', 'name').from('restaurants')
//   .where({cuisine:'Italian'})
//   .limit(10)
//   .then(r => console.log(r));

//Drill 4
// knex.select().count().from('restaurants')
//   .where({cuisine:'Thai'})
//   .then(r=>console.log(JSON.stringify(r)));

//Drill 5
// knex.select().count().from('restaurants')
//   .then(r=>console.log(JSON.stringify(r)));

//Drill 6
// knex.select().count().from('restaurants')
//   .where({cuisine:'Thai', address_zipcode:'11372'})
//   .then(r=>console.log(JSON.stringify(r)));

//Drill 7
// knex.select().from('restaurants')
//   .whereIn('address_zipcode', [10012, 10013, 10014])
//   .andWhere({cuisine:'Italian'})
//   .orderBy('name', 'ASC')
//   .limit(5)
//   .then(r=>console.log(JSON.stringify(r)));

//Drill 8
// knex('restaurants')
// .returning('name')
// .insert({
//   name: 'Byte Cafe',
//   borough: 'Brooklyn',
//   cuisine: 'coffee',
//   address_building_number: '123',
//   address_street: 'Atlantic Avenue',
//   address_zipcode: '11231'
// })
// .then(r=>console.log(JSON.stringify(r)));

//Drill 9 
// knex('restaurants')
//   .returning(['name','id'])
//   .insert({
//     name:'Soul Veg',
//     borough:'Manhattan',
//     cuisine:'Soul Food'
//   })
//   .then(r=>console.log(JSON.stringify(r)));

//Drill 10
// knex('restaurants')
//   .returning(['name','nyc_restaurant_id'])
//   .where({nyc_restaurant_id:'30191841'})
//   .update({name:'DJ Reynolds Pub and Restaurant'})
//   .then(r=>console.log(JSON.stringify(r)));

//Drill 11
// knex('grades')
//   .returning('grade')
//   .where({id:10})
//   .del()
//   .then(r=>console.log(r));

//Drill 12
// knex('restaurants')
//   .where({id:12})
//   .del()
//   .then(r=>console.log(r))
//   .catch(e=>console.log(e));

// Destroy the connection pool
knex.destroy().then(() => { console.log('closed');});