const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true
    },
    name: {type: DataTypes.STRING,
      allowNull: false
    },
    attack:{type: DataTypes.INTEGER,
      allowNull:false
    },
    defense:{type: DataTypes.INTEGER,
      allowNull:false
    },
    height:{type: DataTypes.INTEGER,
        allowNull:true
    },
    weight:{type: DataTypes.INTEGER,
      allowNull:true
    },
    life:{type: DataTypes.INTEGER,
      allowNull:false
    },
    image:{type: DataTypes.STRING,
      allowNull:false
    },
    typess: {type: DataTypes.JSON,
      allowNull: false
    },
    velocity:{type: DataTypes.INTEGER,
      allowNull:true
    },
  },{createdAt:false,updatedAt:false});
};
