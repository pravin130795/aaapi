module.exports = function(sequelize, DataTypes) {   
    const actionMaster = sequelize.define("actionMaster", {
        action_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        action_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        tableName: 'action_master',
        timestamps: false,
        classMethods: {}
    });
    return actionMaster;
};