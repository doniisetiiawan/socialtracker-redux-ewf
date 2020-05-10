import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import SocialConstants from '../constants/SocialConstants';
import JSONUtil from '../utils/jsonutil';

const SocialActions = {
  filterTweets(event) {
    AppDispatcher.dispatch({
      type: SocialConstants.FILTER_BY_TWEETS,
      showTweets: event.target.checked,
    });
  },

  filterReddits(event) {
    AppDispatcher.dispatch({
      type: SocialConstants.FILTER_BY_REDDITS,
      showReddits: event.target.checked,
    });
  },

  syncTweets(json) {
    AppDispatcher.dispatch({
      type: SocialConstants.SYNC_TWEETS,
      tweets: json.map((tweet) => assign(tweet, { type: 'tweet' })),
      receivedAt: Date.now(),
    });
  },

  syncReddits(json) {
    AppDispatcher.dispatch({
      type: SocialConstants.SYNC_REDDITS,
      reddits: json.data.children.map((child) => assign(child.data, { type: 'reddit' })),
      receivedAt: Date.now(),
    });
  },

  fetchTweets(username) {
    fetch(`http://localhost:3000/tweets.json?username=${username}`)
      .then(JSONUtil.parseJSON)
      .then((json) => SocialActions.syncTweets(json))
      .catch(JSONUtil.handleParseException);
  },

  fetchReddits(topic) {
    fetch(`https://www.reddit.com/r/${topic}.json`)
      .then(JSONUtil.parseJSON)
      .then((json) => SocialActions.syncReddits(json))
      .catch(JSONUtil.handleParseException);
  },
};

export default SocialActions;
