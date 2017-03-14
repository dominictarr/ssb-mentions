var test = require('tape')
var mentions = require('../')

test('mentions in links are detected', function (t) {
  t.deepEquals(mentions(
    '[@feed](@3HO6R2i60XNR3h6XCHAWCdt1k9Dwy+gaa2rVs6LzZ6Y=.ed25519)'), [
      {
        link: '@3HO6R2i60XNR3h6XCHAWCdt1k9Dwy+gaa2rVs6LzZ6Y=.ed25519',
        name: 'feed',
      }
    ], 'feed link')

  t.deepEquals(mentions(
    '[a msg](%A2LvseOYKDXyuSGlXl3Sz0F5j2khVCN6JTf8ORD/tM8=.sha256)'), [
      {
        link: '%A2LvseOYKDXyuSGlXl3Sz0F5j2khVCN6JTf8ORD/tM8=.sha256',
        name: 'a msg',
      }
    ], 'msg link')

  t.deepEquals(mentions(
    '[a blob](&9SSTQys34p9f4zqjxvRwENjFX0JapgtesRey7+fxK14=.sha256)'), [
      {
        link: '&9SSTQys34p9f4zqjxvRwENjFX0JapgtesRey7+fxK14=.sha256',
        name: 'a blob',
      }
    ], 'blob link')

  t.end()
})

test('ref mentions are detected', function (t) {
  t.deepEquals(mentions(
    '@3HO6R2i60XNR3h6XCHAWCdt1k9Dwy+gaa2rVs6LzZ6Y=.ed25519'), [
      {
        link: '@3HO6R2i60XNR3h6XCHAWCdt1k9Dwy+gaa2rVs6LzZ6Y=.ed25519',
        name: undefined
      }
    ], 'feed link')

  t.deepEquals(mentions(
    '%A2LvseOYKDXyuSGlXl3Sz0F5j2khVCN6JTf8ORD/tM8=.sha256'), [
      {
        link: '%A2LvseOYKDXyuSGlXl3Sz0F5j2khVCN6JTf8ORD/tM8=.sha256',
        name: undefined
      }
    ], 'msg link')

  t.deepEquals(mentions(
    '&9SSTQys34p9f4zqjxvRwENjFX0JapgtesRey7+fxK14=.sha256'), [
      {
        link: '&9SSTQys34p9f4zqjxvRwENjFX0JapgtesRey7+fxK14=.sha256',
        name: undefined
      }
    ], 'blob link')

  t.end()
})

test('bare feed name mentions can be detected', function (t) {
  t.deepEquals(mentions('a @feed mention', {bareFeedNames: true}),
    [{name: 'feed', link: '@'}], 'feed link')
  t.end()
})
