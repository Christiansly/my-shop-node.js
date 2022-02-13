exports.getProduct = (req, res, next) => {
    res.render('products', {
        docTitle: "Products"
    })
}

exports.getIndex = (req, res, next) => {
    res.render('index', {
        docTitle: "My Shop"
    })
}

exports.getProductDetail = (req, res, next) => {
    res.render('single-product', {
        docTitle: "Product Details"
    })
}

exports.getAboutUs = (req, res, next) => {
    res.render('about', {
        docTitle: "About Us"
    })
}

exports.getContact = (req, res, next) => {
    res.render('contact', {
        docTitle: "Contact"
    })
}

exports.getLogin = (req, res, next) => [
    res.render('login', {
        docTitle: "Login"
    })
]