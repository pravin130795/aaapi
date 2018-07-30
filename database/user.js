module.exports = function(sequelize, DataTypes) {   
    return sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        user_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        designation_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        role_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        mobile:{
            type:DataTypes.STRING,
            allowNull:false
        },
        approver_person:{
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
        tableName: 'user',
        timestamps: false,
        classMethods: {}
    });
};