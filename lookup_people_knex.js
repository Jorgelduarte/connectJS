const settings = require("./settings"); // settings.json

const nameARGV = process.argv[2];

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

const findFamous = knex.select('*').from('famous_people')
.where('first_name', 'like', `%${nameARGV}%`).orWhere('last_name', 'like', `%${nameARGV}%`);

    findFamous.asCallback(function(err, rows) {
        if (err) {
            return console.error(err);
        }
        console.log("Searching ...");
        console.log(`Found ${rows.length} person(s) by the name ${nameARGV}:`);
        for (var i = 0; i < rows.length; i++) {
            console.log(`- ${i+1}: ${rows[i].first_name} ${rows[i].last_name}, born ${rows[i].birthdate}`);
        }
        knex.destroy();
    });
