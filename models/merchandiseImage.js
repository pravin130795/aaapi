module.exports = function(sequelize, DataTypes) {   
    let merchandise_image = sequelize.define("merchandise_image", {
        image_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        merchandise_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'merchandise_image',
        timestamps: false,
        classMethods: {}
    });

    return merchandise_image;
};