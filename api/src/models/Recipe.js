const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {

    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    healthScore:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false
    },

    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    
  });
};
