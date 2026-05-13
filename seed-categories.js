const { MongoClient } = require('mongodb');

// Standard connection (non-SRV) using resolved hosts
const URI = 'mongodb://happyCart22:karthick%402004@ac-sac7dwv-shard-00-00.ks5dsvk.mongodb.net:27017,ac-sac7dwv-shard-00-01.ks5dsvk.mongodb.net:27017,ac-sac7dwv-shard-00-02.ks5dsvk.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-11na18-shard-0&authSource=admin&retryWrites=true&w=majority';

async function seed() {
  const client = new MongoClient(URI);
  await client.connect();
  const db = client.db('ecommerce');
  console.log('Connected to MongoDB');

  await db.collection('categories').deleteMany({});
  await db.collection('products').deleteMany({});
  console.log('Cleared existing data');

  const now = new Date();
  const cats = [
    { name: 'Electronics', description: 'Smartphones, laptops, audio gear and gadgets', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80', displayOrder: 1, active: true, createdAt: now, updatedAt: now },
    { name: 'Fashion', description: 'Clothing, footwear and accessories', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80', displayOrder: 2, active: true, createdAt: now, updatedAt: now },
    { name: 'Home & Kitchen', description: 'Appliances, cookware and home essentials', slug: 'home-kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', displayOrder: 3, active: true, createdAt: now, updatedAt: now },
    { name: 'Beauty & Personal Care', description: 'Skincare, makeup and grooming products', slug: 'beauty-personal-care', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', displayOrder: 4, active: true, createdAt: now, updatedAt: now },
    { name: 'Books & Stationery', description: 'Books, pens, notebooks and art supplies', slug: 'books-stationery', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80', displayOrder: 5, active: true, createdAt: now, updatedAt: now },
    { name: 'Sports & Fitness', description: 'Sports equipment, fitness gear and activewear', slug: 'sports-fitness', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba0c0964?w=400&q=80', displayOrder: 6, active: true, createdAt: now, updatedAt: now },
    { name: 'Toys & Games', description: 'Toys, board games and fun for all ages', slug: 'toys-games', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=400&q=80', displayOrder: 7, active: true, createdAt: now, updatedAt: now },
    { name: 'Groceries & Essentials', description: 'Daily essentials, food and beverages', slug: 'groceries-essentials', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80', displayOrder: 8, active: true, createdAt: now, updatedAt: now },
  ];

  const res = await db.collection('categories').insertMany(cats);
  const cid = Object.values(res.insertedIds);
  console.log('Inserted 8 categories');

  const fs = require('fs');
  const catMap = {};
  cats.forEach((c, i) => { catMap[c.name] = cid[i].toString(); });
  fs.writeFileSync('./cat-ids.json', JSON.stringify(catMap, null, 2));
  console.log('Saved category IDs to cat-ids.json');

  await client.close();
  console.log('Categories seeded successfully!');
}

seed().catch(console.error);
