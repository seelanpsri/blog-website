const mongodb=require('mongodb');
const Mongoclient=mongodb.MongoClient;
const objid=mongodb.ObjectId;


let database;
async function getdatabase(){
    let client=await Mongoclient.connect('mongodb://localhost:27017');
    database=client.db('blog');
    if(!database){
        console.log('database not created');

    }
    return database
}
module.exports={getdatabase,objid}