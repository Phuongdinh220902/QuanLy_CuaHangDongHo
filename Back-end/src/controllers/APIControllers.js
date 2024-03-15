import db from "../config/db.js";
import Database_mongo from "../config/config_name.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import "dotenv/config";

/* Khách hàng */
let dang_ky_khach_hang = async (req, res) => {
  try {
    let khach_hang = {
      hotenKH: req.body.hotenKH,
      password: req.body.password,
      email: req.body.email,
      diachi: req.body.diachi,
      sodt: req.body.sodt,
    };

    let collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_KhachHang);

    await collection.insertOne(khach_hang);

    // Trả về phản hồi thành công
    res.status(200).send({
      message: "Đăng ký thành công",
    });
  } catch (err) {
    // Xử lý lỗi và trả về phản hồi lỗi
    console.error(err);
    res.status(500).send({
      message: "Đăng ký không thành công",
      error: err.message,
    });
  }
};

let get_all_khach_hang = async (req, res) => {
  try {
    let collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_KhachHang);
    let allKhachHang = await collection.find({}).toArray();
    return res.status(200).json({
      ds: allKhachHang,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

let thay_doi_thong_tin_khach_hang = async (req, res) => {
  try {
    let { _id, hotenKH, email, diachi, sodt } = req.body;
    console.log("íisisisi", _id);
    // Kiểm tra xem có thiếu thông tin cần thiết không
    if (!_id || !hotenKH || !email || !diachi || !sodt) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
    }

    // Kết nối tới database và collection
    const collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_KhachHang);

    const objectId = new ObjectId(_id);

    // Cập nhật thông tin khách hàng
    const result = await collection.updateOne(
      { _id: objectId }, // Điều kiện tìm kiếm theo _id
      { $set: { hotenKH: hotenKH, email: email, diachi: diachi, sodt: sodt } } // Thông tin cần cập nhật
    );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Lỗi server khi cập nhật thông tin khách hàng" });
  }
};

let thong_tin_mot_khach_hang = async (req, res) => {
  try {
    let _id = req.params._id;
    // let _id = req.body._id;
    console.log(_id);

    // Kiểm tra xem _id có tồn tại không
    if (!_id) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin _id của khách hàng" });
    }

    const objectId = new ObjectId(_id);

    // Kết nối tới database và collection
    const collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_KhachHang);

    // Tìm kiếm thông tin của khách hàng theo _id
    const khachHang = await collection.findOne({ _id: objectId });

    console.log(khachHang);

    if (khachHang) {
      return res.status(200).json(khachHang);
    } else {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin của khách hàng" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Lỗi server khi lấy thông tin khách hàng" });
  }
};

let xoa_khach_hang = async (req, res) => {
  try {
    let _id = req.params._id;
    // Kiểm tra xem _id có tồn tại không
    if (!_id) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin _id của khách hàng" });
    }

    const objectId = new ObjectId(_id);

    // Kết nối tới database và collection
    const collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_KhachHang);

    // Xóa khách hàng dựa vào _id
    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: "Xóa khách hàng thành công" });
    } else {
      return res
        .status(404)
        .json({ message: "Không tìm thấy khách hàng để xóa" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi server khi xóa khách hàng" });
  }
};

// let dang_nhap_khach_hang = async (req, res) => {
//     try {
//         let { email, password } = req.body;

//         // Kiểm tra xem có thiếu thông tin đăng nhập không
//         if (!email || !password) {
//             return res.status(400).json({ message: "Vui lòng cung cấp email và mật khẩu" });
//         }

//         // Kết nối tới database và collection chứa thông tin khách hàng
//         const collection = (await db).db(Database_mongo.database_name).collection(Database_mongo.collection_KhachHang);

//         // Tìm kiếm thông tin khách hàng với email và mật khẩu cung cấp
//         const khachHang = await collection.findOne({ email: email, password: password });

//         if (khachHang) {
//             // Nếu thông tin đăng nhập chính xác, trả về thông tin khách hàng
//             return res.status(200).json(khachHang);
//         } else {
//             return res.status(401).json({ message: "Email hoặc mật khẩu không chính xác" });
//         }
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Lỗi server khi đăng nhập" });
//     }
// }

let dang_nhap_khach_hang = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Kiểm tra xem có thiếu thông tin đăng nhập không
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp email và mật khẩu" });
    }

    // Kết nối tới database và collection chứa thông tin khách hàng
    const collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_KhachHang);

    // Tìm kiếm thông tin khách hàng với email và mật khẩu cung cấp
    const khachHang = await collection.findOne({
      email: email,
      password: password,
    });

    if (khachHang) {
      // Nếu thông tin đăng nhập chính xác, tạo token và trả về cho người dùng
      const token = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3000s" }
      );

      // Trả về token trong response
      return res.status(200).json({ token: token, khachhang: khachHang });
    } else {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không chính xác" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
};

