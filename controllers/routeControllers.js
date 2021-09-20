const routeControllers = {
    control_url: (req, res, next) => {
        if(req.url.startsWith('/submitBike/')){
            next()
        }else if((req.url.startsWith('/deleteBike/'))){
            next()
        }else if((req.url.startsWith('/editBike/'))){
            next()
        }else if((req.url.startsWith('/like'))){
            next()
        }
        else{
            let valid_url = ["/", "/signIn", "/signUp", "/logOut"]
            valid_url.includes(req.url)
            ? next()
            : res.redirect('/')
        }
        
    }
}
module.exports = routeControllers