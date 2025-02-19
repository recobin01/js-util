// ==UserScript==
// @name        Image Link wget
// @namespace   Violentmonkey Scripts
// @match       https://e-hentai.org/g/3243997/8b49b95dc4/*
// @grant       none
// @version     1.0
// @include     https://nhentai.net/g/*
// @include     https://3hentai.net/d/*
// @author      -
// @description 2/19/2025, 3:08:21 PM
// @downloadURL https://raw.githubusercontent.com/recobin01/js-util/refs/heads/main/img-link-wget.js
// @updateURL https://raw.githubusercontent.com/recobin01/js-util/refs/heads/main/img-link-wget.js
// ==/UserScript==


function nhentaiImg(){
	let $button = document.getElementById("download")
	let $img = document.querySelector("#thumbnail-container img");

	if(!$button || !$img || $img.src.indexOf("data") == 0){
    	setTimeout(todo, 2000)
    	return
	}

	let pages = Array.prototype.filter.call(document.querySelectorAll("section#tags>div"), (div) => div.textContent.indexOf("Pages") > 0)[0].children[0].textContent.trim()

	$button.classList.remove("btn-disabled");
	let src = $img.src
	src = src.replace(/t\d\./,"i2.").replace("1t", `{1..${pages}}`)

	$button.onclick = () => { navigator.clipboard.writeText(src);}
}

function _3hentaiImg(){
	let $button = document.querySelector("#main-info a.btn")
	let $img = document.querySelector("#main-cover img");

	if(!$button || !$img || $img.src.indexOf("data") == 0){
    	setTimeout(todo, 2000)
    	return
	}
	let $newButton = document.createElement("a");
	$newButton.textContent = "Copy link"
	$newButton.className = "btn btn-primary"
	$button.parentElement.append($newButton)

	$newButton.onclick = (event) => {
    	let src = $img.src
    	let pages = Array.prototype.filter.call(document.querySelectorAll("#main-info>div"), (div) => div.textContent.indexOf("Pages") > 0)[0].children[0].textContent.trim()
    	let link = src.replace("cover", `{1..${pages}}`)
    	navigator.clipboard.writeText(link);
	}
}

function todo(){
  if(window.location.hostname.indexOf("nhentai") >= 0){
      nhentaiImg()
  } else if(window.location.hostname.indexOf("3hentai") >= 0){
      _3hentaiImg()
  }
}
todo();
