module.exports = function (sequelize, DataTypes) {
    const magazineMaster = sequelize.define("magazineMaster", {
        magazine_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        name_arabic: {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(140),
            allowNull: false
        },
        description_arabic: {
            type: DataTypes.STRING(140),
            allowNull: true
        },
        upload_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        file_type: {
            type: DataTypes.ENUM('pdf', 'doc'),
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
        tableName: 'master_magazine',
        timestamps: false,
        classMethods: {}
    });
    return magazineMaster;
};