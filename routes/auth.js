var express = require('express');
var router = express.Router();

/* middlewares */
const customerJwtLogin = require('../middlewares/customerjwtlogin');

/* auth controller */
var controller = require('../controllers/auth_controller');


router.post('/login',(req,res)=>{ controller.login_process(req,res) });
router.get('/me',customerJwtLogin,(req,res)=>{ controller.login_user_details(req,res) });
router.get('/logout',customerJwtLogin, (req, res )=>{ controller.logout_process(req,res) });


/* export router */
module.exports = router;