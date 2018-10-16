export async function loadJSON(url) {
    try {
        const response = await fetch('https://lg2-api.fabrique2.net/v1/employees/full.json', {
            headers: {
                'Authorization': 'Bearer ' + 'KueDntt78Pikx3WoVh0ZdAogMCgvBBdKLSLFNqA1qZzIwDW6XZtjtS6y9dCrRBln',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        const json = await response.json();

        let list = json.data.map((r) => {
            r.name = (r.firstname + ' ' + r.lastname).toLowerCase();
            r.job = r.role.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            r.pathID = r.employee_desk_id;
            return r;
        });

        return list;

    } catch (err) {
        return {};
        console.log(err);
    }
}

export function loadMap(name) {

    
    console.log(name);
    return loadJSON(`js/client/data/${name}.json`)
    // .then((data) => {
        // console.log(data, 'map infos are loaded, get all items');
    // })
}