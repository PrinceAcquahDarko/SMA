let express = require('express');
let cors = require('cors')
let app = express();

let loginRouter = require('./routes/loginRoutes')()
let registerRouter = require('./routes/registerRoutes')()

app.use(express.json())
app.use(cors())
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(3000, ()=> console.log('listening on port 3000'))