import React from 'react';
import Navigation from '../components/Navigation';
import AddFeed from '../components/newFeed/AddFeed';

const NewsFeed = () => {
    return (
        <>
            <header>
                <Navigation />
            </header>
            <main>
                <AddFeed />
            </main>
        </>
    );
};

export default NewsFeed;