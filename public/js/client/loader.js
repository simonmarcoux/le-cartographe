export function loadJSON(url) {
    return fetch(url)
        .then(r => r.json());
}

export function loadMap(name) {
    return loadJSON(`js/client/data/${name}.json`)
    // .then((data) => {
        // console.log(data, 'map infos are loaded, get all items');
    // })
}