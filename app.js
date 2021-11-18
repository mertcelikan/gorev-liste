require('./db/connect')

const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const myPassword = require('./passwords')

// midleware
app.use(express.static('./public'))
app.use(express.json())




app.use('/api/v1/tasks', tasks)



const port = 3000;

const start = async () => {
    try {
        await connectDB(myPassword)
        app.listen(port, console.log(`Server is listening on port ${port}... `))
    } catch (error) {
        console.log(error)
    }
}

start()


