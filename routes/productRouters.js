const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//show tất cả sản phẩm
//http://localhost:3000/product/allsp
router.get('/allsp', productController.getAllProducts);

//lấy sản phẩm theo gioi_tinh nam
//http://localhost:3000/product/gioitinhnam
router.get('/gioitinhnam', productController.getProductsByGioiTinhNam);

//lấy sản phẩm theo gioi_tinh Nữ
//http://localhost:3000/product/gioitinhnu
router.get('/gioitinhnu', productController.getProductsByGioiTinhNu);

//lấy sản phẩm theo gioi_tinh Đồng hồ đôi
//http://localhost:3000/product/gioitinhdoihon
router.get('/gioitinhdoihon', productController.getProductsByGioiTinhDoiHon);

//lấy sản phẩm theo gioi_tinh Unisex
// http://localhost:3000/product/gioitinhunisex
router.get('/gioitinhunisex', productController.getProductsByGioiTinhUnisex);

//show sản phẩm mới theo ngày trong gioi_tinh nam
//http://localhost:3000/product/gioitinhnamnew
router.get('/gioitinhnamnew', productController.getProductsByGioiTinhNamNew);

//show sản phẩm mới theo ngày trong gioi_tinh nữ
//http://localhost:3000/product/gioitinhnunew
router.get('/gioitinhnunew', productController.getProductsByGioiTinhNuNew);

//show sản phẩm mới theo ngày trong gioi_tinh unisex
//http://localhost:3000/product/gioitinhunisexnew
router.get('/gioitinhunisexnew', productController.getProductsByGioiTinhUnisexNew);

//show sản phẩm mới theo ngày trong gioi_tinh dong ho doi
//http://localhost:3000/product/gioitinhdoihonnew
router.get('/gioitinhdoihonnew', productController.getProductsByGioiTinhDoiHonNew);

//show sản phẩm có giá giảm từ 10000000 đến 20000000
//http://localhost:3000/product/giamgia
router.get('/giamgia', productController.getProductsByGiaGiam);

//show sản phẩm có giá dưới 2000000
//http://localhost:3000/product/giamgiaduoi
router.get('/giamgiaduoi', productController.getProductsByGiaDuoi2tr);

//show sản phẩm có giá tren 2000000
//http://localhost:3000/product/giamgiatren
router.get('/giamgiatren', productController.getProductsByGiaTren2tr);

//show sản phẩm có loai_may là Quartz (Máy pin - điện tử)
//http://localhost:3000/product/loaimayquartz
router.get('/loaimayquartz', productController.getProductsByLoaiMayQuartz);

//show sản phẩm có chat_lieu_day là dây da
//http://localhost:3000/product/chatlieudayday
router.get('/chatlieudayday', productController.getProductsByChatLieuDayDa);

//show san pham co mat_kinh la kinh sapphire
//http://localhost:3000/product/matkinhkinhsapphire
router.get('/matkinhkinhsapphire', productController.getProductsByMatKinhSapphire);

//show san pham co mau_mat là trắng
//http://localhost:3000/product/maumatmautrang
router.get('/maumatmautrang', productController.getProductsByMauMatTrang);

//show sản phẩm có phong_cach Sang trọng
//http://localhost:3000/product/phongcachsangtrong
router.get('/phongcachsangtrong', productController.getProductsByPhongCachSangTrong);







//show sản phẩm theo danh mục
//http://localhost:3000/product/cate/:id
router.get('/cate/:id', productController.getProductsByCate);

//http://localhost:3000/product/detailsp
router.get('/detailsp/:id', productController.getProductById);


//http://localhost:3000/product/addsp
router.post('/addsp', productController.addProduct);

//http://localhost:3000/product/deletesp
router.delete('/deletesp/:id', productController.deleteProduct);

//http://localhost:3000/product/updatesp
router.put('/updatesp/:id', productController.updateProduct);

//phân trang sản phẩm
//http://localhost:3000/product/page?page=1&limit=1
router.get('/page', productController.getProductsByPage);

//api tìm kiếm sản phẩm bằng cách nhập tên sản phẩm và tên danh mục 
//http://localhost:3000/product/search
router.post('/search', productController.searchProducts);

module.exports = router;