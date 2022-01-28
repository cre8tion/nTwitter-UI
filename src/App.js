import './App.css';
import React, { useEffect, useState } from 'react';
import { wallet } from './services/near';
import { useTwitter } from './hooks/useTwitter';
import { useContract } from './context/ContractProvider';
import { TweetContainer } from './components/TweetContainer';

function App() {
  const { contractId } = useContract();
  const [apiError, setApiError] = useState('');
  const [tweetMessage, setTweetMessage] = useState('');
  const [accountId, setAccountId] = useState(wallet.getAccountId() ?? '');
  const [activeAccount, setActiveAccount] = useState(false)
  const {
    owner,
    // eslint-disable-next-line
    accounts,
    // eslint-disable-next-line
    tweets,
    recentTweets,
    hasUserAccount,
    createAccount,
    createTweet,
    updateValues
  } = useTwitter({
    contractId,
    accountId,
    setApiError,
  });


  const signIn = () => {
    try {
      wallet.requestSignIn(contractId);
    } catch (error) {
      setApiError(error);
    }
  };

  const signOut = () => {
    wallet.signOut();
    setAccountId('');
  };

  const checkUserAccount = async (accountId) => {
    let has_user_account = await hasUserAccount(accountId)
    setActiveAccount(has_user_account)
    return has_user_account
  }

  const callCreateAccount = async () => {
    await createAccount()
    checkUserAccount(accountId)
  }

  const callCreateTweet = async (message) => {
    await createTweet(message)
    setTweetMessage("")
    updateValues()
  }

  useEffect(() => {
    if (accountId !== "" && accountId) {
      checkUserAccount(accountId)
    }
    // eslint-disable-next-line
  }, [accountId])


  return (
    <div className="container mx-auto px-4">
      <div className='flex flex-col space-y-3'>
        <h1 className='text-4xl'>Twitter</h1>
        <p className='text-xl'>Owner: {owner}</p>
        <h2 className='text-2xl'>Recent Tweets</h2>
        <div className='flex flex-col space-y-1'>
          {recentTweets ?
            recentTweets.map(tweet => (
              <TweetContainer tweet={tweet} key={tweet.text} />
            ))
            : null
          }
        </div>
        {
          apiError ?
            <p>{apiError}</p>
            : null
        }
        {
          activeAccount ?
            null
            : <button onClick={() => callCreateAccount()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Account</button>
        }
        <input value={tweetMessage} onChange={e => setTweetMessage(e.target.value)} className="border-2 border-black rounded"></input>
        <button onClick={() => callCreateTweet(tweetMessage)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Tweet</button>
        {
          accountId === '' ?
            <button onClick={signIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
            : <button onClick={signOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log Out</button>
        }
      </div>
    </div >
  );
}

export default App;
