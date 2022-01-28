import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { wallet } from '../../services/near';
import { useContract } from '../../context/ContractProvider';
import { useTwitter } from '../../hooks/useTwitter';
import { TweetContainer } from '../../components/TweetContainer';

function User() {
    const { contractId } = useContract();
    // eslint-disable-next-line
    const [accountId, setAccountId] = useState(wallet.getAccountId() ?? '');
    const [apiError, setApiError] = useState('');
    const [isUser, setIsUser] = useState(false);
    const [tweets, setTweets] = useState(null);
    let { userId } = useParams();
    const {
        hasUserAccount,
        // eslint-disable-next-line
        updateValues,
        getTweets
    } = useTwitter({
        contractId,
        accountId,
        setApiError,
    });

    useEffect(() => {
        checkUserAccount(userId).then(res => {
            if (res) {
                getUserTweets(userId)
            }
        })
        // eslint-disable-next-line
    }, [userId])

    const checkUserAccount = async (accountId) => {
        let has_user_account = await hasUserAccount(accountId)
        setIsUser(has_user_account)
        return has_user_account
    }

    const getUserTweets = async (userId) => {
        let tweets = await getTweets(userId)
        setTweets(tweets)
        console.log(tweets)
    }

    return (
        <div className="container mx-auto px-4">
            <div className='flex flex-col space-y-3'>
                <p className='text-3xl'>Tweets from {userId}</p>
                {
                    apiError ?
                        <p>{apiError}</p>
                        : null
                }
                {
                    isUser ?
                        <div className='flex flex-col space-y-1'>
                            {tweets ?
                                tweets.map(tweet => (
                                    <TweetContainer tweet={tweet} key={tweet.text} />
                                ))
                                : null
                            }
                        </div>
                        : <p className='text-xl'>User not found</p>
                }
            </div>
        </div>
    )
}

export default User;