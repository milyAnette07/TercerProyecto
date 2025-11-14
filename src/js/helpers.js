const TIMEOUT_SEC = 5;
export const getJSON = async function (url) {
    try {
        console.log("URL", url);
        const fetchPro = fetch(url);
        console.log("fetchPro", fetchPro);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        console.log('Respuesta:', res); // enviar la consol la constante resp.
        const data = await res.json();// aqui convierte  la respuesta a jason, para ello se delcara una constante data y no olvidar usar el await

        console.log('Data:', data);  // enviar a la consola la constante data.
        // ❌ Valida si la respuesta fue exitosa
        if (!res.ok) {
            const message = data?.message || 'Unknown error';
            throw new Error(`${message} (${res.status})`);
        }
        return data;
    }
    catch (err) {
        throw err;
    }
};
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
