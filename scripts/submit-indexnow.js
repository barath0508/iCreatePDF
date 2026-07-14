const http = require('https');

const HOST = 'icreatepdf.online';
const KEY = '137b258eeaf54fc79cfc0fee07c11e3e';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

console.log('Fetching sitemap to extract URLs...');

// 1. Fetch sitemap.xml
httpsGet(SITEMAP_URL, (xml) => {
  if (!xml) {
    console.error('Failed to retrieve sitemap.xml. Ensure the site is deployed and live.');
    process.exit(1);
  }

  // 2. Extract URLs using regex matching <loc> tags
  const urlRegex = /<loc>(https:\/\/[^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = urlRegex.exec(xml)) !== null) {
    urls.push(match[1]);
  }

  if (urls.length === 0) {
    console.error('No URLs found in sitemap.xml.');
    process.exit(1);
  }

  console.log(`Found ${urls.length} URLs in sitemap.xml. Submitting to IndexNow...`);

  // 3. Post request payload to IndexNow API
  const postData = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/IndexNow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`IndexNow Response Status: ${res.statusCode} ${res.statusMessage}`);
    
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('IndexNow submission successful! All URLs submitted successfully.');
      } else {
        console.error(`IndexNow submission failed with code ${res.statusCode}.`);
        console.error(`Response: ${body}`);
      }
    });
  });

  req.on('error', (e) => {
    console.error(`Request error: ${e.message}`);
  });

  req.write(postData);
  req.end();
});

function httpsGet(url, callback) {
  http.get(url, (res) => {
    if (res.statusCode !== 200) {
      callback(null);
      return;
    }
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => callback(data));
  }).on('error', (e) => {
    console.error(`Error fetching sitemap: ${e.message}`);
    callback(null);
  });
}
