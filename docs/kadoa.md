Extract data from a single webpage
Instantly extracts data from a webpage using either a template for structured data or markdown/html for unstructured content.

```
const options = {
  method: 'POST',
  headers: {'x-api-key': '<api-key>', 'Content-Type': 'application/json'},
  body: '{"link":"<string>"}'
};

fetch('https://api.kadoa.com/v4/adhoc/body', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  ```
  
​Response:

{
  "status": "<string>",
  "link": "<string>",
  "location": {},
  "data": {},
  "screenshotUrl": "<string>",
  "requestTimeMs": 123
}