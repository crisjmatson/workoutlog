const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validate-session");
const WorkoutLog = require("../db").import("../models/log");

// Allows users to create a workout log with descriptions, definitions, results, and owner properties.
router.post("/", validateSession, (req, res) => {
	const logEntry = {
		description: req.body.describe,
		definition: req.body.title,
		result: req.body.finish,
		owner_id: req.user.id,
	};
	WorkoutLog.create(logEntry)
		.then((workoutlog) => res.status(200).json(workoutlog))
		.catch((err) => res.status(500).json({ error: err }));
});

// Allows individual logs to be deleted by a user.
router.delete("/:id", validateSession, (req, res) => {
	const query = { where: { id: req.params.id, owner_id: req.user.id } };
	WorkoutLog.destroy(query)
		.then(() => res.status(200).json({ message: "Log Removed" }))
		.catch((err) => res.status(500).json({ error: err }));
});

// Gets all logs for an individual user.
router.get("/", validateSession, (req, res) => {
	WorkoutLog.findAll({
		where: { owner_id: req.user.id },
	})
		.then((response) => res.status(200).json(response))
		.catch((err) => res.status(500).json({ error: err }));
});

// Gets individual logs by id for an individual user.
router.get("/:id", validateSession, (req, res) => {
	WorkoutLog.findOne({
		where: { id: req.params.id, owner_id: req.user.id },
	}).then((response) =>
		res
			.status(200)
			.json(response)
			.catch((err) =>
				res
					.status(500)
					.json(
						{ message: "Log not found / Not available to current user" },
						{ error: err }
					)
			)
	);
});

// Allows individual logs to be updated by a user.
router.put("/:id", validateSession, (req, res) => {
	const updateLogEntry = {
		description: req.body.describe,
		definition: req.body.title,
		result: req.body.finish,
	};
	const query = {
		where: { id: req.params.id, owner_id: req.user.id },
	};
	WorkoutLog.update(updateLogEntry, query).then((updatedLog) =>
		res
			.status(200)
			.json(updatedLog)
			.catch((err) => res.status(500).json({ error: err }))
	);
});

module.exports = router;
