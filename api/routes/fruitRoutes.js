const express = require("express");
const router = express.Router();

const authController = require("../../src/controllers/fruitController");

// Gets all fruits available in database
router.get('/', authController.show_all_fruits_get);

// Gets and returns one fruit matching id
router.get('/:idFruit', authController.show_specific_fruit_by_id_get);

// Gets and returns one fruit matching name
router.get('/:name', authController.show_specfic_fruit_by_name_get);

// Creates a new fruit in the database
router.post('/', authController.add_fruit_post);

// // Patch details about a fruit
// router.patch('/', authController.patch_fruit);

// Deletes fruit by Id number
router.delete('/:fruitId', authController.delete_fruit);




module.exports = router;