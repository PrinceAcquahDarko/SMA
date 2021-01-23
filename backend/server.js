let express = require('express');
let app = express();

let loginRouter = require('./routes/loginRoutes')()
let registerRouter = require('./routes/registerRoutes')()

app.get('/', (req, res) => {
    res.send('hello world');
})
app.use(express.json())
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(3000, ()=> console.log('listening on port 3000'))