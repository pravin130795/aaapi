module.exports = function (sequelize, DataTypes) {
    const stockMaster = sequelize.define("stockMaster", {
        stock_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        is_variant: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        current_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        stock: {
            type: DataTypes.ENUM('Available', 'Running Low', 'Out of Stock'),
            allowNull: false
        },
        limit: {
            type: DataTypes.ENUM('Greater than', 'Less than'),
            allowNull: false
        },
        range: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'stock_master',
        timestamps: false,
        classMethods: {}
    });
    return stockMaster;
};