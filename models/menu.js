module.exports = function(sequelize, DataTypes) {   
    return sequelize.define("menu", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        menu:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image: {
            type: DataTypes.TEXT,
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
        }
    }, {
        tableName: 'menu',
        timestamps: false,
        classMethods: {}
    });
};