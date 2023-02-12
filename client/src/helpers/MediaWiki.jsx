import axios from "axios";

export const fetchWikiData = (param) => {
  const WikiEndpoint = "https://en.wikipedia.org/w/api.php";
  const WikiParams =
    "?action=opensearch" +
    "&limit=5" + //The no. of pages
    "&namespace=0" +
    "&plaintext=1" + //tells the API to provide content in plain text
    "&format=json" + //requests data in json format
    "&formatversion=2" + //makes the json properties easier to navigate using  dot notation
    "&origin=*" + //to avoid cors error
    "&search=" + // text to search wikipedia (changes based on 'param')
    param;

  const wikiSearchUrl = WikiEndpoint + WikiParams;

  console.log(wikiSearchUrl);

  var wikiConfig = {
    timeout: 6500,
  };

  const wikiResponse = async (url, config) => {
    const res = await axios.get(url, config);
    return res.data;
  };

  try {
    return wikiResponse(wikiSearchUrl, wikiConfig)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log("Error occured while fetching Wikipedia data:", error);
        return null;
      });
  } catch (error) {
    console.log("Error occured:", error);
  }
};
