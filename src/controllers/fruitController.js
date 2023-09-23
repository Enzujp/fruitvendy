const mongoose = require("mongoose");
const Fruit = require("../models/fruit");



module.exports.show_all_fruits_get = (req, res) => {
    Fruit.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            docs
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
}

module.exports.add_fruit_post = (req, res) => {
    Fruit.findOne({name: req.body.name})
    .exec()
    .then(savedFruit => {
        if (savedFruit) {
           res.status(500).json({
            message: "This fruit already exists"
           })
        }
        const fruit = new Fruit({
            _id: new mongoose.Types.ObjectId(),
            genus: req.body.genus,
            name: req.body.name,
            fruitId: req.body.fruitId,
            family: req.body.family,
            order: req.body.order,
            nutritions: req.body.nutritions
        });
        fruit.save()
        .then(doc => {
            console.log(doc);
            res.status(201).json({
                message: "This fruit was created successfully",
                fruitDetails: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
        
    })
    
}
module.exports.show_specific_fruit_by_id_get = (req, res) => {
    Fruit.find( {idFruit: req.body.fruitId} )
    .exec()
    .then(fruit => {
        if (fruit) {
            res.status(200).json({
                fruit
            })
        } else {
            return res.status(404).json({
                message: "Sorry, We don't have any fruits matching this specifications in our inventory"
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

module.exports.show_specific_fruit_by_name_get = (req, res) => {
    Fruit.find({name: req.params.name })
    .exec()
    .then(fruit => {
        res.status(200).json({
            fruit
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
}

// Delete based on name and ID
module.exports.delete_fruit_by_id = (req, res) => { // reconfigure function to accept name or ID for deleting
    const id = req.params.idFruit;
    Fruit.remove({ _id: id })
    .exec()
    .then(results => {
        res.status(200).json({
            message: "This fruit has been deleted successful"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
}