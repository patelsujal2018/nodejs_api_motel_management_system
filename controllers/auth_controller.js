const db = require('../models');
const { check, validationResult } = require('express-validator');
const errorFormatter = require('../services/validation_formatter');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS;
var jwt = require('jsonwebtoken');
var jwtKey = process.env.JWT_SECRET;
var expiresTime = process.env.EXPIRE_TIME;
const jwtTokenDecode = require('../services/jwt_token_decode');

class auth_controller {
    constructor() {
    }

    async login_process(req,res){
        await check('email')
            .notEmpty().withMessage('email is required')
            .isLength({ max:190 }).withMessage('email is not more than 100 character')
            .run(req);
        await check('password')
            .notEmpty().withMessage('password is required')
            .isLength({ min:8, max:30 }).withMessage('password is not lessthan 8 and not morethan 30 character')
            .run(req);

        const result = validationResult(req).formatWith(errorFormatter);

        if(!result.isEmpty()){
            res.status(200).json({
                message: "validation failed",
                success: false,
                data: {
                    errors: result.mapped()
                },
            });
        } else {
            db.user.findOne({
                where:{
                    email:req.body.email
                }
            }).then(user => {
                if(user.status === 1) {
                    var result = bcrypt.compareSync(req.body.password, user.password);
                    if (result) {
                        if(user.login_status === 0) {
                            jwt.sign({
                                id: user.id,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                dob: user.dob,
                                gender: user.gender,
                                email: user.email,
                                mobile: user.mobile
                            }, jwtKey, {expiresIn: expiresTime}, (err, token) => {
                                if(!!token){
                                    db.user.update({ login_status: 1,token: token},{ where:{ id:user.id }}).then(result => {
                                        res.status(200).cookie(process.env.COOKIE_NAME, token, {
                                            sameSite: 'strict',
                                            path: '/',
                                            secure: process.env.NODE_ENV != 'development',
                                            httpOnly: true,
                                            expires: new Date(Date.now() + parseInt(process.env.SESSION_EXPIRE_TIME))
                                        }).send({message: 'user login successfully', success: true, data: {}});
                                    });
                                }
                            });
                        } else {
                            res.status(200).cookie(process.env.COOKIE_NAME, user.token, {
                                sameSite: 'strict',
                                path: '/',
                                secure: process.env.NODE_ENV != 'development',
                                httpOnly: true,
                                expires: new Date(Date.now() + parseInt(process.env.SESSION_EXPIRE_TIME))
                            }).send({message: 'user login successfully', success: true, data: {}});
                        }
                    } else {
                        res.status(200).json({
                            message: "credentials is wrong",
                            success: true,
                            data: {},
                        });
                    }
                } else if(user.status === 0){
                    res.status(200).json({
                        message: "your account is inactivated",
                        success: true,
                        data: {},
                    });
                } else if(user.status === 2){
                    res.status(200).json({
                        message: "your account is deactivated",
                        success: true,
                        data: {},
                    });
                }
            }).catch(err => {
                console.log(err);
                res.status(400).json({
                    message: "some problem to login user",
                    success: false,
                    data: {},
                });
            });
        }
    }

    async login_user_details(req,res){
        var userDetails = jwtTokenDecode(req);
        if(userDetails){
            db.user.findByPk(userDetails.id,{ attributes: { exclude: ['updatedAt','deletedAt','password','token']} }).then(user => {
                if(user.login_status == 1){
                    res.status(200).json({ message:'user details get successfully',success:true,data:{user} });
                } else {
                    res.status(400).json({ message:'user details is not found!',success:false,data:{} });
                }
            }).catch(error=>{
                res.status(400).json({ message:'sorry user details is not found!',success:false,data:{} });
            });
        } else {
            res.status(400).json({ message:'user token not found!',success:false,data:{} });
        }
    }

    async logout_process(req, res) {
        var user = jwtTokenDecode(req);
        if(user){
            db.user.findOne({ where:{ email:user.email } }).then(user => {
                user.update({ login_status: 0, token: null },{ where:{ id:user.id } }).then(result => {
                    res.status(200).json({
                        message: "user logout successfully",
                        success: true,
                        data: {},
                    });
                });
            })
        } else {
            res.status(400).json({
                message: "token is expired",
                success: false,
                data: {
                    errors: 'token is expired'
                },
            });
        }
    }
}

module.exports = new auth_controller();