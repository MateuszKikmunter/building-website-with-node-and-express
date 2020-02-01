const express = require('express');

const router = express.Router();

module.exports = (param) => {

    const { speakerService } = param;

    router.get('/', async (req, res, next) => {

        try {
            const promises = [];
            promises.push(speakerService.getList());
            promises.push(speakerService.getAllArtwork());

            const results = await Promise.all(promises);
            return res.render('speakers', {
                page: 'All Speakers',
                speakersList: results[0],
                artwork: results[1]
            });
        } catch (error) {
            return next(error);
        }
    });

    router.get('/:name', (req, res, next) => {
        return res.render('speakers/detail', {
            page: req.params.name,
        });
    });

    return router;
};