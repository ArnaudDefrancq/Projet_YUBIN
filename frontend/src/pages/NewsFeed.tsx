import React from "react";
import Navigation from "../components/Navigation";
import AddFeed from "../components/newFeed/AddFeed";
import Feed from "../components/newFeed/Feed";

const NewsFeed = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <AddFeed />
        <Feed />
      </main>
    </>
  );
};

export default NewsFeed;
