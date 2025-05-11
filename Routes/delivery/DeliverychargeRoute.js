const route = require("express").Router();
const deliveryController = require("../../controller/Delivery/DeliverychargeController");
// const {findCartItem}=require("../../middleware/Deliveryresuable")
const Cart = require("../../model/cartModel");
const { Createdelivery, getdelivery, Patchdelivery, Deletedelivery } =
  new deliveryController();
const { adminProtect, userProtect } = require("../../middleware/auth");

route.route("/create-delivery").post(adminProtect, Createdelivery);
route.route("/get-delivery").get(adminProtect, getdelivery);
route.route("/patch-delivery/:id").patch(adminProtect, Patchdelivery);
route.route("/delete-delivery/:id").delete(adminProtect, Deletedelivery);
route.route("/get-delivery-user").get((req, res) => {
  let data = [
    {
      state: "Tamil Nadu",
      item: [
        { weight: [1, 1999], amount: 80 },

        { weight: [2000, 2999], amount: 80 },
        { weight: [3000, 3999], amount: 100 },
        { weight: [4000, 4999], amount: 120 },
        { weight: [5000, 5999], amount: 140 },
        { weight: [6000, 6999], amount: 162 },
        { weight: [7000, 7999], amount: 184 },
        { weight: [8000, 8999], amount: 206 },
        { weight: [9000, 9999], amount: 228 },
        { weight: [10000, 10999], amount: 250 },
        { weight: [11000, 11999], amount: 272 },
        { weight: [12000, 12999], amount: 294 },
        { weight: [13000, 13999], amount: 316 },
        { weight: [14000, 14999], amount: 338 },
        { weight: [15000, 15999], amount: 360 },
        { weight: [16000, 16999], amount: 382 },
        { weight: [17000, 17999], amount: 404 },
        { weight: [18000, 18999], amount: 426 },
        { weight: [19000, 19999], amount: 448 },
        { weight: [20000, 20999], amount: 470 },
        { weight: [21000, 21999], amount: 492 },
        { weight: [22000, 22999], amount: 514 },
        { weight: [23000, 23999], amount: 536 },
        { weight: [24000, 24999], amount: 558 },
        { weight: [25000, 25999], amount: 580 },
        { weight: [26000, 26999], amount: 602 },
        { weight: [27000, 27999], amount: 624 },
        { weight: [28000, 28999], amount: 646 },
        { weight: [29000, 29999], amount: 668 },
        { weight: [30000, 30999], amount: 690 },
        { weight: [31000, 31999], amount: 712 },
        { weight: [32000, 32999], amount: 734 },
        { weight: [33000, 33999], amount: 756 },
        { weight: [34000, 34999], amount: 778 },
        { weight: [35000, 35999], amount: 800 },
      ],
    },
    {
      state: "Other_State",
      item: [
        { weight: [1, 1999], amount: 115 },
        { weight: [2000, 2999], amount: 115 },
        { weight: [3000, 3999], amount: 145 },
        { weight: [4000, 4999], amount: 175 },
        { weight: [5000, 5999], amount: 205 },
        { weight: [6000, 6999], amount: 237 },
        { weight: [7000, 7999], amount: 269 },
        { weight: [8000, 8999], amount: 301 },
        { weight: [9000, 9999], amount: 333 },
        { weight: [10000, 10999], amount: 365 },
        { weight: [11000, 11999], amount: 397 },
        { weight: [12000, 12999], amount: 429 },
        { weight: [13000, 13999], amount: 461 },
        { weight: [14000, 14999], amount: 493 },
        { weight: [15000, 15999], amount: 525 },
        { weight: [16000, 16999], amount: 557 },
        { weight: [17000, 17999], amount: 589 },
        { weight: [18000, 18999], amount: 621 },
        { weight: [19000, 19999], amount: 653 },
        { weight: [20000, 20999], amount: 685 },
        { weight: [21000, 21999], amount: 717 },
        { weight: [22000, 22999], amount: 749 },
        { weight: [23000, 23999], amount: 781 },
        { weight: [24000, 24999], amount: 813 },
        { weight: [25000, 25999], amount: 845 },
        { weight: [26000, 26999], amount: 877 },
        { weight: [27000, 27999], amount: 909 },
        { weight: [28000, 28999], amount: 941 },
        { weight: [29000, 29999], amount: 973 },
        { weight: [30000, 30999], amount: 1005 },
        { weight: [31000, 31999], amount: 1037 },
        { weight: [32000, 32999], amount: 1069 },
        { weight: [33000, 33999], amount: 1101 },
        { weight: [34000, 34999], amount: 1133 },
        { weight: [35000, 35999], amount: 1165 },
      ],
    },
  ];
  return res.status(200).json({ message: data });
});

