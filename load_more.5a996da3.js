!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return o[e]=a,t.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},t.parcelRequired7c6=a);var r=a("h6c0i"),i=a("5IjG7"),l=a("b7ONl"),s=a("3vKGz"),c=0,d=(0,s.default)();function f(e){var t=u(e.data),o=e.data.totalHits,n=Math.ceil(o/40);d.gallery.innerHTML=t,function(e,t){0!==e&&(r.Notify.success("Hooray! We found ".concat(e," images.")),d.loadBtn.classList.replace("load-more","js-load-more"));0===e?(r.Notify.warning("Sorry, there are no images matching your search query. Please try again."),d.loadBtn.classList.replace("js-load-more","load-more")):e<40&&1===t&&(d.loadBtn.classList.toggle("load-more"),setTimeout((function(){r.Notify.info("We're sorry, but you've reached the end of search results.")}),4e3))}(o,n),g(),d.gallery.firstElementChild.getBoundingClientRect(),window.scrollBy({top:90,behavior:"smooth"})}function u(e){return e.hits.map((function(e){var t=e.webformatURL,o=e.largeImageURL,n=e.tags,a=e.likes,r=e.views,i=e.comments,l=e.downloads;return'<div class="photo-card">\n        <a class="gallery__link" href="'.concat(o,'">\n       <img src="').concat(t,'" alt="').concat(n,'" loading="lazy" class="gallery-img"/>\n       </a>\n       <div class="info">\n         <p class="info-item"><b>Likes ').concat(a,'</b></p>\n         <p class="info-item"><b>Views ').concat(r,'</b></p>\n         <p class="info-item"><b>Comments ').concat(i,'</b></p>\n         <p class="info-item"><b>Downloads ').concat(l,"</b></p>\n       </div>\n     </div>")})).join("")}function g(){new(e(i))(".gallery a",{nav:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}function m(e){var t=u(e.data),o=e.data.totalHits,n=Math.floor(o/40);d.gallery.insertAdjacentHTML("beforeend",t),r.Notify.success("Hooray! We found ".concat(o," images.")),function(e,t){t<e&&(d.loadBtn.classList.replace("js-load-more","load-more"),setTimeout((function(){r.Notify.info("We're sorry, but you've reached the end of search results.",{timeout:5e3})}),3e3))}(c,n),g(),d.gallery.firstElementChild.getBoundingClientRect(),window.scrollBy({top:590,behavior:"smooth"})}d.form.addEventListener("submit",(function(e){e.preventDefault(),c=1;var t=e.currentTarget.elements.searchQuery.value.trim();if(""===t)return r.Notify.warning("Sorry, there are no images matching your search query. Please try again.");(0,l.fetchCategory)(t,c).then(f).catch((function(e){console.log(e)})),localStorage.setItem("input",t)})),d.loadBtn.addEventListener("click",(function(e){c+=1;var t=localStorage.getItem("input");(0,l.fetchCategory)(t,c).then(m).catch((function(e){console.log(e)}))}))}();
//# sourceMappingURL=load_more.5a996da3.js.map
