var yo = require('yo-yo')
 
var el = list([
  'grizzly',
  'polar',
  'brown'
])
 
function list (items) {
  return yo`<ul>
    ${items.map(function (item) {
      return yo`<li>${item}</li>`
    })}
  </ul>`
}
 
document.body.appendChild(el)