module.exports = function(sequelize, DataTypes) {   
    const menu_item = sequelize.define("menu_item", {
        menu_item_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        menu_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        menu_item_name: {
            type: DataTypes.STRING(40),
            allowNull: false,
            trim: true
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
        },
        always_shown:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        is_shown:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }
    }, {
        tableName: 'menu_item',
        timestamps: false,
        classMethods: {}
    });
    menu_item.belongsTo(sequelize.models.menu, {
        foreignKey: 'menu_id'
    });
    return menu_item;
};