import BN from 'bn.js';
import { keyStores, Near, WalletConnection } from 'near-api-js';

const gas = new BN('70000000000000');

export const near = new Near({
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
});

export const wallet = new WalletConnection(near, 'lottery');

// -----------------------------------------------------------------------------------
// view functions
// -----------------------------------------------------------------------------------

//function to get owner of the contract
export const getOwner = () => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().viewFunction(CONTRACT_ID, 'get_owner');
};

//function to get accounts of the contract, if exists
export const getAccounts = () => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().viewFunction(CONTRACT_ID, 'get_accounts');
};

//function to get tweets of the user in the contract, if exists
export const getTweets = (accountId) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().viewFunction(CONTRACT_ID, 'get_tweets', { user: accountId });
};

//function to get recent tweets of the contract
export const getRecentTweets = () => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().viewFunction(CONTRACT_ID, 'get_recent_tweets');
};

export const hasUserAccount = (accountId) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().viewFunction(CONTRACT_ID, 'has_user_account', { user: accountId });
}

// -----------------------------------------------------------------------------------
// change functions
// -----------------------------------------------------------------------------------

//function to create account
export const createAccount = () => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: 'create_account',
    gas,
  });
}

//function to create tweet
export const createTweet = (message) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: 'create_tweet',
    gas,
    args: { message: message },
  });
}