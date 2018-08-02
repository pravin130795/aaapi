module.exports = function(sequelize, DataTypes) {   
    let kmMaster = sequelize.define("kmMaster", {
        km_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        km_value:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique: true
        },
        is_active: {
            type:DataTypes.BOOLEAN,
            allowNull: false
        },
        created_by:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        created_at: {
            type:DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updated_by:{
            type:DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'km_master',
        timestamps: false,
        classMethods: {}
    });
    return kmMaster;
};