import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const option = { maxPoolSize:10 };

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

// 单例模式
if(!global._mongoClientPromise) {
    client = new MongoClient(uri, option);
    global._mongoClientPromise = client.connect();  
}

clientPromise = global._mongoClientPromise; 

export default clientPromise;