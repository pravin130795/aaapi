module.exports = function (sequelize, DataTypes) {
    const specsValueMap = sequelize.define("specsValueMap", {
        specs_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        value: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true
        },
        value_arabic: {
            type: DataTypes.STRING(40),
            allowNull: true
        }
    }, {
        tableName: 'specs_value_map',
        timestamps: false,
        classMethods: {}
    });
    specsValueMap.belongsTo(sequelize.models.specsMaster, {'as': 'specs_values', targetKey: 'specs_id', foreignKey: 'specs_id'})
    return specsValueMap;
};