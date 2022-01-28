import React from 'react';
import Star from '../../assets/images/star.svg'

export const TweetContainer = ({ tweet }) => {
    const { text, sender, premium } = tweet

    return (
        <div className="w-full bottom-0 bg-gray-50 px-6 py-4 z-50 rounded-lg border-blue-500 border-2 space-y-2">
            <div className='flex flex-row space-x-2'>
                <span className="text-base font-bold">{sender}</span>
                {premium ? <span><img src={Star} className='h-auto w-5'></img></span> : null}
            </div>
            <p className="text-lg font-medium">{text}</p>
        </div>
    );
};
