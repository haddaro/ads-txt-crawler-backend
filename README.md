# ads-txt-crawler-backend

## Frontend
The frontend for this project is available here: [ads-txt-crawler](https://ads-txt-crawler.vercel.app/).

## API Usage
Send a `GET` request to the following endpoint:
https://ads-txt-crawler-backend.onrender.com/advertisers?domain=<domain_of_your_choice>

Replace `<domain_of_your_choice>` with the domain you wish to query.

### Response Format
The response will be in [JSend](https://github.com/omniti-labs/jsend) format, with the following properties:

- `status`: Should return `"success"` if the request was successful.
- `data`: Contains an object named `advertisers`, which includes key-value pairs where:
  - Each **key** is a website found in the `/ads.txt` endpoint of the specified domain.
  - Each **value** represents the frequency of its occurrence.

### Additional Response Details
- `duration`: The amount of time taken to process the request (varies based on caching).
- `domain`: Your parsed domain, excluding protocol (e.g., `http://`) and `www`.



