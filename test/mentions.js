var test = require('tape')
var mentions = require('../')

var id = {
  feed: '@3HO6R2i60XNR3h6XCHAWCdt1k9Dwy+gaa2rVs6LzZ6Y=.ed25519',
  msg: '%A2LvseOYKDXyuSGlXl3Sz0F5j2khVCN6JTf8ORD/tM8=.sha256',
  blob: '&9SSTQys34p9f4zqjxvRwENjFX0JapgtesRey7+fxK14=.sha256'
}
id.all = [id.feed, id.msg, id.blob].join(' ')

var text = {
  feed: '[@feed](' + id.feed + ')',
  msg: '[a msg](' + id.msg + ')',
  blob: '[a blob](' + id.blob + ')'
}
text.all = [text.feed, text.msg, text.blob].join(' ')

var linkMention = {
  feed: [ { link: id.feed, name: 'feed', rel: 'mentions' } ],
  msg: [ { link: id.msg, name: 'a msg', rel: 'mentions' } ],
  blob: [ { link: id.blob, name: 'a blob', rel: 'mentions' } ]
}
linkMention.all = linkMention.feed.concat(linkMention.msg, linkMention.blob)

test('mentions in links are detected', function (t) {
  t.deepEquals(mentions(text.feed), linkMention.feed, 'feed link')
  t.deepEquals(mentions(text.msg), linkMention.msg, 'msg link')
  t.deepEquals(mentions(text.blob), linkMention.blob, 'blob link')
  t.deepEquals(mentions(text.all), linkMention.all, 'all links')
  t.end()
})

var refMention = {
  feed: [ { link: id.feed, name: undefined, rel: 'mentions' } ],
  msg: [ { link: id.msg, name: undefined, rel: 'mentions' } ],
  blob: [ { link: id.blob, name: undefined, rel: 'mentions' } ]
}
refMention.all = refMention.feed.concat(refMention.msg, refMention.blob)

test('ref mentions are detected', function (t) {
  t.deepEquals(mentions(id.feed), refMention.feed, 'feed link')
  t.deepEquals(mentions(id.blob), refMention.blob, 'blob link')
  t.deepEquals(mentions(id.msg), refMention.msg, 'msg link')
  t.deepEquals(mentions(id.all), refMention.all, 'all link')
  t.end()
})
