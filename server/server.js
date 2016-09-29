// Set up
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://localhost/todolist');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var omitPrivate = function (doc, item) {
    delete item.id;
    delete item.__v;
    return item;
};

// options
var options = {
    toJSON: {
        virtuals: true,
        transform: omitPrivate
    },
    toObject: {
        virtuals: true,
        transform: omitPrivate
    }
};

// Models
var TodoItem = mongoose.model('TodoItem',
    new mongoose.Schema({
        title: String,
        description: String
    }, options));

// Routes

// Get reviews
app.get('/api/todos', function (req, res) {

    console.log("fetching todos");

    // use mongoose to get all reviews in the database
    TodoItem.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all reviews in JSON format
    });
});

// create review and send back all reviews after creation
app.post('/api/todos', function (req, res) {

    console.log("creating todo");

    // create a review, information comes from AJAX request from Ionic

    // var n = new TodoItem();
    // n.description = req.body.description;
    // n.title = req.body.title;
    // n.done = false;
    // n.save(function (err, todoitem) {
    //     if (err)
    //         res.send(err);
    //     res.json(todoitem);
    // })

    TodoItem.create({
        title: req.body.title,
        description: req.body.description,
        done: false
    }, function (err, todoitem) {
        if (err)
            res.send(err);

        res.json(todoitem);
    });

});

// delete a review
app.delete('/api/todos/:todo_id', function (req, res) {
    TodoItem.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err)
            res.send(err);
        res.json(todo);
    });
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");