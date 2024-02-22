module.exports = (sequelize, DataTypes) => {
  const Units = sequelize.define("units", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CF: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Units;
};
