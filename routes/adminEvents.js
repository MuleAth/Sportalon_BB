const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/Events");

router.post("/", async (req, res) => {
  try {
    const {
      title,
      startDate,
      endDate,
      location,
      organizer,
      contact,
      description,
      rules,
      prizes,
      sportsCategory,
      applyLastDate,
      coordinator_name,
      coordinator_no,
      _id, // Created by user ID
    } = req.body;

    // Create new event with all fields
    const event = await Event.create({
      title,
      startDate,
      endDate,
      location,
      organizer,
      contact,
      description,
      rules,
      prizes,
      sportsCategory,
      applyLastDate,
      coordinator_name,
      coordinator_no,
      createdBy: _id,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "fullname email")
      .populate("participants", "fullname email mobile_number");

    res.json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Get single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "fullname email")
      .populate("participants", "fullname email mobile_number");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    return res.json({
      success: true,
      message: "Event deleted successfully",
      event: deletedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
