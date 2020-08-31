module.exports = (sequelize, DataTypes) => {
	const WorkoutLog = sequelize.define("workoutLog", {
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		definition: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		result: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		owner_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});
	return WorkoutLog;
};
