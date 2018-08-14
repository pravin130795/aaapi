module.exports = function (sequelize, DataTypes) {
    let faqMaster = sequelize.define("faqMaster", {
        faq_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        qstn_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        qstn: {
            type: DataTypes.STRING(140),
            allowNull: false,
            unique: true
        },
        answer: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 07
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 07
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_approved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'faq_master',
        timestamps: false,
        classMethods: {}
    });
    faqMaster.belongsTo(sequelize.models.faqTypeMaster, {'as': 'qstn_type', targetKey: 'faq_type_id', foreignKey: 'qstn_type_id'})
    return faqMaster;
};