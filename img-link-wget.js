// ==UserScript==
// @name        Image Link wget
// @namespace   Violentmonkey Scripts
// @grant       none
// @version     1.0
// @include     https://nhentai.net/g/*
// @include     https://3hentai.net/d/*
// @author      -
// @description 2/19/2025, 3:08:21 PM
// @downloadURL https://raw.githubusercontent.com/recobin01/js-util/refs/heads/main/img-link-wget.js
// @updateURL https://raw.githubusercontent.com/recobin01/js-util/refs/heads/main/img-link-wget.js
// ==/UserScript==


function $(content){
  let div = document.createElement("div")
  if(!content) return div
  div.innerHTML = content.trim();
  return div.firstChild
}
function normalize(src){
  if(!src) return ""
  let idx = src.lastIndexOf(".")
  if(idx < 0) throw new Error("normalize link not have file extension")
  let ext = src.substring(idx)
  if(src.endsWith(ext + ext))
    return src.substring(0, idx)
  return src
}
function nhentaiImg(){
	let $button = document.getElementById("download")
	let $img = document.querySelector("#thumbnail-container img");

	if(!$button || !$img || $img.src.indexOf("data") == 0){
    	setTimeout(todo, 2000)
    	return
	}

	let pages = Array.prototype.filter.call(document.querySelectorAll("section#tags>div"), (div) => div.textContent.indexOf("Pages") > 0)[0].children[0].textContent.trim()

	$button.classList.remove("btn-disabled");
	let src = normalize($img.src)
	src = src.replace(/t\d\./,"i1.")
  if(src.endsWith(".webp.webp")) src = src.sub

  let $wget = $("<a class='btn btn-secondary'>Wget Link</a>")
  $wget.onclick = () => { navigator.clipboard.writeText(src.replace("1t", `{1..${pages}}`))}
  $button.parentElement.appendChild($wget)

  let $themall =  $("<a class='btn btn-secondary' href='" + src.replace("1t", `[1:${pages}]`) + "'>ThemAll Link</a>")
  //$themall.onclick = () => { navigator.clipboard.writeText(src.replace("1t", `[1:${pages}]`))}
  $button.parentElement.appendChild($themall)

}

function _3hentaiImg(){
	let $button = document.querySelector("#main-info a.btn")
	let $img = document.querySelector("#main-cover img");

	if(!$button || !$img || $img.src.indexOf("data") == 0){
    	setTimeout(todo, 2000)
    	return
	}

    	let src = normalize($img.src)
    	let pages = Array.prototype.filter.call(document.querySelectorAll("#main-info>div"), (div) => div.textContent.indexOf("Pages") > 0)[0].children[0].textContent.trim()
    	src = src.replace("cover", batch == "wget" ? `{1..${pages}}` : `[1:${pages}]`)

  let $wget = $("<a class='btn btn-secondary'>Wget Link</a>")
  $wget.onclick = () => { navigator.clipboard.writeText(src.replace("cover", `{1..${pages}}`))}
  $button.parentElement.appendChild($wget)

  let $themall =  $("<a class='btn btn-secondary' href='" + src.replace("cover", `[1:${pages}]`) + "'>ThemAll Link</a>")
  //$themall.onclick = () => { doClick("themall")}
  $button.parentElement.appendChild($themall)

}

function todo(){
  if(window.location.hostname.indexOf("nhentai") >= 0){
      nhentaiImg()
  } else if(window.location.hostname.indexOf("3hentai") >= 0){
      _3hentaiImg()
  }
}
todo();
