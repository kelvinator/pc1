var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/update', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
        conn.query(
            'UPDATE salesforce.Contact SET Email = $1 WHERE LOWER(Email) = LOWER($2)',
            [req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim()],
            function(err, result) {
               done();
               res.json(result);
            }
        );
    });
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
