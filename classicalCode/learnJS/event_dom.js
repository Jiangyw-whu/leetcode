;<ul id="ul1">
  <li>111</li>
  <li>222</li>
  <li>333</li>
  <li>444</li>
</ul>

//=> 不用事件委托
window.onload = function () {
  let oUl = document.getElementById('ul1')
  let aLi = document.getElementsByTagName('li')
  for (let i = 0; i < aLi.length; i++) {
    aLi[i].onclick = function () {
      alert(123)
    }
  }
}

//=>使用时间委托

window.onload = function () {
  let oUl = document.getElementById('ul1')
  oUl.onclick = function () {
    alert(123)
  }
}

window.onload = function () {
  let oUl = document.getElementById('ul1')
  oUl.onclick = function (ev) {
    let ev = ev || window.event
    if (ev.target.nodeName.toLowerCase() == 'li') {
      alert(123)
      console.log(ev.target.innerHTML)
    }
  }
}
