# ads-txt-crawler-backend

Send a GET request to https://ads-txt-crawler-backend.onrender.com/advertisers?domain=<domain_of_your_choice>
replacing <domain_of_your_choice> with the domain you want to query.
You will receive a response in JSend format, and its "status" property should say "success".
The response will contain an object named "advertisers" inside a "data" property.
This object includes key-value pairs, where each key is a website found in the /ads.txt endpoint of your specified domain,
and each value represents the frequency of its occurrence there.
