import './App.css';
import React, { useState } from 'react';
import { wallet } from './services/near';
import { useTwitter } from './hooks/useTwitter';
import { useContract } from './context/ContractProvider';
import { TweetContainer } from './components/TweetContainer';

function App() {
  const { contractId } = useContract();
  const [apiError, setApiError] = useState('');
  const [tweetMessage, setTweetMessage] = useState('');
  const [accountId, setAccountId] = useState(wallet.getAccountId() ?? '');
  const {
    owner,
    accounts,
    tweets,
    recentTweets,
    hasUserAccount,
    createAccount,
    createTweet,
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


  return (
    <div className="container mx-auto px-4">
      <div className='flex flex-col space-y-3'>
        <h1 className='text-4xl'>Twitter</h1>
        <p className='text-xl'>Owner: {owner}</p>
        <h2 className='text-2xl'>Recent Tweets</h2>
        <div className='flex flex-col'>
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
          hasUserAccount(accountId) ?
            null
            : <button onClick={() => createAccount()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Account</button>
        }
        <input value={tweetMessage} onChange={e => setTweetMessage(e.target.value)} className="border-2 border-black rounded"></input>
        <button onClick={() => createTweet(tweetMessage)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Tweet</button>
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
