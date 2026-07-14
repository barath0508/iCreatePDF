const http = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'icreatepdf.online';
const KEY = '137b258eeaf54fc79cfc0fee07c11e3e';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

console.log('Fetching live sitemap to extract URLs...');

// Try to fetch sitemap.xml from the live site first
httpsGet(SITEMAP_URL, (xml, err) => {
  let urls = [];

  if (xml) {
    console.log('Successfully fetched live sitemap.xml.');
    // Extract URLs using regex matching <loc> tags
    const urlRegex = /<loc>(https:\/\/[^<]+)<\/loc>/g;
    let match;
    while ((match = urlRegex.exec(xml)) !== null) {
      urls.push(match[1]);
    }
  } else {
    console.warn(`Could not retrieve live sitemap.xml (Error/Status: ${err}).`);
    console.log('Falling back to local sitemap parser...');
    urls = getUrlsFromLocalSitemap();
  }

  if (urls.length === 0) {
    console.error('Failed to extract any URLs from both live sitemap and local sitemap.ts.');
    process.exit(1);
  }

  console.log(`Prepared ${urls.length} URLs for submission.`);
  submitToIndexNow(urls);
});

function getUrlsFromLocalSitemap() {
  try {
    const sitemapPath = path.join(__dirname, '../app/sitemap.ts');
    if (!fs.existsSync(sitemapPath)) {
      console.error(`Local sitemap file not found at: ${sitemapPath}`);
      return [];
    }
    const content = fs.readFileSync(sitemapPath, 'utf8');
    
    // Extract all strings starting with '/' inside single quotes
    const routeRegex = /'(\/[^']*)'/g;
    const paths = ['/']; // Include homepage
    let match;
    while ((match = routeRegex.exec(content)) !== null) {
      paths.push(match[1]);
    }
    
    const uniquePaths = [...new Set(paths)];
    console.log(`Parsed ${uniquePaths.length} routes from local sitemap.ts.`);
    return uniquePaths.map(p => `https://${HOST}${p}`);
  } catch (parseErr) {
    console.error(`Error parsing local sitemap: ${parseErr.message}`);
    return [];
  }
}

function submitToIndexNow(urls) {
  console.log('Submitting to IndexNow API...');

  // Post request payload to IndexNow API
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
      if (res.statusCode === 200 || res.statusCode === 202) {
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
}

function httpsGet(url, callback) {
  http.get(url, (res) => {
    if (res.statusCode !== 200) {
      callback(null, `HTTP Status ${res.statusCode}`);
      return;
    }
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => callback(data, null));
  }).on('error', (e) => {
    callback(null, e.message);
  });
}