/* Nhân viên */
let dang_ky_nhan_vien = async (req, res) => {
  try {
    let nhan_vien = {
      hotenNV: req.body.hotenNV,
      password: req.body.password,
      email: req.body.email,
      chucvu: req.body.chucvu,
      diachi: req.body.diachi,
      sodt: req.body.sodt,
    };

    let collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_NhanVien);

    await collection.insertOne(nhan_vien);

    // Trả về phản hồi thành công
    res.status(200).send({
      message: "Đăng ký thành công",
    });
  } catch (err) {
    // Xử lý lỗi và trả về phản hồi lỗi
    console.error(err);
    res.status(500).send({
      message: "Đăng ký không thành công",
      error: err.message,
    });
  }
};

let get_all_nhan_vien = async (req, res) => {
  try {
    let collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_NhanVien);
    let allNhanVien = await collection.find({}).toArray();
    return res.status(200).json({
      ds: allNhanVien,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

let thay_doi_thong_tin_nhan_vien = async (req, res) => {
  try {
    let { _id, hotenNV, email, chucvu, diachi, sodt } = req.body;
    console.log("íisisisi", _id);
    // Kiểm tra xem có thiếu thông tin cần thiết không
    if (!_id || !hotenNV || !email || !chucvu || !diachi || !sodt) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
    }

    // Kết nối tới database và collection
    const collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_NhanVien);

    const objectId = new ObjectId(_id);

    // Cập nhật thông tin khách hàng
    const result = await collection.updateOne(
      { _id: objectId }, // Điều kiện tìm kiếm theo _id
      {
        $set: {
          hotenNV: hotenNV,
          email: email,
          chucvu: chucvu,
          diachi: diachi,
          sodt: sodt,
        },
      } // Thông tin cần cập nhật
    );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Lỗi server khi cập nhật thông tin nhân viên" });
  }
};

let thong_tin_mot_nhan_vien = async (req, res) => {
  try {
    let _id = req.params._id;
    // let _id = req.body._id;
    console.log(_id);

    // Kiểm tra xem _id có tồn tại không
    if (!_id) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin _id của nhân viên" });
    }

    const objectId = new ObjectId(_id);

    // Kết nối tới database và collection
    const collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_NhanVien);

    // Tìm kiếm thông tin của nhanvien theo _id
    const nhanvien = await collection.findOne({ _id: objectId });

    console.log(nhanvien);

    if (nhanvien) {
      return res.status(200).json(nhanvien);
    } else {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin của nhân viên" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Lỗi server khi lấy thông tin nhân viên" });
  }
};

