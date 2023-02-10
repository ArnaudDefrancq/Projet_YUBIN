import React from "react";
import AddCom from "./AddCom";
import FeedCom from "./FeedCom";

const Feed = () => {
  return (
    <div className="feed-container">
      <div className="feed">
        <div className="top-feed">
          <img src="./images/mee.png" alt="avatar" className="feed-avatar" />
          <div className="top-container">
            <h2>Arnaud Defrancq</h2>
            <p>
              <i>Il y a 2j</i>
            </p>
          </div>
        </div>
        <div className="main-feed">
          <p className="feed-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
            consequuntur repellendus natus tempora voluptatem soluta illo
            reprehenderit ratione numquam voluptatibus!
          </p>
          <img src="./images/Logo-02.png" alt="" className="feed-image" />
        </div>
        <AddCom />
        <FeedCom />
      </div>
    </div>
  );
};

export default Feed;
