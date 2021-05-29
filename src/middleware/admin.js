const UserModel = require('../model/userModel')

function admin_only(req, res, next) {
    const idUser = req.session.user_id;
    console.log('idUser', idUser)
    const isAdmin = UserModel.isAdmin(idUser)
    console.log(isAdmin)
    

    if (isAdmin) { //if user is employee
        next()
    } else {//return 401(Unauthorized) if user isn't employee
       
        res.sendStatus(401)
    }
}
module.exports = {
    admin_only
}