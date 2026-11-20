require('dotenv').config();
const mongoose = require('mongoose');
const songModel = require('./src/models/song.model');
const fs = require('fs');
const path = require('path');

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB successfully!');

    const songsFilePath = path.join(__dirname, 'bollywood_songs_105.json');
    const songsData = JSON.parse(fs.readFileSync(songsFilePath, 'utf8'));

    // Clear previous songs to ensure only the 105 verified tracks exist
    await songModel.deleteMany({});
    console.log('Cleared previous songs collection.');

    const inserted = await songModel.insertMany(songsData);
    console.log(`Successfully seeded ${inserted.length} Bollywood songs!`);

    const summary = await songModel.aggregate([
      { $group: { _id: '$mood', count: { $sum: 1 } } }
    ]);

    console.log('\n--- Final Mood Counts (15 Each) ---');
    summary.forEach(item => {
      console.log(`[${item._id.toUpperCase()}]: ${item.count} songs`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Error seeding songs:', err);
    process.exit(1);
  }
}

seed();