route
  .route("/get-delivery-users/:s_state")
  .get(userProtect, async (req, res) => {
    try {
      const { s_state } = req.params;

      let data = [
        {
          state: "tamilnadu",
          item: [
            { weight: [1, 1999], amount: 80 },

            { weight: [2000, 2999], amount: 80 },
            { weight: [3000, 3999], amount: 100 },
            { weight: [4000, 4999], amount: 120 },
            { weight: [5000, 5999], amount: 140 },
            { weight: [6000, 6999], amount: 162 },
            { weight: [7000, 7999], amount: 184 },
            { weight: [8000, 8999], amount: 206 },
            { weight: [9000, 9999], amount: 228 },
            { weight: [10000, 10999], amount: 250 },
            { weight: [11000, 11999], amount: 272 },
            { weight: [12000, 12999], amount: 294 },
            { weight: [13000, 13999], amount: 316 },
            { weight: [14000, 14999], amount: 338 },
            { weight: [15000, 15999], amount: 360 },
            { weight: [16000, 16999], amount: 382 },
            { weight: [17000, 17999], amount: 404 },
            { weight: [18000, 18999], amount: 426 },
            { weight: [19000, 19999], amount: 448 },
            { weight: [20000, 20999], amount: 470 },
            { weight: [21000, 21999], amount: 492 },
            { weight: [22000, 22999], amount: 514 },
            { weight: [23000, 23999], amount: 536 },
            { weight: [24000, 24999], amount: 558 },
            { weight: [25000, 25999], amount: 580 },
            { weight: [26000, 26999], amount: 602 },
            { weight: [27000, 27999], amount: 624 },
            { weight: [28000, 28999], amount: 646 },
            { weight: [29000, 29999], amount: 668 },
            { weight: [30000, 30999], amount: 690 },
            { weight: [31000, 31999], amount: 712 },
            { weight: [32000, 32999], amount: 734 },
            { weight: [33000, 33999], amount: 756 },
            { weight: [34000, 34999], amount: 778 },
            { weight: [35000, 35999], amount: 800 },
          ],
        },
        {
          state: "Other_State",
          item: [
            { weight: [1, 1999], amount: 115 },
            { weight: [2000, 2999], amount: 115 },
            { weight: [3000, 3999], amount: 145 },
            { weight: [4000, 4999], amount: 175 },
            { weight: [5000, 5999], amount: 205 },
            { weight: [6000, 6999], amount: 237 },
            { weight: [7000, 7999], amount: 269 },
            { weight: [8000, 8999], amount: 301 },
            { weight: [9000, 9999], amount: 333 },
            { weight: [10000, 10999], amount: 365 },
            { weight: [11000, 11999], amount: 397 },
            { weight: [12000, 12999], amount: 429 },
            { weight: [13000, 13999], amount: 461 },
            { weight: [14000, 14999], amount: 493 },
            { weight: [15000, 15999], amount: 525 },
            { weight: [16000, 16999], amount: 557 },
            { weight: [17000, 17999], amount: 589 },
            { weight: [18000, 18999], amount: 621 },
            { weight: [19000, 19999], amount: 653 },
            { weight: [20000, 20999], amount: 685 },
            { weight: [21000, 21999], amount: 717 },
            { weight: [22000, 22999], amount: 749 },
            { weight: [23000, 23999], amount: 781 },
            { weight: [24000, 24999], amount: 813 },
            { weight: [25000, 25999], amount: 845 },
            { weight: [26000, 26999], amount: 877 },
            { weight: [27000, 27999], amount: 909 },
            { weight: [28000, 28999], amount: 941 },
            { weight: [29000, 29999], amount: 973 },
            { weight: [30000, 30999], amount: 1005 },
            { weight: [31000, 31999], amount: 1037 },
            { weight: [32000, 32999], amount: 1069 },
            { weight: [33000, 33999], amount: 1101 },
            { weight: [34000, 34999], amount: 1133 },
            { weight: [35000, 35999], amount: 1165 },
          ],
        },
      ];
      const { _id } = req.user;

      const cartItems = await Cart.find({
        cart_user_user_Id: _id,
        is_deleted: false,
      });

      let data1 =
        data.find((item) => item.state === s_state) ||
        data.find((item) => item.state === "Other_State");

      let result = cartItems.reduce((acc, value) => {
        return (acc += value.cart_price * value.cart_quantity);
      }, 0);

      let TotalAmount = cartItems
        .map((item1) =>
          data1.item.filter(
            (item2) =>
              item2.weight[0] <= item1?.weight &&
              item2.weight[1] >= item1?.weight
          )
        )
        .flat();

      let amountDelivery = TotalAmount.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);

      return res
        .status(200)
        .json({ message: result, totalAmount: amountDelivery });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

// route.route("/api/app-delivery/:state").get(async (req, res) => {
//   try {
//     const { state } = req.params;
//     const { deliveryCharge } = req.body;

//     let stateCharge;

//     if (state === "tamilnadu") {
//       switch (true) {
//         case deliveryCharge >= 1 && deliveryCharge <= 1999:
//           console.log(deliveryCharge)
//           stateCharge = 80;
//           break;

//         case deliveryCharge >= 2000 && deliveryCharge <= 2999:
//           stateCharge = 80;
//           break;
//         case deliveryCharge >= 3000 && deliveryCharge <= 3999:
//           stateCharge = 100;
//           break;

//         case deliveryCharge >= 4000 && deliveryCharge <= 4999:
//           stateCharge = 120;
//           break;

//         case deliveryCharge >= 5000 && deliveryCharge <= 5999:
//           stateCharge = 140;
//           break;
//         case deliveryCharge >= 6000 && deliveryCharge <= 6999:
//           stateCharge = 162;
//           break;
//         case deliveryCharge >= 7000 && deliveryCharge <= 7999:
//           stateCharge = 184;
//           break;
//         case deliveryCharge >= 8000 && deliveryCharge <= 8999:
//           stateCharge = 206;
//           break;
//         case deliveryCharge >= 9000 && deliveryCharge <= 9999:
//           stateCharge = 228;
//           break;
//         case deliveryCharge >= 10000 && deliveryCharge <= 10999:
//           stateCharge = 250;
//           break;
//         case deliveryCharge >= 11000 && deliveryCharge <= 11999:
//           stateCharge = 272;
//           break;
//         case deliveryCharge >= 12000 && deliveryCharge <= 12999:
//           stateCharge = 294;
//           break;
//         case deliveryCharge >= 13000 && deliveryCharge <= 13999:
//           stateCharge = 316;
//           break;
//         case deliveryCharge >= 14000 && deliveryCharge <= 14999:
//           stateCharge = 338;
//           break;
//         case deliveryCharge >= 15000 && deliveryCharge <= 15999:
//           stateCharge = 360;
//           break;
//         case deliveryCharge >= 16000 && deliveryCharge <= 16999:
//           stateCharge = 382;
//           break;
//         case deliveryCharge >= 17000 && deliveryCharge <= 17999:
//           stateCharge = 404;
//           break;
//         case deliveryCharge >= 18000 && deliveryCharge <= 18999:
//           stateCharge = 426;
//           break;
//         case deliveryCharge >= 19000 && deliveryCharge <= 19999:
//           stateCharge = 448;
//           break;
//         case deliveryCharge >= 20000 && deliveryCharge <= 20999:
//           stateCharge = 470;
//           break;
//         case deliveryCharge >= 21000 && deliveryCharge <= 21999:
//           stateCharge = 492;
//           break;
//         case deliveryCharge >= 22000 && deliveryCharge <= 22999:
//           stateCharge = 514;
//           break;
//         case deliveryCharge >= 23000 && deliveryCharge <= 23999:
//           stateCharge = 536;
//           break;
//         case deliveryCharge >= 24000 && deliveryCharge <= 24999:
//           stateCharge = 558;
//           break;
//         case deliveryCharge >= 25000 && deliveryCharge <= 25999:
//           stateCharge = 580;
//           break;
//         case deliveryCharge >= 26000 && deliveryCharge <= 26999:
//           stateCharge = 602;
//           break;
//         case deliveryCharge >= 27000 && deliveryCharge <= 27999:
//           stateCharge = 624;
//           break;
//         case deliveryCharge >= 28000 && deliveryCharge <= 28999:
//           stateCharge = 646;
//           break;
//         case deliveryCharge >= 29000 && deliveryCharge <= 29999:
//           stateCharge = 668;
//           break;
//         case deliveryCharge >= 30000 && deliveryCharge <= 30999:
//           stateCharge = 690;
//           break;
//         case deliveryCharge >= 31000 && deliveryCharge <= 31999:
//           stateCharge = 712;
//           break;
//         case deliveryCharge >= 32000 && deliveryCharge <= 32999:
//           stateCharge = 734;
//           break;
//         case deliveryCharge >= 33000 && deliveryCharge <= 33999:
//           stateCharge = 756;
//           break;
//         case deliveryCharge >= 34000 && deliveryCharge <= 34999:
//           stateCharge = 778;
//           break;
//         case deliveryCharge >= 35000 && deliveryCharge <= 35999:
//           stateCharge = 800;
//           break;
//         default:
//           stateCharge = 0;
//       }
//       return res.status(200).json({ stateCharge });
//     } else {
//       switch (true) {
//         case deliveryCharge >= 1 && deliveryCharge <= 1999:
//           stateCharge = 115;
//           break;

//         case deliveryCharge >= 2000 && deliveryCharge <= 2999:
//           stateCharge = 115;
//           break;
//         case deliveryCharge >= 3000 && deliveryCharge <= 3999:
//           stateCharge = 145;
//           break;

//         case deliveryCharge >= 4000 && deliveryCharge <= 4999:
//           stateCharge = 175;
//           break;

//         case deliveryCharge >= 5000 && deliveryCharge <= 5999:
//           stateCharge = 205;
//           break;
//         case deliveryCharge >= 6000 && deliveryCharge <= 6999:
//           stateCharge = 237;
//           break;
//         case deliveryCharge >= 7000 && deliveryCharge <= 7999:
//           stateCharge = 269;
//           break;
//         case deliveryCharge >= 8000 && deliveryCharge <= 8999:
//           stateCharge = 301;
//           break;
//         case deliveryCharge >= 9000 && deliveryCharge <= 9999:
//           stateCharge = 333;
//           break;
//         case deliveryCharge >= 10000 && deliveryCharge <= 10999:
//           stateCharge = 365;
//           break;
//         case deliveryCharge >= 11000 && deliveryCharge <= 11999:
//           stateCharge = 397;
//           break;
//         case deliveryCharge >= 12000 && deliveryCharge <= 12999:
//           stateCharge = 429;
//           break;
//         case deliveryCharge >= 13000 && deliveryCharge <= 13999:
//           stateCharge = 316;
//           break;
//         case deliveryCharge >= 14000 && deliveryCharge <= 14999:
//           stateCharge = 338;
//           break;
//         case deliveryCharge >= 15000 && deliveryCharge <= 15999:
//           stateCharge = 360;
//           break;
//         case deliveryCharge >= 16000 && deliveryCharge <= 16999:
//           stateCharge = 382;
//           break;
//         case deliveryCharge >= 17000 && deliveryCharge <= 17999:
//           stateCharge = 404;
//           break;
//         case deliveryCharge >= 18000 && deliveryCharge <= 18999:
//           stateCharge = 426;
//           break;
//         case deliveryCharge >= 19000 && deliveryCharge <= 19999:
//           stateCharge = 448;
//           break;
//         case deliveryCharge >= 20000 && deliveryCharge <= 20999:
//           stateCharge = 470;
//           break;
//         case deliveryCharge >= 21000 && deliveryCharge <= 21999:
//           stateCharge = 492;
//           break;
//         case deliveryCharge >= 22000 && deliveryCharge <= 22999:
//           stateCharge = 514;
//           break;
//         case deliveryCharge >= 23000 && deliveryCharge <= 23999:
//           stateCharge = 536;
//           break;
//         case deliveryCharge >= 24000 && deliveryCharge <= 24999:
//           stateCharge = 558;
//           break;
//         case deliveryCharge >= 25000 && deliveryCharge <= 25999:
//           stateCharge = 580;
//           break;
//         case deliveryCharge >= 26000 && deliveryCharge <= 26999:
//           stateCharge = 602;
//           break;
//         case deliveryCharge >= 27000 && deliveryCharge <= 27999:
//           stateCharge = 624;
//           break;
//         case deliveryCharge >= 28000 && deliveryCharge <= 28999:
//           stateCharge = 646;
//           break;
//         case deliveryCharge >= 29000 && deliveryCharge <= 29999:
//           stateCharge = 668;
//           break;
//         case deliveryCharge >= 30000 && deliveryCharge <= 30999:
//           stateCharge = 690;
//           break;
//         case deliveryCharge >= 31000 && deliveryCharge <= 31999:
//           stateCharge = 712;
//           break;
//         case deliveryCharge >= 32000 && deliveryCharge <= 32999:
//           stateCharge = 734;
//           break;
//         case deliveryCharge >= 33000 && deliveryCharge <= 33999:
//           stateCharge = 756;
//           break;
//         case deliveryCharge >= 34000 && deliveryCharge <= 34999:
//           stateCharge = 778;
//           break;
//         case deliveryCharge >= 35000 && deliveryCharge <= 35999:
//           stateCharge = 800;
//           break;
//         default:
//           stateCharge = 0;
//       }
//       return res.status(200).json({ stateCharge });

//     }
//   } catch (error) {

//   }
// });

route.route("/api/app-delivery/:state/:weight").get(async (req, res) => {
  try {
    const { state ,weight} = req.params;
    const weightCalc = weight *1

    const charges = [
      { max: 1999, tamilnadu: 80, other: 115 },
      { max: 2999, tamilnadu: 80, other: 115 },
      { max: 3999, tamilnadu: 100, other: 145 },
      { max: 4999, tamilnadu: 120, other: 175 },
      { max: 5999, tamilnadu: 140, other: 205 },
      { max: 6999, tamilnadu: 162, other: 237 },
      { max: 7999, tamilnadu: 184, other: 269 },
      { max: 8999, tamilnadu: 206, other: 301 },
      { max: 9999, tamilnadu: 228, other: 333 },
      { max: 10999, tamilnadu: 250, other: 365 },
      { max: 11999, tamilnadu: 272, other: 397 },
      { max: 12999, tamilnadu: 294, other: 429 },
      { max: 13999, tamilnadu: 316, other: 461 },
      { max: 14999, tamilnadu: 338, other: 493 },
      { max: 15999, tamilnadu: 360, other: 525 },
      { max: 16999, tamilnadu: 382, other: 557 },
      { max: 17999, tamilnadu: 404, other: 589 },
      { max: 18999, tamilnadu: 426, other: 621 },
      { max: 19999, tamilnadu: 448, other: 653 },
      { max: 20999, tamilnadu: 470, other: 685 },
      { max: 21999, tamilnadu: 492, other: 717 },
      { max: 22999, tamilnadu: 514, other: 749 },
      { max: 23999, tamilnadu: 536, other: 781 },
      { max: 24999, tamilnadu: 558, other: 813 },
      { max: 25999, tamilnadu: 580, other: 845 },
      { max: 26999, tamilnadu: 602, other: 877 },
      { max: 27999, tamilnadu: 624, other: 909 },
      { max: 28999, tamilnadu: 646, other: 941 },
      { max: 29999, tamilnadu: 668, other: 973 },
      { max: 30999, tamilnadu: 690, other: 1005 },
      { max: 31999, tamilnadu: 712, other: 1037 },
      { max: 32999, tamilnadu: 734, other: 1069 },
      { max: 33999, tamilnadu: 756, other: 1101 },
      { max: 34999, tamilnadu: 778, other: 1133 },
      { max: 35999, tamilnadu: 800, other: 1165 },
    ];

    const stateCharge =
      charges.find((c) => weightCalc <= c.max)[
        state === "tamilnadu" ? "tamilnadu" : "other"
      ] || 0;

      

    res.status(200).json({ stateCharge });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = route;
