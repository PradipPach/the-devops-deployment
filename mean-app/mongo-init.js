// Initialize MongoDB with default database and collections
db = db.getSiblingDB('dd_db');

db.createCollection('tutorials');

// Create indexes
db.tutorials.createIndex({ title: 1 });
db.tutorials.createIndex({ published: 1 });

print('Database dd_db initialized with tutorials collection');
