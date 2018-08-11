module.exports = function(sequelize, DataTypes) {   
    const location_master = sequelize.define("master_location", {
        location_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false
        },
        location_name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }, {
        tableName: 'master_location',
        timestamps: false,
        classMethods: {}
    });
    return location_master;
};