module.exports = function(sequelize, DataTypes) {   
    const autolineColorMaster = sequelize.define("autolineColorMaster", {
        autoline_color_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        color_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, 
    {
        tableName: 'autoline_color',
        timestamps: false,
        classMethods: {}
    });
    return autolineColorMaster;
};