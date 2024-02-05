import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL||'');

const conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})

export default mongoose;