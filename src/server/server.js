import Twitter from 'twitter';
import express from 'express';
import cors from 'cors';
import config from './config';

const client = new Twitter({
  consumer_key: config.twitter_consumer_key,
  consumer_secret: config.twitter_consumer_secret,
  access_token_key: config.twitter_access_token_key,
  access_token_secret: config.twitter_access_token_secret,
});

const app = express();
const port = 3000;

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/tweets.json', (req, res) => {
  console.log(req.query.username);
  const params = { screen_name: req.query.username };
  client.get(
    'statuses/user_timeline',
    params,
    (error, tweets, response) => {
      console.log(error);
      if (!error) {
        res.json(tweets);
      } else {
        res.json({ error });
      }
    },
  );
});

app.listen(port, () => console.log(
  `Example app listening at http://localhost:${port}`,
));
