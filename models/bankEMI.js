module.exports = function(sequelize, DataTypes) {   
    let bankMaster = sequelize.define("bankMaster", {
        bank_id: {
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
        emi:{
            type:DataTypes.FLOAT,
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
            allowNull: false,
            defaultValue: 07
        },
        updated_by:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 07
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }

    }, {
        tableName: 'bank_emi_master',
        timestamps: false,
        classMethods: {}
    });
    return bankMaster;
};