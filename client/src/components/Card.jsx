import { useEffect, useState } from "react";
import "../app.css";
import axios from "axios";

const Card = ({ props, counter }) => {
  const [searchCount, setSearchCount] = useState();

  const getSearchDate = async () => {
    try {
      if (props === "PAST 7 DAYS") {
        const count = await axios.get("/search/past7days");
        setSearchCount(count.data);
      }
      if (props === "PAST 1 DAY") {
        const count = await axios.get("/search/past1day");
        setSearchCount(count.data);
      }
      if (props === "PAST 1 HOUR") {
        const count = await axios.get("/search/past1hour");
        setSearchCount(count.data);
      }
    } catch (err) {
      console.log("Error occured:", err);
    }
  };

  useEffect(() => {
    getSearchDate();
  }, [counter]);

  return (
    <div className="card">
      <span
        className="title"
        style={{
          fontSize: "20px",
          letterSpacing: "2px",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          textDecorationLine: "underline",
        }}
      >
        {props}
      </span>
      <ul className="list">
        <li
          className="listItem"
          style={{
            fontFamily: "sans-serif",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          TOTAL NO. OF SEARCHES:
          <div
            style={{
              border: "solid",
              padding: "2px",
              borderRadius: "20%",
              backgroundColor: "black",
              color: "white",
            }}
          >
            {searchCount}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Card;
