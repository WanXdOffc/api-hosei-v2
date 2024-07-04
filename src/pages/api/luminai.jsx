import { MongoClient } from 'mongodb';
import rateLimit from 'express-rate-limit';
import axios from 'axios';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 15, // Limit each IP to 15 requests per windowMs
  message: 'Too many requests from this IP, please try again after 24 hours',
  store: new MongoClient(uri, {
    async init() {
      await client.connect();
      this.db = client.db('api_limits');
    },
    async increment(key) {
      const collection = this.db.collection('request_counts');
      const result = await collection.updateOne(
        { key },
        { $inc: { count: 1 } },
        { upsert: true }
      );
      return result.upsertedCount + result.modifiedCount;
    },
    async decrement(key) {
      const collection = this.db.collection('request_counts');
      await collection.updateOne({ key }, { $inc: { count: -1 } });
    },
    async resetKey(key) {
      const collection = this.db.collection('request_counts');
      await collection.deleteOne({ key });
    },
  }),
});

async function LuminAI(message) {
  try {
    const response = await axios.post('https://luminai.siputzx.my.id/', {
      messages: [
        { role: 'user', content: message }
      ]
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default async function handler(req, res) {
  await limiter(req, res, async () => {
    try {
      const { message } = req.query;
      if (!message) {
        return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
      }
      const response = await LuminAI(message);
      res.status(200).json({
        status: 200,
        creator: "Lorenzxz",
        data: { response }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

export const config = {
  api: {
    externalResolver: true,
  },
};