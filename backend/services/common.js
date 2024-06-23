const passport=require('passport');
exports.isAuth=(erq,res,done)=>{
    return passport.authenticate('jwt');
}
exports.sanitizeUser=(user)=>{
    console.log("user in sanitizer: ",user)
    console.log("user in=d in sanitizer: ",user.id);
    return {id:user.id, role:user.role}
}

exports.cookieExtractor = function(req){
    let token=null;
    if(req && req.cookies){
        token=req.cookies['jwt'];
    }
    return token;
}