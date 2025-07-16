import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";
import { Order } from "./Order.js";
import { Product } from "../product/Product.js";

export const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' }); 