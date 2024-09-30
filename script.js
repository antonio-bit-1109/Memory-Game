// eseguo lo script al caricamento degli elementi html
document.addEventListener("DOMContentLoaded", function () {
    // array contenente i due valori delle card da confrontare per verificare se sono la stessa card o no.
    const arrayTupla = [];
    const arrayTemp = [];
    const arrDomElem = [];
    //creo un array statico di percorsi immagine
    const arrImg = [
        "imgs/gif1.webp",
        "imgs/gif2.webp",
        "imgs/gif3.webp",
        "imgs/gif4.webp",
        "imgs/gif5.webp",
        "imgs/gif6.webp",
        "imgs/gif7.webp",
        "imgs/gif8.webp",
        "imgs/gif9.webp",
        "imgs/gif10.webp",
        "imgs/gif11.webp",
        "imgs/gif12.webp",
    ];

    // sequenza delle funzioni da chiamare.
    const imageArray = CreateArrayImgs(arrImg);
    const arrayMischiato = shuffleArray(imageArray);
    InsertImagesIntoBoxes(arrayMischiato);
    addListenerToBoxes(arrayTupla, arrayTemp, arrDomElem);
});

// creo un array di immagini
function CreateArrayImgs(arrImg) {
    const arr = [];
    arrImg.forEach((path, i) => {
        let imageElem1 = document.createElement("img");
        let imageElem2 = document.createElement("img");

        imageElem1.src = path;
        imageElem1.alt = `immagine${i}`;
        imageElem1.classList.add("imgStyle");
        imageElem1.classList.add("invisible");

        imageElem2.src = path;
        imageElem2.alt = `immagine${i}`;
        imageElem2.classList.add("imgStyle");
        imageElem2.classList.add("invisible");

        arr.push(imageElem1);
        arr.push(imageElem2);
    });
    return arr;
}

// prendo l'array e mischio gli elementi al suo interno
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// inserisco le immagini all'interno dei .box
function InsertImagesIntoBoxes(arrayImgs) {
    // const arrayMischiato = shuffleArray(arrayImgs);

    let allBoxes = document.querySelectorAll(".box");
    allBoxes.forEach((box, i) => {
        box.appendChild(arrayImgs[i]);
    });
}

// aggiungo gli event listener ai .box contenenti le immagini
function addListenerToBoxes(arrayTupla, arrayTemp, arrDomElem) {
    let allBoxes = document.querySelectorAll(".box");
    allBoxes.forEach((box, i) => {
        box.classList.add("pointer");

        // --- EVENTO CLICK DELLA CARD --- GESTISCI CORRETTAMENTE LA CRONOLOGIA DI EVENTI
        box.addEventListener("click", (e) => {
            DoStuff(e, box, arrayTupla, arrayTemp, arrDomElem);
        });
    });
}

function DoStuff(e, box, arrayTupla, arrayTemp, arrDomElem) {
    const card = flippaCard(e);

    if (card) {
        // pusho l'elemento html trovato in questo array degli elementi html
        arrDomElem.push(card);
        console.log(card);
        console.log(arrDomElem);
    }
    const alt = mostraImage(card);

    if (arrayTupla.length < 2) {
        arrayTupla.push(alt);
        console.log(arrayTupla);
    }

    if (arrayTupla.length === 2) {
        let id = controlloEsito(arrayTupla, arrDomElem);
        // id && controlloSeClassiTolte(arrDomElem, id);
    }
    // let alt = mostraCard(e, box);
    // if (arrayTupla.length >= 2) {
    //     console.log("sto pushando in temp");
    //     arrayTemp.push(alt);
    //     console.log(arrayTemp);
    // }
    // if (arrayTupla.length < 2) {
    //     arrayTupla.push(alt);
    //     console.log("array tupla length inferiore a due. alt inserito in arrayTupla");
    //     console.log(arrayTupla);
    //     return;
    // }
    // if (arrayTupla.length === 2) {
    //     if (arrayTupla[0] === arrayTupla[1]) {
    //         console.log("match trovato!");
    //         handleModal();
    //         resetArray(arrayTupla, arrayTemp);
    //         return;
    //     }
    //     if (arrayTupla[0] !== arrayTupla[1]) {
    //         // console.log("match trovato!");
    //         // reset(arrayTupla);
    //         resetCards(arrayTupla);
    //         resetArray(arrayTupla, arrayTemp);
    //         return;
    //     }
    // }
}

