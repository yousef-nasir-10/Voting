const express = require('express')
const app = express()
const votes = require('./routes/vote')
const connectDB = require('./db/connect')
const cors = require('cors')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const user = require('./routes/user')
const ServerlessHttp = require('serverless-http')
// const files = require('./routes/file')
// const issue = require('./routes/issue')
require('./pdfExtraction')





// midleware 
app.use(express.json())
app.use(cors({
    origin: "*"
   
    

}))    
  


 
// routes
app.use('/api/v1/votes', votes)  
app.use('/api/v1/users', user)   
// app.use('/api/v1/files', files)   
// app.use('/api/v1/issue', issue)   
app.use(notFound)  
app.use(errorHandler)

  
const port = process.env.PORT || 2000     

const start = async () =>{
    try {
        await connectDB(process.env.MANGO_URI)  
        .then(()=> console.log('Connected to the DB...'))
        .catch((err)=> console.log(err)) 
        app.listen(port, console.log(`Server running on port ${port}`))         
        

    } catch (error) {
        console.log(error); 
    }  
}
 
start()
