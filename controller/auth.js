async function handleAuth(req,res){
    const tokenCookie = req.cookies.token;
    if (tokenCookie){
        res.redirect("/main");
    }
    else {
        res.redirect("/login");
    }
}

module.exports = handleAuth;