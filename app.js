const express = require('express')
const axios = require('axios');
const cors = require("cors");
const path = require('path');
const ObjectsToCsv = require('objects-to-csv');

const app = express();
const port = 3000;


const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname + '/public')))


app.get('/' , (req , res) => {
    res.sendFile(path.join(__dirname , 'views' , 'index.html'))
})

app.listen(port, () => {
    app.get('/users' , (req , res) => {
        axios.get('https://reqres.in/api/users')
            .then( response => {
                res.status(200).json(response.data);
                //Bonus task
                //Create .csv file
                (async () => {
                    const csv = new ObjectsToCsv(response.data.data);

                    // Save to file
                    await csv.toDisk('./test.csv');

                    // Return the CSV file as string
                    console.log(await csv.toString());
                })();
            })
            .catch((err) =>{
                res.status(500).json({ message: err });
            })
    });
});