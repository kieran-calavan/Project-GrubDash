const { stat } = require("fs");
const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass
function list (req, res) {
    res.json({data: orders})
}

function create (req, res) {
    const {data:{deliverTo, mobileNumber, status, dishes} = {} } = req.body
    const newOrder = {
        id: nextId(),
        deliverTo: deliverTo,
        mobileNumber: mobileNumber,
        status: status,
        dishes: dishes,
    }
    orders.push(newOrder)
    res.status(201).json(newOrder)
}

function read (req, res, next) {
    const { orderId } = req.params
    const orders = orders.find(order => order.id === Number(orderId))
    res.json ({data: findOrder})
}

function update (req, res) {
    const { orderId } = req.params
    const order = orders.find(order => order.id === Number(orderId))
    const {data:{deliverTo, mobileNumber, status, dishes} = {} } = req.body

    order.deliverTo = deliverTo 
    order.mobileNumber = mobileNumber
    order.status = status
    order.dishes = dishes
    res.json(order)

}

function orderExists(req, res) {
    const { orderId } = req.params
    const order = orders.find(order => order.id === Number(orderId))
    if(order) {
        next()
    }
    res.status(404).send("Not found")
}

function destroy (req, res) {
    const { orderId } = req.params
    const orders = orders.find(order => order.id === Number(orderId))
    const deletedOrders = orders.splice(index, 1)
    res.sendStatus(204)
}

module.exports = {
    create,
    list, 
    read: [orderExists, read], 
    update:[orderExists, update], 
    destroy:[orderExists, destroy]
}