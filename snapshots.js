const PercyScript = require('@percy/script');

PercyScript.run(async (page, percySnapshot) => {
    /**
    |------------------------------------------------|
    | Comprobamos que el index de la API carga       |
    |------------------------------------------------|
    **/
    await page.goto('http://localhost:3000/api/');

    // Nos aseguramos de que la web a cargado
    await page.waitFor('.container');

    // Tomamos captura
    await percySnapshot('index');
});