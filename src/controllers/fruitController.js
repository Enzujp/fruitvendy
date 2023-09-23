const mongoose = require("mongoose");
const Fruit = require("../models/fruit");



module.exports.show_all_fruits_get = (req, res) => {
    Fruit.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            fruits: docs.map(doc => {
                return {
                    genus: doc.genus,
                    name: doc.name,
                    fruitId: doc.fruitId,
                    family: doc.family,
                    order: doc.order,
                    nutritions: doc.nutritions
                }
            })
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
    const query = req.body.fruitId;
    Fruit.findOne({fruitId: query})
    .exec()
    .then(fruit => {
        console.log(fruit)
        res.status(200).json({
            fruit
        })
    })                  
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

module.exports.show_specific_fruit_by_name_get = (req, res) => {
    const query = req.params.name;
    Fruit.findOne({ name: query })
    .select(" fruitId name genus order family nutritions ")
    .exec()
    .then(fruit => {
        console.log(fruit);
        res.status(200).json({
            fruitDetails: {
                name: fruit.name,
                genus: fruit.genus
            }
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
    const id = req.params.fruitId;
    Fruit.deleteOne({ fruitId: id })
    .select(" fruitId name genus order family nutritions ")
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


module.exports.delete_fruit_by_name = (req, res) => { // reconfigure function to accept name or ID for deleting
    const name = req.params.name;
    Fruit.deleteOne({ name: name })
    .exec()
    .then(results => {
        res.status(200).json({
            message: "This fruit has been deleted successfully"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
}
