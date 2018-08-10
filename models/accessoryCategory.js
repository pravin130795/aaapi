module.exports = function (sequelize, DataTypes) {
    const accessoryCatMaster = sequelize.define("accessoryCatMaster", {
        accessory_cat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true
        },
        name_arabic: {
            type: DataTypes.STRING(40),
            allowNull: true,
            //unique: true
        },
        sequence: {
            type: DataTypes.INTEGER,
            allowNull: false
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
            allowNull: false,
            defaultValue:7
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'accessory_category',
        timestamps: false,
        classMethods: {}
    });
    return accessoryCatMaster;
};