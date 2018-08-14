module.exports = function(sequelize, DataTypes) {   
    const userSession = sequelize.define("userSession", {
        user_session_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        user_type:{
            type:DataTypes.STRING,
            allowNull:false
        },
        uid:{
            type:DataTypes.STRING,
            allowNull:false
        },
        ttl:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }, {
        tableName: 'user_session',
        timestamps: false,
        classMethods: {}
    });

    return userSession;

};