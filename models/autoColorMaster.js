module.exports = function(sequelize, DataTypes) {   
    const colorMaster = sequelize.define("colorMaster", {
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        name_arabic: {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        color_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, 
    {
        tableName: 'colors',
        timestamps: false,
        classMethods: {}
    });
    return colorMaster;
};