// eslint-disable-next-line
import { wallet } from '../services/near';
import { useState, useCallback, useEffect } from 'react';
import {
  getOwner,
  getAccounts,
  getTweets,
  getRecentTweets,
  hasUserAccount,
  createAccount,
  createTweet
} from '../services/near';

export const useTwitter = ({ contractId, accountId, setApiError }) => {
  const [owner, setOwner] = useState('');
  const [accounts, setAccounts] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [recentTweets, setRecentTweets] = useState(null);

  const updateValues = useCallback(async () => {
    try {
      setOwner(await getOwner());
      setAccounts(await getAccounts());
      setTweets(await hasUserAccount(accountId) ? await getTweets(accountId) : []);
      setRecentTweets(await getRecentTweets());
    } catch (error) {
      setApiError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractId, accountId]);

  useEffect(() => {
    try {
      updateValues();
    } catch (err) {
      setApiError(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateValues]);

  const handleCreateAccount = async () => {
    return await createAccount();
  };

  const handleCreateTweet = async (message) => {
    return createTweet(message);
  };

  const handleHasUserAccount = async (accountId) => {
    return await hasUserAccount(accountId);
  }

  return {
    owner,
    accounts,
    tweets,
    recentTweets,
    hasUserAccount: handleHasUserAccount,
    createAccount: handleCreateAccount,
    createTweet: handleCreateTweet,
    updateValues,
    getTweets
  };
};
