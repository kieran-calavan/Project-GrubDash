const path = require("path");
const { listen } = require("../app");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass

function list (req, res) {
    res.json({data: dishes})
}

function create (req, res) {
    const {data:{name, description, price, image_url} = {} } = req.body
    const newDish = {
        id: nextId(),
        name: name,
        description: description,
        price: price,
        image_url: image_url,
    }
    dishes.push(newDish)
    res.status(201).json(newDish)
}

function read (req, res, next) {
    const { dishId } = req.params
    const findDish = dishes.find(dish => dish.id === Number(dishId))
    res.json ({data: findDish})
}

function update (req, res) {
    const { dishId } = req.params
    const dish = dishes.find(dish => dish.id === Number(dishId))
    const {data:{name, description, price, image_url} = {} } = req.body

    dish.name = name 
    dish.description = description
    dish.price = price
    dish.image_url = image_url
    res.json(dish)

}


module.exports = {
    create, list, read, update
}