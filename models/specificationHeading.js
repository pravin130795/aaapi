module.exports = function (sequelize, DataTypes) {
    const specsHeadingMaster = sequelize.define("specsHeadingMaster", {
        specs_heading_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        sequence: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'specification_heading',
        timestamps: false,
        classMethods: {}
    });
    return specsHeadingMaster;
};