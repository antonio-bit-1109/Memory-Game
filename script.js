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
            let id = mostraCard(e, box, arrayTupla);

            if (arrayTupla.length >= 2 && arrayTemp.length === 0) {
                arrayTemp.push(id);
            }

            if (arrayTupla.length < 2) {
                arrayTupla.push(id);
                console.log("array tupla length inferiore a due");
                console.log(arrayTupla);
                return;
            }

            if (arrayTupla.length === 2 && arrayTupla[0] === arrayTupla[1]) {
                // trovate uguali, non faccio niente
                console.log("due card uguali, bravo!");
                // resetTupla(arrayTupla);
                return;
            }

            if (arrayTupla.length === 2 && arrayTupla[0] !== arrayTupla[1]) {
                console.log("girate due ma non ciò preso");

                // resetta le due card.
                // Trova gli elementi del DOM a partire dal loro alt.
                let imgDomElem1 = document.querySelector(`[alt='${arrayTupla[0]}']`);
                let imgDomElem2 = document.querySelector(`[alt='${arrayTupla[1]}']`);

                console.log(imgDomElem1);
                console.log(imgDomElem2);

                console.log(arrayTupla[0]);
                console.log(arrayTupla[1]);

                if (imgDomElem1 && imgDomElem2) {
                    imgDomElem1.classList.add("invisible");
                    imgDomElem2.classList.add("invisible");

                    let parentCard1 = imgDomElem1.closest(".box");
                    let parentCard2 = imgDomElem2.closest(".box");

                    parentCard1.classList.remove("flip");
                    parentCard2.classList.remove("flip");
                    resetTupla(arrayTupla, arrayTemp);
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

function resetTupla(arrayTupla, arrayTemp) {
    arrayTupla.length = 0;
    console.log(arrayTupla);

    if (arrayTemp.length > 0) {
        arrayTupla.push(...arrayTemp);
        console.log(arrayTupla);
    }
    arrayTemp.length = 0;
}
