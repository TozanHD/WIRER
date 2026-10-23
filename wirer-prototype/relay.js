const http = require('http');
const Gun = require('gun');

const PORT = process.env.PORT || 8765;

// Gun.jsはWebSocketしか処理しないため、通常のHTTPアクセスには死活確認用の応答を返す
// （これが無いとブラウザやヘルスチェックからのアクセスが永遠に読み込み中になる）
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/gun')) return;
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('WIRER relay is running');
}).listen(PORT);

// そのサーバーにGun.jsをドッキングする
const gun = Gun({ web: server });

console.log(`⚡ WIRER Relay Server running on http://localhost:${PORT}/gun`);