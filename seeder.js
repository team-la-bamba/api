const seeder = require('mongoose-seed');
const uri = process.env.MONGODB_URI || 'mongodb://localhost/labamba';

const data = [
  {
    model: 'Question',
    documents: [
      {
        text: 'Mår du bra?',
        type: 'radio',
        answers: [
          {
            text: 'Ja',
            weight: 5,
          },
          {
            text: 'Nej',
            weight: 10,
          }
        ]
      }
    ]
  }
]

seeder.connect(uri, () => {
  seeder.loadModels([
    'src/db/question.js'
  ]);

  seeder.clearModels(['Question'], () => {
    seeder.populateModels(data, () => seeder.disconnect());
  });
});
