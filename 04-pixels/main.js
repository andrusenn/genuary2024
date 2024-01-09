import $ from '../libs/core.js';

$.init(
    (o) => {
        // Pix sorting
        const brightStart = 250;
        const brightEnd = 0;
        $.loadImage('./p.png', (im) => {
            // Se recorrentodos los pixeles
            for (let x = 0; x < $.w; x++) {
                for (let y = 0; y < $.h; y++) {
                    // se obtiene el color de cada pixel
                    const pix = $.getPixelColor(im, x, y).rgb;

                    // se obtiene el el brillo en base al color
                    const br = brightness(...pix);

                    // Si el brillo es el indicado, comienza a procesar
                    if (br > brightStart) {
                        // Se guarda la posicion y de comienzo
                        let yy = y;

                        // Array almacena colores
                        let arr = [];

                        // Se almacena el brillo inicial
                        let brEach = br;

                        // Para todos los brillos > a y < a
                        // recorre columna yy y almacena los colores en un array
                        // Si el brillo e mayor al indicado, sale del loop
                        while (brEach > brightEnd) {
                            // Se obtiene el color de pix
                            const npix = $.getPixelColor(im, x, yy).rgb;

                            // se asigna el siguiente brillo
                            brEach = brightness(...npix);

                            // se almacena el color
                            arr.push(npix);

                            // Sale si yy sale del alto
                            if (yy > $.h) break;

                            // Incrementa yy
                            yy++;
                        }
                        // Ordena por brillo
                        arr.sort((a, b) => {
                            return brightness(...a) - brightness(...b);
                        });

                        // Asigna los colores re-ordenados
                        arr.forEach((e, i) => {
                            // e = [r,g,b]
                            $.setPixelColor(im, x, y + i, ...e);
                        });

                        // salta la columna procesada
                        y = yy;
                    }
                }
            }
            // IMprime
            $.image(im, 0, 0);
        });
    },
    {
        w: 1200,
        h: 1200,
        rf: false,
    },
);
//$.animate((o) => {});
function brightness(...c) {
    return Number.parseInt((c[0] + c[1] + c[2]) / 3);
}
