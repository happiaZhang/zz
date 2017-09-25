/**
 * Created by happia.zhang on 2017/9/2.
 */
const Redis = require('ioredis');

class RedisStore {
  constructor(options) {
    if (Array.isArray(options)) {
      this.client = new Redis.Cluster(options);
    } else {
      this.client = new Redis(options);
    }
    this.client.on('connect', () => {
      console.log('redis is connected.');
    });
    this.client.on('error', () => {
      console.log('redis throw error.');
    });
  }

  async get(sid) {
    const data = await this.client.get(sid);
    if (!data) return null;
    try {
      return JSON.parse(data.toString());
    } catch (err) {
      console.log('parse session error: %s', err.message);
    }
  }

  async set(sid, sess, ttl) {
    if (typeof ttl === 'number') ttl = Math.ceil(ttl / 1000);
    sess = JSON.stringify(sess);
    if (ttl) {
      await this.client.setex(sid, ttl, sess);
    } else {
      await this.client.set(sid, sess);
    }
  }

  async destroy(sid) {
    await this.client.del(sid);
  }
}

module.exports = RedisStore;
