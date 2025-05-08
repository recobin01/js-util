// ==UserScript==
// @name        Image Link wget
// @namespace   Violentmonkey Scripts
// @grant       none
// @version     1.1
// @include     https://nhentai.net/g/*
// @include     https://3hentai.net/d/*
// @include     https://www.hentai.name/g/*
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
  if(src.endsWith("jpg" + ext))
     return src.substring(0, idx - 4) + ext
  return src
}
function nhentaiImg(){
	let $button = document.getElementById("download")
	let $img = document.querySelector("#thumbnail-container img");

	if(!$button || !$img || !$img.src || $img.src.indexOf("data") == 0){
    	setTimeout(todo, 2000)
    	return
	}

	let pages = Array.prototype.filter.call(document.querySelectorAll("section#tags>div"), (div) => div.textContent.indexOf("Pages") > 0)[0].children[0].textContent.trim()

	$button.classList.remove("btn-disabled");
	let src = normalize($img.src)
	src = src.replace(/t\d\./,"i1.")

  let $wget = $("<a class='btn btn-secondary'>Wget Link</a>")
  $wget.onclick = () => { navigator.clipboard.writeText(src.replace("1t", `{1..${pages}}`))}
  $button.parentElement.appendChild($wget)

  let $themall =  $("<a class='btn btn-secondary' href='" + src.replace("1t", `[1:${pages}]`) + "'>ThemAll [English]</a>")
  //$themall.onclick = () => { navigator.clipboard.writeText(src.replace("1t", `[1:${pages}]`))}
  $button.parentElement.appendChild($themall)

}

function _3hentaiImg(){
  let $button = document.querySelector("#main-info a.btn")
  let $img = document.querySelector("#main-cover img");

  if(!$button || !$img || !$img.src || $img.src.indexOf("data") == 0){
    	setTimeout(todo, 2000)
    	return
  }

  let src = normalize($img.src)
  let pages = Array.prototype.filter.call(document.querySelectorAll("#main-info>div"), (div) => div.textContent.indexOf("Pages") > 0)[0].children[0].textContent.trim()

  let $wget = $("<a class='btn btn-secondary'>Wget Link</a>")
  $wget.onclick = () => { navigator.clipboard.writeText(src.replace("cover", `{1..${pages}}`))}
  $button.parentElement.appendChild($wget)

  let $themall =  $("<a class='btn btn-secondary' href='" + src.replace("cover", `[1:${pages}]`) + "'>ThemAll [English]</a>")
  //$themall.onclick = () => { doClick("themall")}
  $button.parentElement.appendChild($themall)

}

function hentaiNameImg(){
	let $buttons = document.querySelector("div#info div.buttons");
	let $img = document.querySelector("div#cover a img");

	if(!$buttons || !$img || !$img.src || $img.src.indexOf("data") == 0){
    	setTimeout(todo, 2000)
    	return
	}

	let pages = Array.prototype.filter.call(document.querySelectorAll("div#info div"), (div) => div.textContent.indexOf("pages") > 0)[0].textContent
	pages = parseInt(pages)

	let src = normalize($img.src)

  let $wget = $("<a class='btn btn-secondary'>Wget Link</a>")
  $wget.onclick = () => { navigator.clipboard.writeText(src.replace("poster", `{1..${pages}}`))}
  $buttons.appendChild($wget)

  let $themall =  $("<a class='btn btn-secondary' href='" + src.replace("poster", `[1:${pages}]`) + "'>ThemAll [English] </a>")
  //$themall.onclick = () => { navigator.clipboard.writeText(src.replace("1t", `[1:${pages}]`))}
  $buttons.appendChild($themall)

}
function todo(){
  if(window.location.hostname.indexOf("nhentai") >= 0){
      nhentaiImg()
  } else if(window.location.hostname.indexOf("3hentai") >= 0){
      _3hentaiImg()
  } else if(window.location.hostname.indexOf("hentai.name") >= 0){
      hentaiNameImg()
  }
}
todo();
