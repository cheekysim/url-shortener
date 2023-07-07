import { MongoClient } from 'mongodb';
class MongoDB {
    constructor(ip, database, user, pass) {
        const url = new URL(`mongodb://${user}:${pass}@${ip}:27017/${database}?authMechanism=DEFAULT&authSource=admin`);
        this.database = database;
        this.client = new MongoClient(url.toString());
    }
    async read(Collection, query = {}, sort = {}) {
        console.log(`Reading ${Collection}...`);
        const con = await this.client.connect();
        const collection = con.db(this.database).collection(Collection);
        return await collection.find(query).sort(sort).toArray();
    }
    async writeMany(Collection, data) {
        if (data.length === 0) {
            console.log(`No data to write to ${Collection}`);
            return;
        }
        console.log(`Writing ${Collection}...`);
        const con = await this.client.connect();
        const collection = con.db(this.database).collection(Collection);
        return await collection.insertMany(data);
    }
    async write(Collection, data) {
        if (Object.keys(data).length === 0) {
            console.log(`No data to write to ${Collection}`);
            return;
        }
        console.log(`Writing ${Collection}...`);
        const con = await this.client.connect();
        const collection = con.db(this.database).collection(Collection);
        return await collection.insertOne(data);
    }
    async update(Collection, query, data) {
        if (Object.keys(data).length === 0) {
            console.log(`No data to write to ${Collection}`);
            return;
        }
        console.log(`Updating ${Collection}...`);
        const con = await this.client.connect();
        const collection = con.db(this.database).collection(Collection);
        return await collection.updateOne(query, data);
    }
    async replace(Collection, query, data) {
        if (Object.keys(data).length === 0) {
            console.log(`No data to write to ${Collection}`);
            return;
        }
        console.log(`Updating ${Collection}...`);
        const con = await this.client.connect();
        const collection = con.db(this.database).collection(Collection);
        return await collection.replaceOne(query, data);
    }
    async deleteOne(Collection, query) {
        console.log(`Deleting ${Collection}...`);
        const con = await this.client.connect();
        const collection = con.db(this.database).collection(Collection);
        return await collection.deleteOne(query);
    }
    async drop(Collection) {
        console.log(`Dropping ${Collection}...`);
        const con = await this.client.connect();
        if (await this.collectionExists(Collection)) {
            return await con.db(this.database).collection(Collection).drop();
        }
        else {
            return false;
        }
    }
    async listCollections() {
        const con = await this.client.connect();
        return await con.db(this.database).listCollections().toArray();
    }
    async close() {
        await this.client.close();
        console.log('Disconnected from MongoDB');
    }
    async collectionExists(Collection) {
        const con = await this.client.connect();
        const collections = (await con.db(this.database).listCollections().toArray()).map((collection) => collection.name);
        console.log(`Collection: ${Collection} ${collections.includes(Collection) ? 'exists' : 'does not exist'}`);
        return collections.includes(Collection);
    }
}
console.log('Connected to MongoDB');
export { MongoDB };
export default {
    MongoDB
};
