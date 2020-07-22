const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); 


// build module dbService
var dbServices = require('./routes/api/db-services');

//link the route /db-services to dbServices


app.use(express.json());
app.use(express.urlencoded({extended:true}));
;

app.use('/db-services', dbServices);


// Heroku will use pross.env.PORT otherwise locally we use 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));




module.exports =app;









