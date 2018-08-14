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
        is_model_overview: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        is_variant_overview: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 07
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 07
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'specification_master',
        timestamps: false,
        classMethods: {}
    });
    specsMaster.belongsTo(sequelize.models.specsHeadingMaster, {'as': 'specs_heading', targetKey: 'specs_heading_id', foreignKey: 'specs_heading_id'})
    return specsMaster;
};