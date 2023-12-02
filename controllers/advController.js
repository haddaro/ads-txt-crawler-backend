// This controller handles a GET request with a query value which is a domain.
const NodeCache = require('node-cache');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const parse = require('../utils/parseAdTxt');
const fetchText = require('../utils/fetchText');

const TTL = 1000;
const cache = new NodeCache();

const getDomainName = (input) => {
  if (input.includes('www')) return input.split('.', 2)[1];
  return input;
};

/* This function returns an object whose keys are the advertisers allowed to display
adds in the query domain, and values are the number of times they appear in the ad.txt file.
It is wrapped by our "catchAsync" function that handles exceptions,
so we don't have to try-catch everything.
A call to next() with an error will go to the error-handling middleware, 
and from there to the global error handler.
*/
exports.getAdvertisers = catchAsync(async (req, res, next) => {
  if (!req.query?.domain)
    return next(new AppError('Did not receive a domain', 400));
  //Allow the user to type either msn.com or www.msn.com or https://www.msn.com"
  const domain = getDomainName(req.query.domain);
  const startTime = Date.now();
  //Look for key in cache:
  let advertisers = cache.get(domain);
  if (!advertisers) {
    //Read the text from the domain's /ad.txt endpoint:
    const adsTxt = await fetchText(domain);
    //Parse the text to get the advertisers and their number:
    advertisers = parse(adsTxt);
    if (!advertisers)
      return next(new AppError('Could not retrieve advertisers', 500));
    //We have our own domain in the returned object, lets get rid of it:
    Object.keys(advertiserCount).forEach((key) => {
      if (key === domain) {
        delete advertiserCount[key];
      }
    });
    //now cache the result:
    cache.set(domain, advertisers, TTL);
  }
  //Return a response to our client:
  res.status(200).json({
    status: 'success',
    data: advertisers,
    duration: Date.now() - startTime,
  });
});
