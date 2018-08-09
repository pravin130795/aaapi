module.exports = function(sequelize, DataTypes) {   
    const actionMap = sequelize.define("actionMap", {
        menu_item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        action_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'actions_map',
        timestamps: false,
        classMethods: {}
    });
    actionMap.belongsTo(sequelize.models.menu_item, {'as': 'menu_item', targetKey: 'menu_item_id', foreignKey: 'menu_item_id'}),
    actionMap.belongsTo(sequelize.models.actionMaster, {'as': 'action', targetKey: 'action_id', foreignKey: 'action_id'})
    return actionMap;
};