let xoa_nhan_vien = async (req, res) => {
  try {
    let _id = req.params._id;
    // Kiểm tra xem _id có tồn tại không
    if (!_id) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin _id của nhân viên" });
    }

    const objectId = new ObjectId(_id);

    // Kết nối tới database và collection
    const collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_NhanVien);

    // Xóa nhân viên dựa vào _id
    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: "Xóa nhân viên thành công" });
    } else {
      return res
        .status(404)
        .json({ message: "Không tìm thấy nhân viên để xóa" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi server khi xóa nhân viên" });
  }
};

/* Sản phẩm */
// let get_all_san_pham = async (req, res) => {
//   try {
//     let collectionSP = (await db)
//       .db(Database_mongo.database_name)
//       .collection(Database_mongo.collection_SanPham);
//     let collectionHH = (await db)
//       .db(Database_mongo.database_name)
//       .collection(Database_mongo.collection_HinhAnhSanPham);

//     // Lấy tất cả sản phẩm
//     let allSanPham = await collectionSP.find({}).toArray();

//     // Duyệt qua danh sách sản phẩm
//     for (let i = 0; i < allSanPham.length; i++) {
//       const sanPham = allSanPham[i];

//       // Lấy danh sách hình ảnh cho mỗi sản phẩm
//       const danhSachHinhAnh = await collectionHH
//         .find({ id_sanpham: sanPham._id })
//         .toArray();
//       console.log("danhSachHinhAnh: ", danhSachHinhAnh.ten_anh);

//       // Gán danh sách hình ảnh vào thuộc tính 'hinhanh' của sản phẩm
//       // sanPham.ten_anh = danhSachHinhAnh;
//       // allSanPham.ten_anh = danhSachHinhAnh
//       sanPham["ten_anh"] = danhSachHinhAnh[0]["ten_anh"];
//     }

//     // console.log("Tatats ca san pham", allSanPham);
//     // let collection = (await db).db(Database_mongo.database_name).collection(Database_mongo.collection_SanPham, Database_mongo.collection_HinhAnhSanPham);
//     // let allSanPham = await collection.find({}).toArray();

//     console.log(allSanPham);
//     return res.status(200).json({
//       ds: allSanPham,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       error: err.message,
//     });
//   }
// };

let get_all_san_pham = async (req, res) => {
  try {
    let collectionSP = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_SanPham);
    let collectionHH = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_HinhAnhSanPham);

    // Lấy tất cả sản phẩm
    let allSanPham = await collectionSP.find({}).toArray();

    // Duyệt qua danh sách sản phẩm
    for (let i = 0; i < allSanPham.length; i++) {
      const sanPham = allSanPham[i];

      // Lấy danh sách hình ảnh cho mỗi sản phẩm
      const danhSachHinhAnh = await collectionHH
        .find({ id_sanpham: sanPham._id })
        .toArray();

      if (danhSachHinhAnh && danhSachHinhAnh.length > 0) {
        // Gán hình ảnh đầu tiên vào thuộc tính 'ten_anh' của sản phẩm
        sanPham["ten_anh"] = danhSachHinhAnh[0]["ten_anh"];
      } else {
        // Xử lý trường hợp không có hình ảnh
        sanPham["ten_anh"] = "URL_hinh_anh_mặc_định"; // Thay thế bằng URL hình ảnh mặc định hoặc giá trị khác
      }
    }

    console.log(allSanPham);
    return res.status(200).json({
      ds: allSanPham,
    });
  } catch (err) {
    console.error("Lỗi tại get_all_san_pham:", err); // Thêm log chi tiết lỗi
    return res.status(500).json({
      error: err.message,
      stack: err.stack // Cung cấp thêm thông tin về stack trace
    });
  }
};


let lay_1_san_pham = async (req, res) => {
  try {
    let id_sanpham = req.params.id_sanpham;
    const collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_SanPham);

    // Lấy thông tin sản phẩm
    let san_pham = await collection.findOne({ _id: new ObjectId(id_sanpham) });

    if (!san_pham) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    const collection_HinhAnhSanPham = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_HinhAnhSanPham);

    // Lấy danh sách tên ảnh của sản phẩm
    let danh_sach_ten_anh = await collection_HinhAnhSanPham
      .find(
        { id_sanpham: new ObjectId(id_sanpham) },
        { _id: 0, id_sanpham: 0, ten_anh: 1 }
      )
      .toArray();

    // Gắn danh sách ảnh vào thông tin sản phẩm
    san_pham["danh_sach_anh"] = danh_sach_ten_anh;

    return res.status(200).json({ san_pham: san_pham });
  } 
  // catch (err) {
  //   console.error(err);
  //   return res
  //     .status(500)
  //     .json({ message: "Lỗi server khi lấy thông tin sản phẩm" });
  // }
  catch (err) {
    console.error("Lỗi tại get_all_san_pham:", err);
    return res.status(500).json({
        message: "Lỗi xảy ra trong quá trình lấy thông tin sản phẩm",
        error: err.message,
        stack: err.stack  // Thêm dòng này để có thêm thông tin chi tiết về stack trace của lỗi
    });
}

};

let xoa_san_pham = async (req, res) => {
  try {
    let id_sanpham = req.params.id_sanpham;
    const collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_SanPham);

    const result = await collection.deleteOne({
      _id: new ObjectId(id_sanpham),
    });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Đã xóa sản phẩm thành công" });
    } else {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để xóa" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi server khi xóa sản phẩm" });
  }
};

