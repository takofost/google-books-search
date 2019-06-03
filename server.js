const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require('./models');

app.use(cors(options));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Serve the UI over express server
router.get('/', function (req, res) {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  } else {
    res.sendFile(path.join(__dirname, './client/public/'));
  }
});


router.get('/api', function (req, res) {
  res.send('API initialized');
});


app.use('/api', router);

router.route('/books')

  .post(function (req, res) {
    console.log("saving book")

    const books = new Books();
    books.title = req.body.title,
      books.authors = req.body.authors,
      books.rating = req.body.rating,
      books.publisher = req.body.publisher,
      books.publishedDate = req.body.publishedDate,
      description = req.body.description,
      books.thumbnail = req.body.thumbnail,
      books.price = req.body.price,
      books.purchase = req.body.purchase;


    books.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: 'Books added',
          books: books
        });
      }
    })
  })


  .get(function (req, res) {
    Books.find(function (err, books) {
      if (err) {
        res.send(err);
      } else {
        res.json(books);
      }
    });
  })

router.route('/books/:id')

  .delete(function (req, res) {
    Books.deleteOne({ _id: req.params.id }, function (err) {
      if (err) {
        res.send(err);
      } else {
        console.log("successfully removed!", req.params.id);
      }
    }).then(function () {
      res.status(204).end();
    });
  });


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
