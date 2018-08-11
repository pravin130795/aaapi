module.exports = function(sequelize, DataTypes) {   
    let emailMaster = sequelize.define("emailMaster", {
        email_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        module_name:{
            type:DataTypes.ENUM('For Service Booking', 'For New Vehicle', 'For Road Side Assistant', 'For Accessories'),
            allowNull:false,
            unique: true
        },
        emp_name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(40),
            allowNull: false
        },
        contact_no:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        updated_at:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updated_by:{
            type:DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'email_setup',
        timestamps: false,
        classMethods: {}
    });
    return emailMaster;
};