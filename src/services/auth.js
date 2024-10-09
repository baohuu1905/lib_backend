import { where } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hasPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8))
const db = require('../models/index.js')

export const register1 = ({email, password}) => {
    return new Promise( async(resolve, reject) => {
        try {
            const response = await db.User.findOrCreate({
                where: {email},
                defaults: {
                    email,
                    password: hasPassword(password)
                }
            });
            const token = response[1] ? jwt.sign({id: response[0].id, email: response[0].email, role_code: response[0].role_code}, process.env.JWT_SECRET, {expiresIn: '5d'}) : null;
            // đăng nhập nếu là tạo mới thì tạo token nếu ko có thì trả về null
            // console.log("token: ", token)

            resolve({
                err: response[1] ? 0 :1,
                mess: response[1] ? 'Register is successfully': 'Email is already exist',
                'access_token' :  token ? `Bearer ${token}` : token

            });
        } catch(error) {
            reject(error);
        }
    });
}


export const login = ({email, password}) => {
    return new Promise( async(resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: {email},
                raw: true,
            });
            console.log("response: ", response)
            
            
            const isChecked = response && bcrypt.compareSync(password, response.password)
            const token = isChecked ? jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, {expiresIn: '5d'}) : null
            console.log("token: ", token)

            resolve({
                err: token ? 0 :1,
                mess: token ? 'Login is successfully': response ? 'Password is wrong':  'Email is not exist',
                'access_token' : token ? `Bearer ${token}` : null

            });
        } catch(error) {
            reject(error);
        }
    });
}
