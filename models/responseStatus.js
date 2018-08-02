module.exports = function(sequelize, DataTypes) {   
    let responseStatusMaster = sequelize.define("responseStatusMaster", {
        rsp_status_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        status:{
            type:DataTypes.STRING(40),
            allowNull:false,
            unique: true
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        created_at:{
            type:DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        created_by:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        updated_at:{
            type:DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_by:{
            type:DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'response_status',
        timestamps: false,
        classMethods: {}
    });
    return responseStatusMaster;
};