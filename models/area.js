module.exports = function(sequelize, DataTypes) {   
    let MasterArea = sequelize.define("master_area", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        area_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        area_type:{
            type:DataTypes.STRING,
            allowNull:false
        },
        created_at:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        created_by:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_by:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }

    }, {
        timestamps: false,
        classMethods: {}
    });
    return MasterArea;
};