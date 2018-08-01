module.exports = function(sequelize, DataTypes) {   
    let MasterBank = sequelize.define("bank_EMI", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        bank_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        emi:{
            type:DataTypes.DECIMAL(10,2),
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
    return MasterBank;
};