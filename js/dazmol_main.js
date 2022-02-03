// ? kategoriya js coding
let kategBtn = document.querySelector('.c-kategoriya-btn');
let kategUl = document.querySelector('.c-kategoriya-list');
let elForm = document.querySelector('.c-form')
let elInputSearch = document.querySelector('.c-input-search')
let btnMore = document.querySelector('.c-ysho_btn')
let btnClose = document.querySelector('.c-close_btn')
let btnDiv = document.querySelector('.c-btn_div')


// ! new coding
let modalKateg = document.querySelector('#c-kateg-modal');
let cModalClose = document.querySelector('.c-close-kateg-modal');
kategBtn.addEventListener('click', () => {
    modalKateg.style.display = 'block'
})
cModalClose.addEventListener('click', () =>{
    modalKateg.style.display = 'none'
})
// ! new coding end
// ? kategoriya js codin end

let generalBox = document.querySelector(".z__kolonkis")
let karzinka = []
let cound_system = 0;

btnDiv.classList.add('work')

Abdu(btnDiv.classList.contains('work') ? dazmoldates : !btnDiv.classList.contains('work') ? dazmol : 'Xatolik', generalBox)

btnMore.addEventListener('click', () => {
    btnDiv.classList.remove('work')
    Abdu(btnDiv.classList.contains('work') ? dazmoldates : !btnDiv.classList.contains('work') ? dazmol : 'Xatolik', generalBox)
    if(btnDiv.classList.contains('work')) {
        btnClose.style.display = 'none'
        btnMore.style.display = 'block'
       }else {
        btnClose.style.display = 'block'
        btnMore.style.display = 'none'
       }
})
btnClose.addEventListener('click', () => {
    btnDiv.classList.add('work')
    Abdu(btnDiv.classList.contains('work') ? dazmoldates : !btnDiv.classList.contains('work') ? dazmol : 'Xatolik', generalBox)
    if(btnDiv.classList.contains('work')) {
        btnClose.style.display = 'none'
        btnMore.style.display = 'block'
       }else {
        btnClose.style.display = 'block'
        btnMore.style.display = 'none'
       }
})
if(btnDiv.classList.contains('work')) {
 btnClose.style.display = 'none'
 btnMore.style.display = 'block'
}else {
 btnClose.style.display = 'block'
 btnMore.style.display = 'none'
}

