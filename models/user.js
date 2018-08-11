module.exports = function(sequelize, DataTypes) {   
    let users = sequelize.define("users", {
        user_id: {
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
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        mobile_no:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        approver_person:{
            type:DataTypes.STRING,
            allowNull:false
        },
        module_name:{
            type:DataTypes.ENUM('New Car', 'CPOV', 'After sale'),
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
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        updated_by:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }

    }, {
        tableName: 'users',
        timestamps: false,
        classMethods: {}
    });
    users.belongsTo(sequelize.models.designation, {
        as: 'designation_details', 
        targetKey:'designation_id',
        foreignKey: 'designation_id'
    });
    return users;
};