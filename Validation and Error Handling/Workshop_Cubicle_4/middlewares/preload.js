async function preloadCube(req, res, next) {
    req.data = req.data || {};

    const id = req.params.id;
    
    try {
        const cube = await req.storage.getById(id);
        if(cube){
            req.data.cube = cube;
        }
    } catch (err) {
        console.error('Database error:', err.message);
    }

    next();
}

module.exports = {
    preloadCube
}