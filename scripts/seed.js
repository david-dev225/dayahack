require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Category = require('./models/Category');
const Question = require('./models/Question');

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URI;
    if (!MONGO_URI) {
      console.error('❌ MONGODB_URI not set in environment variables');
      process.exit(1);
    }
    
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Category.deleteMany({});
    await Question.deleteMany({});

    // Load seed data
    const seedPath = path.join(__dirname, 'data', 'questions.json');
    const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

    console.log('📦 Loading seed data...');

    // Insert questions
    for (const question of seedData) {
      await Question.create(question);
    }
    console.log(`✅ ${seedData.length} questions inserted`);

    // Insert categories
    const categories = [
      { id: 1, name: 'Web Development', description: 'Questions sur le développement web' },
      { id: 2, name: 'Mobile Development', description: 'Questions sur le développement mobile' },
      { id: 3, name: 'Data Science', description: 'Questions sur la science des données' },
      { id: 4, name: 'DevOps', description: 'Questions sur DevOps et infrastructure' },
      { id: 5, name: 'Mixed', description: 'Questions mixtes de toutes les catégories' }
    ];

    for (const category of categories) {
      await Category.create(category);
    }
    console.log('✅ Categories inserted');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
