module.exports = function(sequelize, DataTypes) {   
    let paymentMatrixMaster = sequelize.define("paymentMatrixMaster", {
        payment_mtrx_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        from_area: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        to_area: {
            type:DataTypes.INTEGER,
            allowNull:false,
            unique: true
        },
        price:{
            type:DataTypes.DECIMAL,
            allowNull:false
        },
        created_at:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW
        },
        updated_at:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW
        },
        created_by:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 07
        },
        updated_by:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 07
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }

    }, {
        tableName: 'payment_matrix',
        timestamps: false,
        classMethods: {}
    });
    paymentMatrixMaster.belongsTo(sequelize.models.areaMaster, {'as': 'from_area_map', targetKey: 'area_id', foreignKey: 'from_area'});
    paymentMatrixMaster.belongsTo(sequelize.models.areaMaster, {'as': 'to_area_map', targetKey: 'area_id', foreignKey: 'to_area'});
    return paymentMatrixMaster;
};