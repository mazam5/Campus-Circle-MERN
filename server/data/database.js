import mongoose from "mongoose";

const connect = async function(){ 
    await mongoose.connect(process.env.Mongo_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("connected to DB")
    }).catch((err) => {
        console.log(err);
    })
};
export default connect;