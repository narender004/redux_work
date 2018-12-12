import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
//const dbUrl = 'mongodb://localhost/crudwithredux';

function validate(data) {
    let errors = {};
    if (data.title === '') errors.title = "Can't be empty";
    if (data.cover === '') errors.cover = "Can't be empty";
    const isValid = Object.keys(errors).length === 0
    return { errors, isValid };
  }
  

mongodb.MongoClient.connect('mongodb://localhost/redux', function(err, db) {
    app.get('/api/redux', (req, res) => {
        db.collection('redux').find({}).toArray((err, redux) => {
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.json({ redux });
        });
      });
    
      app.post('/api/redux', (req, res) => {
        const { errors, isValid } = validate(req.body);
        if (isValid) {
          const { title } = req.body;
          db.collection('redux').insert({ title }, (err, result) => {
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            if (err) {
              res.status(500).json({ errors: { global: "Something went wrong" }});
            } else {
              res.json({ redux: result.ops[0] });
            }
          });
        } else {
          res.status(400).json({ errors });
        }
      });
    
      app.put('/api/redux/', (req, res) => {

       
        
     
        const { errors, isValid } = validate(req.body);
    
        if (isValid) {
          console.log('updated api call');
          console.log('id',req.body.id);
          console.log('title',req.body.title);
           const { id,title } = req.body;
          db.collection('redux').findOneAndUpdate(
            { _id: id },
            { $set: { title } },
            { returnOriginal: false },
            (err, result) => {
              if (err) { res.status(500).json({ errors: { global: err }}); return; }
    
              res.json({ redux: result.value });
            }
          );
        } else {
          res.status(400).json({ errors });
        }
      });


    app.get('/api/redux/:_id', (req, res) => {
      db.collection('redux').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, redux) => {
        res.json({ redux });
      })
    });
    
    app.delete('/api/redux/:_id', (req, res) => {
      db.collection('redux').deleteOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, r) => {
        if (err) { res.status(500).json({ errors: { global: err }}); return; }
  
        res.json({});
      })
    });
    
    //   app.use((req, res) => {
    //     res.status(404).json({
    //       errors: {
    //         global: "Still working on it. Please try again later when we implement it"
    //       }
    //     });
    // })

  app.listen(4040, () => console.log('Server is running on localhost:4040'));

});