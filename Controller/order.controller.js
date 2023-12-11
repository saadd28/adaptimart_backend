// const UserService = require()

const orderService = require("../Services/order.service");

module.exports = {
  postOrder: (req, res) => {
    orderService.postOrder(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  getAllOrders: (req, res) => {
    orderService.getAllOrders((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

    getOrdersByName: (req, res) => {
        console.log("req.query", req.query);
        orderService.getOrdersByName(req.query, (error, result) => {
        if (result) return res.status(200).send(result);
        else return res.status(500).send(error);
        });
    },
    getOrdersByID: (req, res) => {
        console.log("req.query", req.query);
        orderService.getOrdersByID(req.query, (error, result) => {
        if (result) return res.status(200).send(result);
        else return res.status(500).send(error);
        });
    },
    
    updateOrderStatus: (req, res) => {
      orderService.updateOrderStatus(req.body, (error, result) => {
        if (result) return res.status(200).send(result);
        else return res.status(500).send(error);
      });
    },

//   deleteProduct: (req, res) => {
//     const id = req.body.id;
//     console.log("req.body", req.body);
//     productService.deleteProduct(id, (error, result) => {
//       if (result.affectedRows === 1) return res.status(200).send(result);
//       else return res.status(500).send(error);
//     });
//   },



//   getProductsById: (req, res) => {
//     console.log("req.query", req.query);
//     productService.getProductsById(req.query, (error, result) => {
//       if (result) return res.status(200).send(result);
//       else return res.status(500).send(error);
//     });
//   },
};
