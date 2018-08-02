module.exports = function(sequelize, DataTypes) {   
    const color_master = sequelize.define("color_master", {
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        autoline_color: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        arabic_color: {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        color_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, 
    {
        timestamps: false,
        classMethods: {}
    });
    return color_master;
};