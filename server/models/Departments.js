module.exports = (sequelize, DataTypes) => {
  const Departments = sequelize.define("departments", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chairperson_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Departments;
};
