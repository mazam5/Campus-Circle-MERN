import Category from "../models/Categories.js";
import ErrorHandler from "../utils/errorhandler.js";

// create
export const createCatergory = async(req,res,next) => {
    const newCategory = new Category(req.body)
    try {
        const savedCat = await newCategory.save()
        res.status(201).json(savedCat);
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}

// get
export const getCategory = async(req,res,next) => {
    try {
        const category = await Category.find()
        res.status(200).json(category)
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}