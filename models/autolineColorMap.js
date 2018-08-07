module.exports = function(sequelize, DataTypes) {   
    const autolineColorMap = sequelize.define("autolineColorMap", {
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        autoline_color_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    }, 
    {
        tableName: 'autoline_to_color',
        timestamps: false,
        classMethods: {}
    });
    autolineColorMap.belongsTo(sequelize.models.colorMaster, {'as': 'autoLine_colors', targetKey: 'color_id', foreignKey: 'color_id'});
    autolineColorMap.belongsTo(sequelize.models.autolineColorMaster, {'as': 'autoLine_color_map', targetKey: 'autoline_color_id', foreignKey: 'autoline_color_id'});
    return autolineColorMap;
};