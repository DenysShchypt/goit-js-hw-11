!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequired7c6=a);var o=a("bpxeT"),i=a("2TvXO"),c=a("h6c0i"),s=a("5IjG7"),l=a("b7ONl"),u=a("3vKGz"),f=0,d=(0,u.default)(),p=new IntersectionObserver((function(t){var n=localStorage.getItem("input");t.forEach((r=e(o)(e(i).mark((function t(r){return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r.isIntersecting){e.next=12;break}return f+=1,e.prev=2,e.next=5,(0,l.fetchCategory)(n,f);case 5:m(e.sent),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),console.log(e.t0);case 12:case"end":return e.stop()}}),t,null,[[2,9]])}))),function(e){return r.apply(this,arguments)}));var r}),{rootMargin:"300px"});function g(){return(g=e(o)(e(i).mark((function t(n){var r;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),f=1,""!==(r=n.currentTarget.elements.searchQuery.value.trim())){e.next=5;break}return e.abrupt("return",c.Notify.warning("Sorry, there are no images matching your search query. Please try again."));case 5:return e.prev=5,e.next=8,(0,l.fetchCategory)(r,f);case 8:y(e.sent),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(5),console.log(e.t0);case 15:localStorage.setItem("input",r);case 16:case"end":return e.stop()}}),t,null,[[5,12]])})))).apply(this,arguments)}function y(e){var t=h(e.data);d.gallery.innerHTML=t;var n=e.data.totalHits;!function(e,t){0!==t&&c.Notify.success("Hooray! We found ".concat(t," images."));0===t?c.Notify.warning("Sorry, there are no images matching your search query. Please try again."):t<40&&1===e?setTimeout((function(){c.Notify.info("We're sorry, but you've reached the end of search results.")}),4e3):e>1&&p.observe(d.guard)}(Math.ceil(n/40),n),v(),d.gallery.firstElementChild.getBoundingClientRect(),window.scrollBy({top:90,behavior:"smooth"})}function h(e){return e.hits.map((function(e){var t=e.webformatURL,n=e.largeImageURL,r=e.tags,a=e.likes,o=e.views,i=e.comments,c=e.downloads;return'<div class="photo-card">\n        <a class="gallery__link" href="'.concat(n,'">\n       <img src="').concat(t,'" alt="').concat(r,'" loading="lazy" class="gallery-img"/>\n       </a>\n       <div class="info">\n         <p class="info-item"><b>Likes ').concat(a,'</b></p>\n         <p class="info-item"><b>Views ').concat(o,'</b></p>\n         <p class="info-item"><b>Comments ').concat(i,'</b></p>\n         <p class="info-item"><b>Downloads ').concat(c,"</b></p>\n       </div>\n     </div>")})).join("")}function v(){new(e(s))(".gallery a",{nav:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}function m(e){var t=h(e.data);d.gallery.insertAdjacentHTML("beforeend",t);var n=e.data.totalHits,r=Math.ceil(n/40);!function(e,t){t===e&&c.Notify.info("We're sorry, but you've reached the end of search results.",{timeout:5e3})}(f,r),v(),f>=13&&p.unobserve(d.guard)}d.form.addEventListener("submit",(function(e){return g.apply(this,arguments)}))}();
//# sourceMappingURL=scroll.2967957b.js.map
