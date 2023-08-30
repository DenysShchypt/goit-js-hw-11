import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchCategory } from './api';
import getRefs from './get-refs';

let page = 0;
const refs = getRefs();
refs.form.addEventListener('submit', handlerValueForm);
refs.loadBtn.addEventListener('click', handlerBtnLoad)

async function handlerValueForm(evt) {
    evt.preventDefault();
    page = 1;
    const inputValue = evt.currentTarget.elements.searchQuery.value.trim();
    if (inputValue === '') {
        return Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    };
    try {
        const cards = await fetchCategory(inputValue, page);
        renderCard(cards);
    } catch (error) {
        console.log(error);
    };
    localStorage.setItem("input", inputValue);

};

function renderCard(res) {

    const markupCard = createMarkupCard(res.data);
    const quantityPhoto = res.data.totalHits;
    const quantityPage = Math.ceil(quantityPhoto / 40)
    refs.gallery.innerHTML = markupCard;
    checkZeroArray(quantityPhoto, quantityPage)
    createBigImg()
    scrollOnePage()

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

function checkZeroArray(quantityPhoto, quantityPage) {

    if (quantityPhoto !== 0) {
        Notify.success(`Hooray! We found ${quantityPhoto} images.`);
        refs.loadBtn.classList.replace('load-more', 'js-load-more');
    };

    if (quantityPhoto === 0) {
        Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    } else if (quantityPhoto < 40 && quantityPage === 1) {
        refs.loadBtn.classList.toggle('load-more');
        setTimeout(() => {
            Notify.info("We're sorry, but you've reached the end of search results.")
        }, 4000);
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

function scrollOnePage() {

    refs.gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: 90,
        behavior: 'smooth',
    });

};

async function handlerBtnLoad() {

    page += 1;
    const getRecordInputValue = localStorage.getItem("input");
    // try {
    //     const cards = await fetchCategory(getRecordInputValue, page);
    //     renderNextCards(cards);
    // } catch (error) {
    //     console.log(error);
    // };
    fetchCategory(getRecordInputValue, page).then(renderNextCards).catch(error => {
        console.log(error);
    })
};

function renderNextCards(res) {

    const markupCard = createMarkupCard(res.data);
    const quantityPhoto = res.data.totalHits;
    const quantityPage = Math.floor(quantityPhoto / 40);
    refs.gallery.insertAdjacentHTML('beforeend', markupCard);
    Notify.success(`Hooray! We found ${quantityPhoto} images.`);
    auditMaxQuantityPhoto(page, quantityPage);
    createBigImg();
    scrollSecondPage();

};

function auditMaxQuantityPhoto(pages, quantityPage) {

    if (quantityPage < pages) {
        refs.loadBtn.classList.replace('js-load-more', 'load-more');
        setTimeout(() => {
            Notify.info("We're sorry, but you've reached the end of search results.", {
                timeout: 5000,
            },)
        }, 3000)
    };

};



function scrollSecondPage() {

    refs.gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: 590,
        behavior: 'smooth',
    });
};