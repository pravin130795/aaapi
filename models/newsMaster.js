module.exports = function (sequelize, DataTypes) {
    const newsMaster = sequelize.define("newsMaster", {
        news_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(140),
            allowNull: false
        },
        url: {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        update_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        is_approved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 07
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 07
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'master_news',
        timestamps: false,
        classMethods: {}
    });
    return newsMaster;
};