const express = require('express');
const session = require('express-session')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const routes = require('./routes');

const userPassport = require('./config/passport')
require('./config/mongoose');

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
  secret: "ThisIsMySecret",
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

userPassport(app)

app.use(routes);

app.listen(3000, () => {
  console.log('Express is listening on localhost:3000');
});
