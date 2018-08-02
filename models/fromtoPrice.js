module.exports = function(sequelize, DataTypes) {   
    let fromToPriceMaster = sequelize.define("fromToPriceMaster", {
        from_to_price_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        from_price:{
            type:DataTypes.DECIMAL,
            allowNull:false,
            unique: true
        },
        to_price:{
            type:DataTypes.DECIMAL,
            allowNull:false,
            unique: true
        },
        type:{
            type:DataTypes.ENUM('CPOV', 'New Car'),
            allowNull:false,
            unique: true
        },
        created_at:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updated_at:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        created_by:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        updated_by:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }

    }, {
        tableName: 'from_to_price',
        timestamps: false,
        classMethods: {}
    });
    return fromToPriceMaster;
};