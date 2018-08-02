module.exports = function(sequelize, DataTypes) {   
    let areaMaster = sequelize.define("areaMaster", {
        area_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        name:{
            type:DataTypes.STRING(40),
            allowNull:false,
            unique: true
        },
        type:{
            type:DataTypes.STRING(40),
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
            allowNull:false
        },
        updated_by:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }

    }, {
        tableName: 'master_area',
        timestamps: false,
        classMethods: {}
    });
    return areaMaster;
};