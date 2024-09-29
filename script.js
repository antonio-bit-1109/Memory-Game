// eseguo lo script al caricamento degli elementi html
document.addEventListener("DOMContentLoaded", function () {
    // array contenente i due valori delle card da confrontare per verificare se sono la stessa card o no.
    const arrayTupla = [];
    const arrayTemp = [];
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
    addListenerToBoxes(arrayTupla, arrayTemp);
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
function addListenerToBoxes(arrayTupla, arrayTemp) {
    let allBoxes = document.querySelectorAll(".box");
    allBoxes.forEach((box, i) => {
        box.classList.add("pointer");

        // --- EVENTO CLICK DELLA CARD --- GESTISCI CORRETTAMENTE LA CRONOLOGIA DI EVENTI
        box.addEventListener("click", (e) => {
            let alt = mostraCard(e, box);

            if (arrayTupla.length >= 2) {
                console.log("sto pushando in temp");
                arrayTemp.push(alt);
            }

            if (arrayTupla.length < 2) {
                arrayTupla.push(alt);
                console.log("array tupla length inferiore a due. alt inserito in arrayTupla");
                console.log(arrayTupla);
                return;
            }

            if (arrayTupla.length === 2) {
                if (arrayTupla[0] === arrayTupla[1]) {
                    console.log("match trovato!");
                    resetArray(arrayTupla, arrayTemp);
                    return;
                }

                if (arrayTupla[0] !== arrayTupla[1]) {
                    // console.log("match trovato!");
                    // reset(arrayTupla);
                    resetCards(arrayTupla);
                    resetArray(arrayTupla, arrayTemp);
                    return;
                }
            }
        });
    });
}

function mostraCard(e, box) {
    box.classList.add("flip");

    let image = e.currentTarget.querySelector("img");
    if (image) {
        image.classList.remove("invisible");
        // console.log(image.alt);
        return image.alt;
    }
}

function resetArray(arrayTupla, arrayTemp) {
    arrayTupla.splice(0, arrayTupla.length);
    console.log(arrayTupla);

    if (arrayTemp.length === 1) {
        console.log("sposto alt in array temp dentro arraytupla");
        arrayTupla.push(...arrayTemp);
    }
    console.log(arrayTupla);
    console.log(arrayTemp);
}

// trovare elementi dom img che poosseggono il valore di alt specificato
// all img trovata ridare la classe invisible
// trovare il suo box parent e rimuovere l animazione flip
function resetCards(arrayTupla) {
    let imgDomElem1 = document.querySelectorAll(`[alt='${arrayTupla[0]}']`);
    let imgDomElem2 = document.querySelectorAll(`[alt='${arrayTupla[1]}']`);

    imgDomElem1.forEach((img) => {
        let card = img.closest(".box"); // Trova il genitore .box
        if (card && card.classList.contains("flip")) {
            // Verifica se il genitore ha la classe flip
            card.classList.remove("flip"); // Rimuovi la classe flip
            let childImg = card.querySelector(`[alt='${arrayTupla[0]}']`);
            if (childImg) {
                childImg.classList.add("invisible"); // Rendi invisibile l'immagine
            }
        }
    });

    imgDomElem2.forEach((img) => {
        let card = img.closest(".box"); // Trova il genitore .box
        if (card && card.classList.contains("flip")) {
            // Verifica se il genitore ha la classe flip
            card.classList.remove("flip"); // Rimuovi la classe flip
            let childImg = card.querySelector(`[alt='${arrayTupla[1]}']`);
            if (childImg) {
                childImg.classList.add("invisible"); // Rendi invisibile l'immagine
            }
        }
    });
}
