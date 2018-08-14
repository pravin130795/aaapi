module.exports = function (sequelize, DataTypes) {
    const merchandiseStockMaster = sequelize.define("merchandise_stock", {
        merchandise_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        autoline_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        merchandise_cat_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        merchandise_name: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true
        },
        merchandise_name_arabic: {
            type: DataTypes.STRING(40),
            allowNull: true,
            //unique: true
        },
        merchandise_description: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        merchandise_specification: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        is_new_arrivals: {
            type: DataTypes.ENUM('Yes', 'No'),
            allowNull: false
        },
        default_image:{
            type:DataTypes.STRING,
            allowNull:false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
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
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        tableName: 'merchandise_stock',
        timestamps: false,
        classMethods: {}
    });

    merchandiseStockMaster.hasMany(sequelize.models.merchandise_image, {
        as: 'merchandise_images', 
        foreignKey: 'merchandise_id',
        targetKey: 'merchandise_id'
    });
    merchandiseStockMaster.belongsTo(sequelize.models.merchandiseCatMaster, {
        as: 'merchandise_category', 
        foreignKey: 'merchandise_cat_id',
        targetKey: 'merchandise_cat_id'
    });
    return merchandiseStockMaster;
};