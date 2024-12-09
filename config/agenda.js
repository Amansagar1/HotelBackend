const { MongoClient } = require('mongodb');
const Agenda = require('agenda');

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: 'agendaJobs' },
});

// Start agenda jobs
agenda.on('ready', async () => {
  await agenda.start();
  console.log('Agenda started');
});

module.exports = { agenda };
