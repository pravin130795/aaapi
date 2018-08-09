module.exports = function(sequelize, DataTypes) {   
    const autolineStatusMaster = sequelize.define("autolineStatusMaster", {
        autoline_status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, 
    {
        tableName: 'autoline_status_master',
        timestamps: false,
        classMethods: {}
    });
    return autolineStatusMaster;
};