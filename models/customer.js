module.exports = function(sequelize, DataTypes) {   
    const customer = sequelize.define("customer", {
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        autoline_cust_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        autoline_civil_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        autoline_fname: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        autoline_lname: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        autoline_mobile: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        secondary_mobile: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true
        },
        is_registered: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female'),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nationality: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        age_group: {
            type: DataTypes.ENUM('18-30', '30-50', '50-60'),
            allowNull: false
        },
        is_app_installed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        language: {
            type: DataTypes.ENUM('English', 'Arabic'),
            allowNull: false
        },
        last_used: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    }, 
    {
        timestamps: false,
        classMethods: {}
    });
    return customer;
};