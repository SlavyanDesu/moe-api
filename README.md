<div align="center">
  <h1><b>moe-api</b></h1>
  <p>Search anime scene using trace.moe API.</p>
  <a href="https://opensource.org/licenses/mit-license.php"><img src="https://badges.frapsoft.com/os/mit/mit.svg?v=103"></a>
  <a href="https://packagephobia.com/result?p=moe-api"><img src="https://packagephobia.com/badge?p=moe-api"></a>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FSlavyanDesu%2Fmoe-api?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FSlavyanDesu%2Fmoe-api.svg?type=shield"/></a>
  <a href="https://www.codefactor.io/repository/github/slavyandesu/moe-api"><img src="https://www.codefactor.io/repository/github/slavyandesu/moe-api/badge" alt="CodeFactor" /></a>
</div>

## Installation
```sh
$ npm install moe-api
```

## Usage
### ESM
```js
import TraceMoe from 'moe-api'
const moe = new TraceMoe()
```

### CommonJS
```js
const TraceMoe = require('moe-api').default
const moe = new TraceMoe()
```

## Options
```js
const moe = new TraceMoe({
  apiKey: 'ABC',
  cutBorders: false,
  anilistInfo: true,
  mute: false,
  size: 1
})
```
- `apiKey`: Your API key, you can safely ignore this if you don't have it.
- `cutBorders`: Cut away unnecessary parts of the images that would affect search results accuracy. Default is `false`.
- `anilistInfo`: Include AniList info. Default is `true`.
- `mute`: Mute generated video. Default is `false`.
- `size`: Size of generated media. `0` small, `1` medium, and `2` large. Default is `1`.

## Example
```js
import TraceMoe from 'moe-api'
const moe = new TraceMoe()

async function sourceFromUrl(url) {
  const res = await moe.traceFromUrl(url)
  console.log(res)
}

sourceFromUrl('https://images.plurk.com/32B15UXxymfSMwKGTObY5e.jpg')
```

## API
**moe.traceFromUrl(url)**  
- `url` string of media URL that can be decoded by `ffmpeg`.

Get source from given media URL.  

**moe.traceFromFile(filePath)**
- `filePath` string of existing media path.

Get source from given file.  

**moe.traceFromBase64(base64)**
- `base64` string of Base64 or data URL.

Get source from Base64 string or data URL.  

**moe.me()**  
Check the search quota and limit for your account (with API key) or IP address (without API key).

For more info please check [trace.moe API docs](https://soruly.github.io/trace.moe-api/#/docs).

## License
**moe-api** © [SlavyanDesu](https://github.com/SlavyanDesu), released under the [MIT License](LICENSE). Authored and maintained by SlavyanDesu.
<div align="center">
  <a href="ttps://app.fossa.com/projects/git%2Bgithub.com%2FSlavyanDesu%2Fmoe-api?ref=badge_large"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FSlavyanDesu%2Fmoe-api.svg?type=large" alt="Fossa Status">
</div>