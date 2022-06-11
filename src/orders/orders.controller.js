const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass
function list(req, res) {
    res.json({ data: orders })
}

function create(req, res, next) {
    const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body
    const newOrder = {
        id: nextId(),
        deliverTo: deliverTo,
        mobileNumber: mobileNumber,
        status: status,
        dishes: dishes,
    }


    if (!deliverTo) {
        return next({
            status: 400,
            message: `deliverTo is empty ${req.params.orderId}`
        })
    }
    if (!mobileNumber) {
        return next({
            status: 400,
            message: `mobileNumber is empty ${req.params.orderId}`
        });
    }

    if (!dishes || dishes.length === 0 || !Array.isArray(dishes)) {
        return next({
            status: 400,
            message: `There are no dishes ${req.params.orderId}`
        });
    }
    for (let i = 0; i < dishes.length; i++) {
        if (!dishes[i].quantity || dishes[i].quantity < 0 || !Number.isInteger(dishes[i].quantity)) {
            return next({
                status: 400,
                message: `Dish ${index} must have a quantity that is an integer greater than 0`
            })
        }
    }
    if (!quantity) {
        return next({
            status: 400,
            message: "quantity is required"
        })
    }

    orders.push(newOrder)
    res.status(201).json({data:newOrder})
}

function read(req, res, next) {
    const { orderId } = req.params
    const orders = orders.find(order => order.id === (orderId))
    res.json({ data: findOrder })
}

function update(req, res, next) {
    const { orderId } = req.params
    const order = orders.find(order => order.id === (orderId))
    const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body


    if (!deliverTo) {
        return next({
            status: 400,
            message: "Order must include a deliverTo"
        })
    }
    if (!mobileNumber) {
        return next({
            status: 400,
            message: "Order must include a mobileNumber"
        });
    }
    if (!dishes || dishes.length === 0 || !Array.isArray(dishes)) {
        return next({
            status: 400,
            message: "Order must include a dish",
        });
    }
    for (let i = 0; i < dishes.length; i++) {
        if (!dishes[i].quantity || dishes[i].quantity < 0 || typeof dishes[i].quantity !== "number") {
            return next({
                status: 400,
                message: `Dish ${index} must have a quantity that is an integer greater than 0`
            })
        }
    }
    if (id !== orderId) {
        return next({
            status: 400,
            message: `Order id does not match route id. Order: ${id}, Route: ${orderId}.`
        })
    }
    if (!status) {
        return next({
            status: 400,
            message: `Order must have a status of pending, preparing, out-for-delivery, delivered, ${status}`
        })
    }
    if (status === "delivered") {
        return next({
            status: 400,
            message: "A delivered order cannot be changed"
        })
    }
if (!quantity) {
        return next({
            status: 400,
            message: "quantity is required"
        })
    }
    order.deliverTo = deliverTo 
    order.mobileNumber = mobileNumber
    order.status = status
    order.dishes = dishes
    res.json({data:order})
}


function orderExists(req, res, next) {
    const { orderId } = req.params
    const order = orders.find(order => order.id === (orderId))
    if (order) {
        next()
    }
    res.status(404).send("Not found")
}

function destroy(req, res, next) {
    const { orderId } = req.params
    if (res.locals.order.status !== "pending") {
        return next({
            status: 400,
            message: "An order cannot be deleted unless it is pending"
        })
    } else {
        if (!res.locals.order) {
            return next({
                status: 404,
                message: "No mactching order has been found"
            })
        }
    }
    const orders = orders.find(order => order.id === (orderId))
    const deletedOrders = orders.splice(index, 1)
    res.sendStatus(204)


}

module.exports = {
    create,
    list,
    read: [orderExists, read],
    update: [orderExists, update],
    destroy: [orderExists, destroy]
}