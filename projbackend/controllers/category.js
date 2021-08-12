const Category = require("../model/caregory")

exports.GetCategoryByID = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "category Not Found"
            })
        } 
        req.category = cate
        next();
    })
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save Category"
            })
        }
        res.json({ cate })
    })
}

exports.getCategory = (req, res) => {
    console.log(category)
    return res.json(req.category)
}

exports.getAllCategories = (req, res) => {
    Category.find().exec((err, items) => {
        if (err) {
            return res.status(400).json({
                error: "category Not Found"
            })
        }
        res.json(items)
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category
    category.name = req.body.name

    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to update category"
            })
        }
        res.json(updatedCategory)
    })
}

exports.removeCategory = (req, res) => {
    const category = req.category
    category.remove((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to Delete Category"
            })
        }
        res.json({
            msg: `Successfully deleted category ${cate.name}`
        })
    })
}