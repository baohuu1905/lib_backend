const db = require('../models/index.js');
import data from '../../data/data.json';
import { generateCode } from '../helppers/fn.js';

export const insertData = () => { return new Promise( async (resolve, reject) => {
        try {
            const categories = Object.keys(data)
            categories.forEach( async (item) => {
                console.log('sdfsd', generateCode(item))
                await db.Categories.create({
                    code: generateCode(item),
                    value: item
                })
            })
            const dataArr = Object.entries(data)
            dataArr.forEach( async (item) => {
                item[1]?.map((async (book) => {
                    await db.Book.create({
                        title: book.bookTitle,
                        price: book.bookPrice,
                        image: book.imageUrl,
                        category_code: generateCode(item[0]),
                    })
                }))
            })
            resolve('oke');
        } catch(error) {
            reject(error);
        }
    });
}
