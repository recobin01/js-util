// ==UserScript==
// @name        Images Link
// @namespace   Violentmonkey Scripts
// @grant       none
// @version     1.1.0.3
// @include     https://nhentai.net/g/*
// @include     https://3hentai.net/d/*
// @include     https://nhentai.to/g/*
// @include     https://www.hentai.name/g/*
// @author      -
// @description 2/19/2025, 3:08:21 PM
// @downloadURL https://raw.githubusercontent.com/recobin01/js-util/refs/heads/main/img-link-wget.js
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

	let pages = Array.prototype.filter.call(document.querySelectorAll("section#tags>div"), (div) => div.textContent.indexOf("Pages") >= 0)[0].children[0].textContent.trim()

	$button.classList.remove("btn-disabled");
	let src = normalize($img.src)
	src = src.replace(/t\d\./,"i2.")

  let $themall =  $("<a class='btn btn-secondary' href='" + src.replace("1t", `[1:${pages}]`) + "'>[English]</a>")
  //$themall.onclick = () => { navigator.clipboard.writeText(src.replace("1t", `[1:${pages}]`))}
  $button.parentElement.appendChild($themall)

}
function nhentaiToImg(){
	let $button = document.getElementById("download")
	let $img = document.querySelector("#cover img");

	if(!$button || !$img || !$img.src || $img.src.indexOf("data") == 0){
    	setTimeout(todo, 2000)
    	return
	}

	let pages = Array.prototype.filter.call(document.querySelectorAll("section#tags>div"), (div) => div.textContent.indexOf("Pages") >= 0)[0].children[0].textContent.trim()

	//$button.classList.remove("btn-disabled");
	let src = normalize($img.src)
	//src = src.replace(/t\d\./,"i2.")

  let $themall =  $("<a class='btn btn-secondary' href='" + src.replace("1t", `[1:${pages}]`) + "'>[English]</a>")
  //$themall.onclick = () => { navigator.clipboard.writeText(src.replace("cover", `[1:${pages}]`))}
  $button.parentElement.appendChild($themall)

}



function _3hentaiImg(){
  let $img = document.querySelector("#main-info a.main-cover img");
  let $pages = Array.prototype.filter.call(document.querySelectorAll("#main-info div.tag-container"), (div) => div.textContent.indexOf("Pages") >= 0)[0]

  if(!$pages || !$img || !$img.src || $img.src.indexOf("data") == 0){
    console.log('wait pages', $pages, $img.src)
    	setTimeout(todo, 2000)
    	return
  }

  let src = normalize($img.src)
  let pages = $pages.children[0].textContent.trim()

 console.log(pages)
  let $themall =  $("<a class='btn btn-secondary' href='" + src.replace("cover", `[1:${pages}]`) + "'>[English]</a>")
  //$themall.onclick = () => { doClick("themall")}
  $pages.parentElement.appendChild($themall)

}
function hentaiNameImg(){
	let $buttons = document.querySelector("div#info div.buttons");
	let $img = document.querySelector("div#cover a img");

	if(!$buttons || !$img || !$img.src || $img.src.indexOf("data") == 0){
    	setTimeout(todo, 2000)
    	return
	}

	let pages = Array.prototype.filter.call(document.querySelectorAll("div#info div"), (div) => div.textContent.indexOf("pages") >= 0)[0].textContent
	pages = parseInt(pages)

	let src = normalize($img.src)

 
  let $themall =  $("<a class='btn btn-secondary' href='" + src.replace("poster", `[1:${pages}]`) + "'>[English]</a>")
  //$themall.onclick = () => { navigator.clipboard.writeText(src.replace("1t", `[1:${pages}]`))}
  $buttons.appendChild($themall)

}
function todo(){
  if(window.location.hostname.indexOf("nhentai.net") >= 0){
      nhentaiImg()
  } else if(window.location.hostname.indexOf("3hentai") >= 0){
      _3hentaiImg()
  } else if(window.location.hostname.indexOf("hentai.name") >= 0){
      hentaiNameImg()
  } else if(window.location.hostname.indexOf("nhentai.to") >= 0){
      nhentaiToImg()
  }
}
setTimeout(todo, 4000)
