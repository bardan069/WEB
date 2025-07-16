import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";
import { User } from "../user/User.js";

export const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, { timestamps: true });

Order.belongsTo(User, { foreignKey: 'userId' }); 