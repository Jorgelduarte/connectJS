const settings = require("./settings"); // settings.json

const fistName= process.argv[2];
const lastName= process.argv[3];
const dateBirth = process.argv[4];

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database,
      port: settings.port
    }
});

const insertFamous = knex.insert([{first_name: `${fistName}`, last_name: `${lastName}`, birthdate: `${dateBirth}`}]).into('famous_people');

if (dateBirth === undefined) {
    console.log("YOU NEED INSERT 3 ARGUMENTS");
    return
}
insertFamous.asCallback(function(err, rows) {
    if (err) {
        return console.error(err);
    }
        
    console.log("Famous was inserted!")

    knex.destroy();
});