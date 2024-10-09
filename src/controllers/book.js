import { internalSeverError, badRequest } from '../middlewares/handle_errors'
import { createNewBookSevices, getBooks, updateBookSevices, deleteBookSevices } from '../services/book.js'
import { book_id, title, price, category_code, image, book_ids, name } from '../helppers/joi_schema.js'
import joi from 'joi'
const cloudinary = require('cloudinary').v2;

export const getBookControllers = async (req, res) => {
    try {
        const response = await getBooks(req.query)
        return res.status(200).json(response)
    } catch(error){
        console.error(error)
        return internalSeverError(res)
    }
}

//CREATE

export const createNewBook = async (req, res) => {
    try {
      const fileData = req.file;
  
      let imageInfo = null;
      if (fileData) {
        // Tạo thông tin bức ảnh từ dữ liệu nhận được từ Cloudinary
        imageInfo = {
          url: fileData.cloudinaryUrl,
          format: fileData.format,
          width: fileData.width,
          height: fileData.height,
          size: fileData.bytes,
          filename: fileData.public_id
        };
  
        // Nếu có ảnh, thêm URL của ảnh vào req.body
        req.body.image = imageInfo.url;
      }
      const {error} = joi.object({title, image, category_code, price}).validate({...req.body, image: fileData ? fileData.cloudinaryUrl : undefined})
      if(error){
        if(fileData) cloudinary.uploader.destroy(fileData.public_id)
        return badRequest(error.details[0].message, res)
      }
      const response = await createNewBookSevices(req.body)
      if (response.err) {
        if (fileData) cloudinary.uploader.destroy(fileData.public_id);
      }
      return res.status(200).json(response)

    } catch (error) {
      console.log(error);
      return internalSeverError(res)
    }
  };


//UPDATE

export const updateBook = async (req, res) => {
  try {
    const fileData = req.file;

    let imageInfo = null;
    if (fileData) {
      // Tạo thông tin bức ảnh từ dữ liệu nhận được từ Cloudinary
      imageInfo = {
        url: fileData.cloudinaryUrl,
        format: fileData.format,
        width: fileData.width,
        height: fileData.height,
        size: fileData.bytes,
        filename: fileData.public_id
      };

      // Nếu có ảnh, thêm URL của ảnh vào req.body
      req.body.image = imageInfo.url;
    }
    const {error} = joi.object({book_id}).validate({book_id: req.body.book_id})
    console.log(error)
    if(error){
      if(fileData) cloudinary.uploader.destroy(fileData.public_id)
      return badRequest(error.details[0].message, res)
    }
    const response = await updateBookSevices(req.body, fileData)
    if (response.err) {
      if (fileData) cloudinary.uploader.destroy(fileData.public_id);
    }
    return res.status(200).json(response)

  } catch (error) {
    console.log(error);
    return internalSeverError(res)
  }
};

//DELETE
export const deleteBook = async (req, res) => {
  try {  
    const {error} = joi.object({book_ids, name}).validate(req.query)
    if(error){
      return badRequest(error.details[0].message, res)
    }
    const response = await deleteBookSevices(req.query.book_ids)
    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    return internalSeverError(res)
  }
};
