import db from '../models/index.js'



export const getOne = (userId) => new Promise( async(resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: {id: userId},
                attributes: {
                    exclude: ['password', 'role_code'] //không lấy mk
                },
                include: [
                    {model: db.Role, as: 'roleData', attributes: ['id', 'code', 'value']},
                ]
            });
            resolve({
                err: response ? 0 :1,
                mess: response ? 'Got': 'user not found',
                userData: response

            });
        } catch(error) {
            reject(error);
        }
    });
//lấy thông tin user theo id