import { query } from 'express';
import db from '../models/index.js';
import { Op, where } from 'sequelize';
const cloudinary = require('cloudinary').v2;

//READ
export const getBooks = ({page, limit, order, name, ...query}) => new Promise( async(resolve, reject) => {
        try {
            const queries = {raw: true, nest: true}
            const offset = (!page || +page <= 1) ? 0 : (+page - 1)
            const fLimit = +limit || +process.env.LIMIT_BOOK
            queries.offset = offset * fLimit
            queries.limit = fLimit
            if(order) queries.order = [order]
            if(name) query.title = {[Op.substring]: name }
            const response = await db.Book.findAndCountAll({
                where: query,
                ...queries,
                attributes: {
                    exclude: ['category_code']
                },
                include: [
                    {model: db.Categories, attributes: { exclude: ['createdAt', 'updatedAt']}}
                ]                
            });

            resolve({
                err: response ? 0 :1,
                mess: response ? 'Got': 'Can not found book',
                bookData: response

            });
        } catch(error) {
            reject(error);
        }
})

//CREATE

export const createNewBookSevices = (body, fileData) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Book.findOrCreate({
            where: { title : body?.title},
            defaults: body //defaults sẽ tạo nhiều cột còn default sẽ tạo 1 cột ở dòng đầu tiên
            },               
        );
        resolve({
            err: response[1] ? 0 :1,
            mess: response[1] ? 'Created': 'Can not create new book',

        });
    } catch(error) {
        if(fileData) cloudinary.uploader.destroy(fileData.filename)
        reject(error);
    }
})

//UPDATE

export const updateBookSevices = ({book_id, ...body}, fileData) => new Promise( async(resolve, reject) => {
    try {
        if(fileData) body.image = fileData?.path
        const response = await db.Book.update(body,{
            where: { id: book_id }
        });
        resolve({
            err: response[0] > 0 ? 0 :1,
            mess: response[0] > 0 ? `${response[0]} book updated`: 'Cannot update/ Book ID not found',

        });
        if(fileData && response [0] === 0) cloudinary.uploader.destroy(fileData.filename)
    } catch(error) {
        if(fileData) cloudinary.uploader.destroy(fileData.filename)
        reject(error);
    }
})

//DELETE

export const deleteBookSevices = (book_ids) => new Promise(async (resolve, reject) => {
    try {
      // Lấy thông tin sách trước khi xóa
      const booksToDelete = await db.Book.findAll({
        where: { id: book_ids },
        attributes: ['id', 'image']
      });
      
      // Hiển thị thông tin sách và URL của ảnh trước khi xóa
    booksToDelete.forEach(book => {
        console.log(`Book ID: ${book.id}, Image URL: ${book.image}`);
      });

      // Xóa sách khỏi cơ sở dữ liệu
      const response = await db.Book.destroy({
        where: { id: book_ids }
      });
  
      // Xóa ảnh trên Cloudinary nếu sách bị xóa thành công
      if (response > 0) {
        const deletePromises = booksToDelete.map(book => {
          if (book.image) {
            const public_id = book.image.split('/').pop().split('.')[0];
            console.log(public_id)
            return cloudinary.uploader.destroy(public_id);
          }
        });
        await Promise.all(deletePromises);
      }
  
      resolve({
        err: response > 0 ? 0 : 1,
        mess: `${response} book deleted`
      });
    } catch (error) {
      reject(error);
    }
  });
  