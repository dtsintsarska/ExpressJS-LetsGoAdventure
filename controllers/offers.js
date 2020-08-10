const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        //const length = req.query.length ? parseInt(req.query.length) : 20
        models.Offer.find().lean()
            .then((offers) => res.send(offers))
            .catch(next);
    },
    getOne: (req, res, next) => {
        const id = req.params.id;

        models.Offer.findById({
                _id: id
            }).lean()
            .then((offer) => {
                res.send(offer)
            })
            .catch(next)

    },

    search: (req, res, next) => {

        let category = req.params.category
        console.log(req.params)

        models.Offer.find({
                "category": category
            }).lean()
            .then((result) => {
                res.send(result)
            })
            .catch(next)

    },

    searchInput: (req, res, next) => {
        let regex = req.params.regex

        models.Offer.find({
                "destination": {
                    $regex: `${regex}`,
                    $options: "i"
                }
            }).lean()
            .then((result) => {
                res.send(result)
            })
            .catch(next)
    },

    post: (req, res, next) => {
        const {
            description,
            destination,
            date,
            guide,
            country,
            image,
            category,
            price,
            days,
            level,
            seats,
            galery
        } = req.body;


        models.Offer.create({
                description,
                destination,
                date,
                guide,
                country,
                image,
                category,
                price,
                days,
                level,
                seats,
                galery,
            })
            .then((createdOffer) => {
                res.send(createdOffer);
            })
            .catch(next);
    },

    enroll: async (req, res, next) => {
        let adventureId = req.params.id;
        let {
            firstName,
            lastName,
            phone,
            email,
            id,
            username
        } = req.body

        try {
            await models.Offer.findByIdAndUpdate(adventureId, {
                $addToSet: {
                    participants: [{
                        firstName,
                        lastName,
                        phone,
                        email,
                        id
                    }]
                }
            })
            await models.User.findByIdAndUpdate(id, {
                $addToSet: {
                    participations: [adventureId]
                }
            })

            res.send("Ready")
        } catch {
            next()
        }
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const {
            description
        } = req.body;
        models.Offer.updateOne({
                _id: id
            }, {
                description
            })
            .then((updatedOffer) => res.send(updatedOffer))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Offer.deleteOne({
                _id: id
            })
            .then((removedOffer) => res.send(removedOffer))
            .catch(next)
    },

    comment: async (req, res, next) => {
        let adventureId = req.params.id;
        let {
            comment,
            username,
            author
        } = req.body

        try {
            await models.Offer.findByIdAndUpdate(adventureId, {
                $addToSet: {
                    comments: [{
                        comment,
                        author,
                        username
                    }]
                }
            })
            res.send("Ready")
        } catch {
            next()
        }
    }
};