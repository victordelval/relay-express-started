const { MongoClient } = require('mongodb');
const assert = require('assert');
// const { graphql } = require('graphql');
const graphqlHTTP = require('express-graphql');
const express = require('express');

const app = express();
app.use(express.static('public'));

const mySchema = require('./schema/main');
const MONGO_URL = 'mongodb://localhost:27017/test';


MongoClient.connect(MONGO_URL, (err, db) => {
    if (err) throw err;
    assert.equal(null, err);
    console.log('Connected to MongoDB server');

    app.use('/graphql', graphqlHTTP({
        schema: mySchema,
        context: { db },
        graphiql: true
    }));

    app.listen(3000, () =>
        console.log('Running Express on port 3000')
    );

});
