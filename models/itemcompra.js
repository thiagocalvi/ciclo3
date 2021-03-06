'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemCompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ItemCompra.belongsTo(models.Produto, {
        foreignKey: 'ProdutoId', as: 'produtos'
      });
      ItemCompra.belongsTo(models.Compra), {
        foreignKey: 'CompraId', as: 'compras'
      };
    }
  };
  ItemCompra.init({
    CompraId: DataTypes.INTEGER,
    ProdutoId: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ItemCompra',
  });
  return ItemCompra;
};