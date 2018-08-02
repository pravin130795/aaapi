module.exports = function (sequelize, DataTypes) {
    const specsMaster = sequelize.define("specsMaster", {
        specs_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        specs_heading_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        value: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        value_arabic: {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:7
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'specification_master',
        timestamps: false,
        classMethods: {}
    });
    specsMaster.belongsTo(sequelize.models.specsHeadingMaster, {'as': 'specs_heading', targetKey: 'specs_heading_id', foreignKey: 'specs_heading_id'})
    return specsMaster;
};