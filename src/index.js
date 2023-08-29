import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchCategory } from './api';
import getRefs from './get-refs';

let page = 1;
const refs = getRefs();
refs.form.addEventListener('submit', handlerValueForm);
refs.loadBtn.addEventListener('click', handlerBtnLoad)

function handlerValueForm(evt) {
    evt.preventDefault();
    page = 1
    const form = evt.currentTarget;
    const inputValue = form.elements.searchQuery.value.trim();
    if (inputValue === '') {
        return Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    }
    fetchCategory(inputValue, page).then(renderCard
    ).catch(error => {
        console.log(error);
    })
    localStorage.setItem("input", inputValue);
    
};

function renderCard(res) {

    refs.loadBtn.classList.replace('load-more', 'js-load-more')
    const markupCard = createMarkupCard(res.data);
    const numberElementsArray = res.data.hits.length
    refs.gallery.innerHTML = markupCard;
    zeroArray(numberElementsArray)
    createBigImg()
    scrollOnePage()

};

function createBigImg() {
    const lightbox = new SimpleLightbox('.gallery a',
    {nav: true,
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
    });
    lightbox.refresh()
    
};

function zeroArray(numberElementsArray) {

    if (numberElementsArray === 0) {
        Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        refs.loadBtn.classList.toggle('load-more')
    }else if(numberElementsArray < 40){
        refs.loadBtn.classList.toggle('load-more')
    }

};

function createMarkupCard(card) {

    return card.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
       <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-img"/>
       </a>
       <div class="info">
         <p class="info-item"><b>Likes ${likes}</b></p>
         <p class="info-item"><b>Views ${views}</b></p>
         <p class="info-item"><b>Comments ${comments}</b></p>
         <p class="info-item"><b>Downloads ${downloads}</b></p>
       </div>
     </div>`
    }).join('');

};

function handlerBtnLoad() {

    page += 1;
    const getRecordInputValue = localStorage.getItem("input");
    fetchCategory(getRecordInputValue, page).then(renderNextCards
    ).catch(error => {
        console.log(error);
    });

};

function renderNextCards(res) {

    const markupCard = createMarkupCard(res.data);
    const quantityPhoto = res.data.totalHits;
    const quantityPage =Math.floor(quantityPhoto/40)
    refs.gallery.insertAdjacentHTML('beforeend', markupCard);
    Notify.success(`Hooray! We found ${quantityPhoto} images.`)
    auditMaxQuantityPhoto(page,quantityPage)
    createBigImg()
    scrollSecondPage()

};

function auditMaxQuantityPhoto(pages,quantityPage) {

    if (quantityPage < pages) {
        refs.loadBtn.classList.replace('js-load-more', 'load-more')
        Notify.info("We're sorry, but you've reached the end of search results.", {
            timeout: 100000000000000,
        },)};
};

function scrollOnePage() {
     refs.gallery.firstElementChild.getBoundingClientRect();
  
    window.scrollBy({
      top: 50,
      behavior: 'smooth',
    });
  };

  function scrollSecondPage() {
    const {height}=refs.gallery.firstElementChild.getBoundingClientRect();
 
   window.scrollBy({
     top: height*2,
     behavior: 'smooth',
   });
 };