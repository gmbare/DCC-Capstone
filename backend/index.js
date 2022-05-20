
require("dotenv").config();
const studioRouter = require('./routes/studios')
const artistRouter = require('./routes/artists')
const usersRouter = require("./routes/users");
const connectDb = require("./db/db")
const express = require("express");
const cors = require("cors")
const app = express();
connectDb()

// require("dotenv").config();




app.use(cors())
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/api/studio', studioRouter)
app.use('/api/artist', artistRouter)
// app.use(`/api/users`, usersRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});


  // refreshList()
;












