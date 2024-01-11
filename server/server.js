import express, { json } from "express"
import cors from "cors"
import mongoose, { mongo } from "mongoose";

const app = express();
app.use(cors());
app.use(express.json())
// const PORT = 3000;
// const connect = "mongodb://localhost:27017/Assignment";


// mongoose.connect(connect, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

mongoose.connect("mongodb://127.0.0.1:27017/Assignment")
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
// }
// );

const DataSchema = new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number,
  })
  
const DataModel = mongoose.model("Model", DataSchema, "visualization")

app.get("/insights",  (req, res) => {
    try{
        // const data = await DataModel.find()
        
        // console.log(data,'mongggoose data')
        // res.json(data)
        DataModel.find()
        .then(data => res.json(data))
        .catch(err => res.send(err))
    }catch (err) {
        console.log(err)
    }
})

app.get("/api", (req, res) => {
    res.send({ "users" : ["userOne", "userTwo", "userThree", "userFour", "userFive", "omkar"]})
})

app.listen(5000, () => {console.log("server listening to 5000")})