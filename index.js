var ref = require('ssb-ref')
var marked = require('ssb-marked')
function noop(){}
var onLink = noop
var extractor = new marked.Renderer()

extractor.mention = function (_, id) {
  onLink({target: id})
}

extractor.link = function (href, _, text) {
  onLink({label: text, target: href, embed: false})
}

extractor.image = function (href, _, text) {
  onLink({label: text, target: href, embed: true})
}

function links (s, _onLink) {
  if('string' !== typeof s) return
  onLink = _onLink
  try {
    marked(s, {renderer: extractor})
  } catch(err) {
    console.log(JSON.stringify(s))
    throw err
  }
  onLink = noop
}

module.exports = function (text) {
  var a = []
  links(text, function (link) {
    if(ref.isFeed(link.target))
      a.push({link: link.target, rel: 'mentions', name: link.label && link.label.replace(/^@/, '')})
    else if(ref.isBlob(link.target))
      a.push({link: link.target, rel: 'mentions', name: link.label})
    else if(ref.isMsg(link.target))
      a.push({link: link.target, rel: 'mentions', name: link.label})
  })
  return a
}

