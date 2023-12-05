//Regex for finding urls, took this one from the internet:
const urlPattern = new RegExp(
  '\\b(?:https?://)?[\\w-]+(\\.[\\w-]+)+[\\w.,@?^=%&:/~+#-]*\\b',
);

const extractUrl = (word) => {
  const match = word.match(urlPattern);
  //No need to check if there's a match because at this point we already did
  return match[0];
};

/* Returns an object whose keys are the elements of the array,
and the values are the number of instances of this element in the array */
const countInstances = (array) => {
  const res = {};
  array.forEach((element) => {
    res[element] = (res[element] || 0) + 1;
  });
  return res;
};

/*Since some of the matches with the urlPattern are dates rather than urls,
we want to make sure that we do not include them in the urls array.
*/
const hasLetters = (word) => {
  return /[a-zA-Z]/.test(word);
};

const parse = (rawText) => {
  //Transform the text into an array of words:
  words = rawText.split(' ');
  //Filter for only words that include urls:
  relevantWords = words.filter((word) => {
    return urlPattern.test(word) && !word.includes('.txt');
  });
  /*Now we have an array of words that look like this:
  "#display\r\nappnexus.com," which is still not good.
  We'll extract only the urls and map them to another array:
  */
  urlsPlus = relevantWords.map((word) => extractUrl(word));
  /* Some of the words we are left with after the mapping look like this:
  "aps.amazon.com,956848c0-33c2-4de9-b3b8-0aba84d59ea6,DIRECT": 1,
  Which is still not good, lets get rid of whats after the ',':
  */
  urls = urlsPlus.map((url) => url.split(',', 2)[0]);
  //Now we have an array of urls that we need to count:
  advertiserCount = countInstances(urls);
  // Get rid of them now when we have less strings to iterate:
  Object.keys(advertiserCount).forEach((key) => {
    if (!hasLetters(key)) {
      delete advertiserCount[key];
    }
  });
  return advertiserCount;
  //Small problem: our own domain is in the object. We'll deal with this in the controller.
};

module.exports = parse;