// function controlloSeClassiTolte(arrayDomElem, id) {
//     arrayDomElem.forEach((box) => {
//         if (!box.classList.contains("flip") && box.querySelector("img").classList.contains("invisible")) {
//             clearTimeout(id);
//         }
//     });
// }

function flippaCard(e) {
    const box = e.currentTarget;
    box.classList.add("flip");
    return box;
}

function mostraImage(card) {
    const image = card.querySelector("img");
    image ? image.classList.remove("invisible") : console.error("immagine da mostrare non trovata");

    if (!image.classList.contains("invisible")) {
        console.log("classe invisible tolta con successo");
    }

    return image.alt;
}

function controlloEsito(arrayTupla, arrDomElem) {
    const [first, second] = arrayTupla;
    if (first === second) {
        console.log("hai trovato le due card uguali.");
        resetArray(arrayTupla);
        return;
    } else {
        console.log("non hai trovato le due card uguali.");
        setTimeout(() => {
            resetCard(arrDomElem);
        }, 800);
        // return id;
    }
}

function resetArray(array) {
    array.length = 0;
}

function resetCard(arrDomElem) {
    arrDomElem.forEach((domElem) => {
        domElem.classList.remove("flip");
        const card = domElem.querySelector("img");
        card.classList.add("invisible");
    });
}
// function mostraCard(e, box) {
//     let image = e.currentTarget.querySelector("img");
//     console.log(image);
//     if (image) {
//         image.classList.remove("invisible");
//         box.classList.add("flip");
//         console.log(image.alt);
//         return image.alt;
//     }
// }

// function resetArray(arrayTupla, arrayTemp) {
//     // arrayTupla.splice(0, arrayTupla.length);
//     arrayTupla.length = 0;
//     console.log(arrayTupla);

//     if (arrayTemp.length === 1) {
//         console.log("sposto alt in array temp dentro arraytupla");
//         arrayTupla.push(...arrayTemp);
//     }
//     console.log(arrayTupla);
//     console.log(arrayTemp);
//     arrayTemp.length = 0;
// }

// trovare elementi dom img che poosseggono il valore di alt specificato
// all img trovata ridare la classe invisible
// trovare il suo box parent e rimuovere l animazione flip

// function resetCards(arrayTupla) {
//     let imgDomElem1 = document.querySelectorAll(`[alt='${arrayTupla[0]}']`);
//     let imgDomElem2 = document.querySelectorAll(`[alt='${arrayTupla[1]}']`);

//     imgDomElem1.forEach((img) => {
//         let box = img.closest(".box"); // Trova il genitore .box
//         if (box && box.classList.contains("flip")) {
//             // Verifica se il genitore ha la classe flip
//             box.classList.remove("flip"); // Rimuovi la classe flip
//             let childImg = box.querySelector(`[alt='${arrayTupla[0]}']`);
//             if (childImg) {
//                 childImg.classList.add("invisible"); // Rendi invisibile l'immagine
//             }
//         }
//     });

//     imgDomElem2.forEach((img) => {
//         let box = img.closest(".box"); // Trova il genitore .box
//         if (box && box.classList.contains("flip")) {
//             // Verifica se il genitore ha la classe flip
//             box.classList.remove("flip"); // Rimuovi la classe flip
//             let childImg = box.querySelector(`[alt='${arrayTupla[1]}']`);
//             if (childImg) {
//                 childImg.classList.add("invisible"); // Rendi invisibile l'immagine
//             }
//         }
//     });
// }

function handleModal() {
    let modal;
    if (document.getElementById("modal")) {
        null;
    } else {
        modal = document.createElement("div");
    }

    modal.id = "modal";
    showModal(modal);
    setTimeout(() => {
        unShowModal(modal);
    }, 1500);
}

function showModal(modal) {
    modal.classList.contains("modalStyle") ? null : modal.classList.add("modalStyle");
    modal.innerHTML === "WELL DONE!" ? null : (modal.innerHTML = "WELL DONE!");
    document.body.contains(modal) ? null : document.body.appendChild(modal);
}

function unShowModal(modal) {
    modal.classList.add("d-none");
}
