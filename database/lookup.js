module.exports = function(sequelize, DataTypes) {   
    let lookupMaster = sequelize.define("lookupMaster", {
        lookup_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        body_name:{
            type:DataTypes.STRING(40),
            allowNull:false,
            unique: true
        },
        type:{
            type:DataTypes.ENUM('CPOV', 'New Car'),
            allowNull:false
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
        tableName: 'lookup_master',
        timestamps: false,
        classMethods: {}
    });
    return lookupMaster;
};