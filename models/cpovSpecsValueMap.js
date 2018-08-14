module.exports = function (sequelize, DataTypes) {
    const cpovSpecsValueMap = sequelize.define("cpovSpecsValueMap", {
        cpov_specs_id: {
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
        tableName: 'cpov_specs_value_map',
        timestamps: false,
        classMethods: {}
    });
    cpovSpecsValueMap.belongsTo(sequelize.models.cpovSpecsMaster, {'as': 'cpov_specs_values', targetKey: 'cpov_specs_id', foreignKey: 'cpov_specs_id'})
    return cpovSpecsValueMap;
};