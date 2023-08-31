import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchCategory } from './api';
import getRefs from './get-refs';

let page = 0;
const refs = getRefs();
const options = {
    rootMargin: "300px",
};
const observer = new IntersectionObserver(handlerLoadScroll, options);
refs.form.addEventListener('submit', handlerValueForm);

function handlerValueForm(evt) {
    evt.preventDefault();
    page = 1;
    const inputValue = evt.currentTarget.elements.searchQuery.value.trim();
    if (inputValue === '') {
        return Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    };
    fetchCategory(inputValue,page).then(renderCard).catch(error => {
        console.log(error);
    });
    localStorage.setItem("input", inputValue);

};

function renderCard(res) {

    const markupCard = createMarkupCard(res.data);
    refs.gallery.innerHTML = markupCard;
    const quantityPhoto = res.data.totalHits;
    const quantityPage = Math.ceil(quantityPhoto / 40);
    checkZeroArray(quantityPage, quantityPhoto);
    createBigImg();
    smoothScrollingOnePage();

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
     </div>`}
    ).join('');

};

function checkZeroArray(quantityPage, quantityPhoto) {

    if (quantityPhoto !== 0) {
        Notify.success(`Hooray! We found ${quantityPhoto} images.`);
    };
    if (quantityPhoto === 0) {
        Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    } else if (quantityPhoto < 40 && quantityPage === 1) {
        setTimeout(() => {
            Notify.info("We're sorry, but you've reached the end of search results.")
        }, 4000);
    }
    else if (quantityPage > 1) {
        observer.observe(refs.guard)
    };

};

function createBigImg() {

    const lightbox = new SimpleLightbox('.gallery a',
        {
            nav: true,
            captionsData: 'alt',
            captionPosition: 'bottom',
            captionDelay: 250,
        });
    lightbox.refresh();

};

function smoothScrollingOnePage() {

    refs.gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: 90,
        behavior: 'smooth',
    });
};

function handlerLoadScroll(entries) {

    const getRecordInputValue = localStorage.getItem("input");
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            page += 1;
            fetchCategory(getRecordInputValue, page).then(renderNextCards).catch(error => {
                console.log(error);
            });
        }
    });

};

function renderNextCards(res) {

    const markupCard = createMarkupCard(res.data);
    refs.gallery.insertAdjacentHTML('beforeend', markupCard);
    const quantityPhoto = res.data.totalHits;
    const quantityPage = Math.ceil(quantityPhoto / 40);
    auditMaxQuantityPhoto(page, quantityPage)
    createBigImg();
    removeScrolling();
};

function auditMaxQuantityPhoto(pages, quantityPage) {

    if (quantityPage === pages) {
        Notify.info("We're sorry, but you've reached the end of search results.", {
            timeout: 5000,
        },)
    };

};

function removeScrolling() {

    if (page >= 13) {
        observer.unobserve(refs.guard)
    };

};
