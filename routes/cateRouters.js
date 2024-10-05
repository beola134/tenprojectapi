const express = require('express');
const router = express.Router();
const cateController = require('../controllers/cateController');

//http://localhost:3000/cate/allcate
router.get('/allcate', cateController.getAllCates);

//http://localhost:3000/cate/addcate
router.post('/addcate', cateController.addCate);

//http://localhost:3000/cate/deletecate
router.delete('/deletecate/:id', cateController.deleteCate);

//http://localhost:3000/cate/updatecate
router.put('/updatecate/:id', cateController.updateCate);


module.exports = router;