const mongoose = require('mongoose');

const mongoUri =
  'mongodb://admin:admin_123@ds259738.mlab.com:59738/mongo-nor-test';

const schema = new mongoose.Schema({
  name: 'string',
  slots: [
    {
      x: 'number',
      y: 'number',
    },
  ],
});

const model = mongoose.model('Record', schema);

mongoose.connect(mongoUri, async () => {
  console.log('Connecting done');
  const query = {
    slots: {
      $elemMatch: {
        $nor: [
          {
            x: 1,
          },
          {
            y: 3,
          },
        ],
      },
    },
  };
  const records = await model.find(query).lean();
  console.log(records);
  process.exit();
});
