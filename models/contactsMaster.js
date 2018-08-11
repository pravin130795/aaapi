module.exports = function(sequelize, DataTypes) {   
    let contactsMaster = sequelize.define("contactsMaster", {
        contact_id: {
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
        contact_no:{
            type:DataTypes.STRING(20),
            allowNull:false
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
        tableName: 'contact_master',
        timestamps: false,
        classMethods: {}
    });
    return contactsMaster;
};