let cap_nhat_san_pham = async (req, res) => {
  try {
    let { _id, TenHH, MoTaHH, Gia, SoLuongHang, GhiChu } = req.body;

    const collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_SanPham);

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          TenHH: TenHH,
          MoTaHH: MoTaHH,
          Gia: Gia,
          SoLuongHang: SoLuongHang,
          GhiChu: GhiChu,
        },
      }
    );

    if (result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ message: "Đã cập nhật thông tin sản phẩm thành công" });
    } else {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để cập nhật" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Lỗi server khi cập nhật sản phẩm" });
  }
};

/* Đơn hàng */
let dat_hang = async (req, res) => {
  /*
        id_khach_hang: dung123
        danh_sach_san_pham: [
            {
                id_san_pham_1: 1,
                so_luong: 2
            },
            {
                id_san_pham_2: 2,
                so_luong: 1
            }
        ]
        thoi_gian_dat,
        ..
        trang thai: chua_xac_nhan|da_xac_nhan|dang_giao_hang|hoan_thanh|that_bai|da_huy
    */

  try {
    let collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_DonHang);
    // let collectionSP = (await db)
    //   .db(Database_mongo.database_name)
    //   .collection(Database_mongo.SanPham);

    const thoi_gian_dat = new Date();
    console.log(req.body);
    let don_hang = {
      id_khach_hang: req.body.id_khach_hang,
      danh_sach_san_pham: req.body.danh_sach_san_pham,
      thanh_tien: 0,
      thoi_gian_dat: thoi_gian_dat,
      trang_thai: "chua_xac_nhan",
    };

  //   for (let i = 0; i < don_hang.danh_sach_san_pham.length; i++) {
  //     let san_pham = await collectionSP.findOne({ _id: new ObjectId(don_hang.danh_sach_san_pham[i].id_san_pham) });

  //     if (san_pham) {
  //         don_hang.danh_sach_san_pham[i].Gia = san_pham.Gia;
  //         don_hang.thanh_tien += (don_hang.danh_sach_san_pham[i].so_luong * don_hang.danh_sach_san_pham[i].Gia);
  //     } else {
  //         don_hang.danh_sach_san_pham[i].TenHH = "Sản phẩm không tồn tại";
  //     }
  // }

  // console.log("DH: ", don_hang)

    await collection.insertOne(don_hang);

    return res
      .status(200)
      .json({ message: "Đặt hàng thành công", don_hang: don_hang });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi server khi đặt hàng" });
  }
};

let danh_sach_don_hang = async (req, res) => {
  try {
    let collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_DonHang);

    let all_don_hang = await collection.find({}).toArray();
    console.log(all_don_hang);
    if (all_don_hang.length > 0) {
      return res.status(200).json({
        message: "Danh sách tất cả đơn hàng",
        all_don_hang: all_don_hang,
      });
    } else {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng nào" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Lỗi server khi lấy danh sách đơn hàng" });
  }
};

let them_gio_hang = async (req, res) => {
  try {
    let collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_GioHang);
    let { id_khach_hang, id_sanpham } = req.body;

    let gio_hang = {
      id_khach_hang: id_khach_hang,
      id_sanpham: id_sanpham,
    };

    const result = await collection.insertOne(gio_hang);

    if (result.insertedCount === 1) {
      return res
        .status(200)
        .json({ message: "Thêm vào giỏ hàng thành công", gio_hang: gio_hang });
    } else {
      return res.status(500).json({ message: "Lỗi khi thêm vào giỏ hàng" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Lỗi server khi thêm vào giỏ hàng" });
  }
};

let lay_gio_hang = async (req, res) => {
  try {
    let id_khach_hang = req.body.id_khach_hang;
    let collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_GioHang);

    let danh_sach_san_pham = await collection
      .find(
        { id_khach_hang: id_khach_hang },
        { projection: { _id: 0, id_khach_hang: 0 } }
      )
      .toArray();

    if (danh_sach_san_pham.length > 0) {
      return res.status(200).json({
        message: "Danh sách sản phẩm trong giỏ hàng",
        danh_sach_san_pham: danh_sach_san_pham,
      });
    } else {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Lỗi server khi lấy danh sách sản phẩm trong giỏ hàng",
    });
  }
};

