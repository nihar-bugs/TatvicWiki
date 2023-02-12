import { useEffect, useState } from "react";
import Card from "../components/Card";
import { fetchWikiData } from "../helpers/MediaWiki";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [gotWikiData, setGotWikiData] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    if (search === "") {
      setResults([]);
      setGotWikiData(false);
    }
  }, [search]);

  useEffect(() => {
    if (search === "") {
      setResults([]);
      setGotWikiData(false);
    }
  }, [search]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && search) {
      let wikiParam = search;

      wikiParam = wikiParam.replace(/\s+/g, "_");

      const wikiData = await fetchWikiData(wikiParam);

      var updatedResults = [];
      if (wikiData[1].length > 0) {
        for (let i = 0; i < wikiData[1].length; i++) {
          console.log("Element[" + i + "]:", wikiData[1][i]);
          console.log("ElementUrl of element[" + i + "]:", wikiData[3][i]);
          updatedResults.push({ title: wikiData[1][i], url: wikiData[3][i] });
        }
        setGotWikiData(true);
        console.log(updatedResults);
        setResults(updatedResults);
        console.log(results);

        const pageTitle = wikiData[1][1];
        const pageUrl = wikiData[3][1];

        const setResult = await axios
          .post("/search/post", {
            pageTitle,
            pageUrl,
          })
          .then(() => setRefreshCounter(refreshCounter + 1));
        console.log(setResult);
      }
    }
  };

  return (
    <>
      {user ? (
        <>
          <div
            style={{
              backgroundColor: "lightcyan",
              display: "flex",
              justifyContent: "space-around",
              padding: "20px",
              position: "relative",
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              placeholder="Search"
              style={{
                width: "80%",
                border: "2px solid",
                borderRadius: "5px",
                padding: "10px",
              }}
            />
            {gotWikiData && (
              <div
                style={{
                  position: "absolute",
                  marginTop: "40px",
                  backgroundColor: "lightgrey",
                  width: "78%",
                  border: "1px solid",
                }}
              >
                {results.map((items, index) => (
                  <Link
                    key={index}
                    to={items.url}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                  >
                    <li
                      style={{
                        height: "25px",
                        listStyle: "none",
                        textDecoration: "none",
                        color: "Black",
                        padding: "5px",
                        borderBottom: "1px solid darkgrey",
                        marginLeft: "0px",
                        fontFamily: "sans-serif",
                      }}
                      key={index}
                    >
                      {items.title}
                    </li>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="home">
            <Card props="PAST 7 DAYS" counter={refreshCounter} />
            <Card props="PAST 1 DAY" counter={refreshCounter} />
            <Card props="PAST 1 HOUR" counter={refreshCounter} />
          </div>
        </>
      ) : (
        <div className="preLoginHome">KINDLY LOGIN TO VIEW DASHBOARD</div>
      )}
    </>
  );
};

export default Home;