fetch("https://texno-asmo-1.herokuapp.com/product").then(res => res.json()).then(data => {
    // generalBox.innerHTML = null;
    console.log(data);
    data.map(elem => {
        let objectBox = document.createElement("li")
        let div = document.createElement("div")
        let img = document.createElement("img")
        let h5 = document.createElement("h5")
        let p = document.createElement("p")
        let icon = document.createElement("i")
        let modal = document.querySelector(".modal")
        let buttonClose = document.querySelector(".modal__close")

        //! button modal screen
        let buttonModalScreen = document.createElement("button")
        buttonModalScreen.dataset.uuid = elem.product_id
        buttonModalScreen.addEventListener("click", (elem) => {
            modal.classList.add("show")
            modal.classList.remove("hide")

            let id = elem.target.dataset.uuid
            let finddata = data.find(elem => elem.product_id == id)

            let modalImg = document.querySelector(".modal__img")
            let modalTitle = document.querySelector(".modal__title")
            let modalPrise = document.querySelector(".modal__prise")
            let modalText = document.querySelector(".modal__text")

            modalImg.src = finddata.product_img
            modalTitle.textContent = finddata.product_title
            modalPrise.textContent = finddata.product_prise
            modalText.textContent = finddata.product_description
        })
        // button hide
        buttonClose.addEventListener("click", () => {
            modal.classList.add("hide")
            modal.classList.remove("show")
        })
        //! button modal screen

        // todoo in korzinka render
        let buttonKorzinka = document.createElement("button")
        buttonKorzinka.dataset.uuid = elem.product_id

        buttonKorzinka.addEventListener("click", (button) => {

            if (!karzinka.includes(elem)) {
                // element karzinkada yoq
                let cartModal = document.querySelector(".c-modal-content")
                let cartModalDiv = document.createElement("div")
                let cartModalImg = document.createElement("img")
                let cartModalH5 = document.createElement("h5")
                let cartModalP = document.createElement("p")
                let cartModalAbout = document.createElement("div")
                let cartModalScreen = document.createElement("button")
                let deletebtnModal = document.createElement("button")
                let cartModalEkrement = document.createElement("button")
                let cartModalSpan = document.createElement("span")
                let cartModalDekrement = document.createElement("button")
                let counter = document.createElement("div")
                let countModal = 1

                cartModalImg.setAttribute("src", elem.product_img)
                cartModalH5.textContent = elem.product_title
                cartModalP.textContent = elem.product_prise
                cartModalEkrement.textContent = ("+")
                cartModalSpan.textContent = countModal
                cartModalDekrement.textContent = ("-")

                cartModalAbout.classList.add("cart--about")
                cartModal.classList.add("cart--modal")
                cartModalDiv.classList.add("cart--box")
                cartModalH5.classList.add("cart--title")
                cartModalP.classList.add("cart--prise")
                cartModalScreen.classList.add("bx", "bx-fullscreen", "button__modal")
                deletebtnModal.classList.add("bx", "bxs-basket", "c-cart", "c-profil-btn")
                cartModalEkrement.classList.add("cartModalEkrement")
                cartModalDekrement.classList.add("cartModalEkrement")
                cartModalDekrement.setAttribute('disabled', 'disabled')
                counter.classList.add("counter")

                buttonKorzinka.classList.add("bx", "bx-check", "bx-xl")
                buttonKorzinka.removeChild(icon)

                cartModal.appendChild(cartModalDiv)
                cartModalDiv.appendChild(cartModalImg)
                cartModalDiv.appendChild(cartModalH5)
                cartModalDiv.appendChild(cartModalAbout)
                cartModalAbout.appendChild(cartModalP)
                cartModalAbout.appendChild(counter)
                counter.appendChild(cartModalDekrement)
                counter.appendChild(cartModalSpan)
                counter.appendChild(cartModalEkrement)
                cartModalAbout.appendChild(deletebtnModal)
                // todoo in korzinka delete
                deletebtnModal.addEventListener("click", () => {
                    cartModal.removeChild(cartModalDiv)

                    buttonKorzinka.classList.remove("bx", "bx-check", "bx-xl")
                    buttonKorzinka.appendChild(icon)
                })



                // todoo in korzinka delete
                //  ?  prise function
                let totalPrice = elem.product_prise

                function priceTotal() {
                    let total = totalPrice * countModal
                    cartModalP.textContent = total
                }
                // ? prise function
                //! counter button
                cartModalEkrement.addEventListener("click", () => {
                    countModal += 1
                    cartModalSpan.textContent = countModal
                    if (cartModalSpan.textContent > 1) {
                        cartModalDekrement.disabled = false
                    }
                    priceTotal()
                })
                cartModalDekrement.addEventListener("click", () => {
                    countModal -= 1
                    cartModalSpan.textContent = countModal
                    if (cartModalSpan.textContent == 1) {
                        cartModalDekrement.disabled = true
                    }
                    priceTotal()
                })

                buttonKorzinka.classList.add("bx", "bx-check", "bx-xl")
                buttonKorzinka.removeChild(icon)
                //! counter button


                karzinka.push(elem)
            }
        })

        // todoo in korzinka render


        img.setAttribute("src", elem.product_img)
        h5.textContent = elem.product_title
        p.textContent = elem.product_prise

        buttonKorzinka.classList.add("c-cart", "c-profil-btn", "buttonKorzinka-active")
        buttonModalScreen.classList.add("bx", "bx-fullscreen")
        icon.classList.add("bx", "bxs-cart")
        div.classList.add("object--about")
        h5.classList.add("object--title")
        p.classList.add("object--prise")
        objectBox.classList.add("object--box")
        buttonModalScreen.classList.add("button__modal")

        generalBox.appendChild(objectBox)
        objectBox.dataset.aos = "zoom-in"
        objectBox.appendChild(img)
        objectBox.appendChild(h5)
        objectBox.appendChild(div)
        div.appendChild(buttonModalScreen)
        div.appendChild(p)
        div.appendChild(buttonKorzinka)
        buttonKorzinka.appendChild(icon)
    })
})

elForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let elInputValue = elInputSearch.value.trim();
    const regex = new RegExp(elInputValue, 'gi')
    const filteredFilms = dazmol.filter((kolones) => kolones.title.match(regex));

    let foundFilms = [];

    foundFilms = filteredFilms;

    elInputSearch.value = ''

    Abdu(foundFilms, generalBox);
})
//  ! lodaer coding
// window.addEventListener('load', e => {
//     let pageLoader = document.querySelector('.c-page-loader').style.display = 'none';
// })
// ! lodaer coding