let xem_trang_thai_don_hang = async (req, res) => {
  try {
    let id_don_hang = req.params._id;
    let collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_DonHang);
    let collectionKH = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_KhachHang);
    let collectionSP = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_SanPham);


    let don_hang = await collection.findOne({ _id: new ObjectId(id_don_hang) });

    if (don_hang) {

        /* Tìm khách hàng */
      let khach_hang = await collectionKH.findOne({
        _id: new ObjectId(don_hang.id_khach_hang),
      });

      console.log("ID", don_hang.id_khach_hang)

      if (khach_hang) {
        don_hang.ten_khach_hang = khach_hang.hotenKH;
        don_hang.diachi = khach_hang.diachi;
        don_hang.sodt = khach_hang.sodt;

      } else {
        don_hang.ten_khach_hang = "Khách hàng không tồn tại";
      }

      /* Tìm sản phẩm */
      for (let i = 0; i < don_hang.danh_sach_san_pham.length; i++) {
        let san_pham = await collectionSP.findOne({ _id: new ObjectId(don_hang.danh_sach_san_pham[i].id_san_pham) });

        if (san_pham) {
            don_hang.danh_sach_san_pham[i].TenHH = san_pham.TenHH;
            don_hang.danh_sach_san_pham[i].Gia = san_pham.Gia;
            don_hang.thanh_tien += (don_hang.danh_sach_san_pham[i].so_luong * don_hang.danh_sach_san_pham[i].Gia);
        } else {
            don_hang.danh_sach_san_pham[i].TenHH = "Sản phẩm không tồn tại";
        }
    }

    console.log(don_hang)
      return res
        .status(200)
        .json({ message: "Thông tin đơn hàng", don_hang: don_hang });
    } else {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Lỗi server khi xem trạng thái đơn hàng" });
  }
};

// let huy_don_hang = async (req, res) => {
//     try {
//         let id_don_hang = req.body.id_don_hang;
//         let collection = (await db).db(Database_mongo.database_name).collection(Database_mongo.collection_DonHang);

//         const result = await collection.updateOne(
//             { _id: ObjectId(id_don_hang) },
//             { $set: { trang_thai: "da_huy" } }
//         );

//         if (result.modifiedCount === 1) {
//             return res.status(200).json({ message: "Đã hủy đơn hàng thành công" });
//         } else {
//             return res.status(404).json({ message: "Không tìm thấy đơn hàng để hủy" });
//         }
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Lỗi server khi hủy đơn hàng" });
//     }
// }

let danh_sach_don_hang_mot_khach_hang = async (req, res) => {
  try {
    let id_khach_hang = req.body.id_khach_hang;
    let collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_DonHang);

    let danh_sach_don_hang = await collection
      .find({ id_khach_hang: id_khach_hang })
      .toArray();

    if (danh_sach_don_hang.length > 0) {
      return res.status(200).json({
        message: "Danh sách đơn hàng của khách hàng",
        danh_sach_don_hang: danh_sach_don_hang,
      });
    } else {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đơn hàng nào của khách hàng này" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Lỗi server khi lấy danh sách đơn hàng của khách hàng",
    });
  }
};

let cap_nhat_trang_thai_don_hang = async (req, res) => {
  try {
    let id_don_hang = req.body.id_don_hang;
    console.log(id_don_hang)
    let trang_thai_moi = req.body.trang_thai_moi;
    console.log(trang_thai_moi)
    
    let collection = (await db)
      .db(Database_mongo.database_name)
      .collection(Database_mongo.collection_DonHang);

    const result = await collection.updateOne(
      { _id: new ObjectId(id_don_hang) },
      { $set: { trang_thai: trang_thai_moi } }
    );

    // if (result.modifiedCount === 1) {
    //   return res.status(200).json({ message: "Đã hủy đơn hàng thành công" });
    // } else {
    //   return res
    //     .status(404)
    //     .json({ message: "Không tìm thấy đơn hàng để hủy" });
    // }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi server khi hủy đơn hàng" });
  }
};

export const APIControllers = {
  dang_ky_khach_hang,
  dang_nhap_khach_hang,
  get_all_khach_hang,
  thay_doi_thong_tin_khach_hang,
  thong_tin_mot_khach_hang,
  xoa_khach_hang,

  dang_ky_nhan_vien,
  get_all_nhan_vien,
  thay_doi_thong_tin_nhan_vien,
  thong_tin_mot_nhan_vien,
  xoa_nhan_vien,

  get_all_san_pham,
  lay_1_san_pham,
  xoa_san_pham,
  cap_nhat_san_pham,

  dat_hang,
  them_gio_hang,
  lay_gio_hang,
  xem_trang_thai_don_hang,
  // huy_don_hang,
  danh_sach_don_hang,
  cap_nhat_trang_thai_don_hang,
  danh_sach_don_hang_mot_khach_hang,
};
