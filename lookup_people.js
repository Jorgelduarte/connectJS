const pg = require("pg");
const settings = require("./settings"); // settings.json

const nameARGV = process.argv[2]

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

//set up selection
const findFamous = "SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1"
const countFamous = "SELECT COUNT(*) FROM famous_people WHERE first_name = $1 OR last_name = $1"

client.connect((err) => {
    if (err) {
    return console.error("Connection Error", err);
    }

    // Fetch how many famous were found
    client.query(countFamous, [nameARGV], (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }
    console.log("Searching ...")
    console.log(`Found ${result.rows[0].count} person(s) by the name ${nameARGV}:`);
    });

    // Fetch famous
    client.query(findFamous, [nameARGV], (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }

        for (var i = 0; i < result.rows.length; i++){
            console.log(`- ${i+1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born ${result.rows[i].birthdate}`)
        }
        client.end();
    });
});