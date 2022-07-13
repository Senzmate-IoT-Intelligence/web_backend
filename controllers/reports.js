const ACCIDENT = require("../models/accidents");
const TRIP = require("../models/trips");
const endOfMonth = require("date-fns/endOfMonth");
const endOfWeek = require("date-fns/endOfWeek");
const endOfYear = require("date-fns/endOfYear");
const getDay = require("date-fns/getDay");
const startOfMonth = require("date-fns/startOfMonth");
const startOfWeek = require("date-fns/startOfWeek");
const startOfYear = require("date-fns/startOfYear");
const getWeekOfMonth = require("date-fns/getWeekOfMonth");
const getMonth = require("date-fns/getMonth");

const reportCntrl = {
  getAccidentCount: async (req, res) => {
    const today = new Date(req.body.date);
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });
    const data = [
      {
        name: "Monday",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Tuesday",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Wednesday",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Thursday",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Friday",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Saturday",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Sunday",
        Accidents: 0,
        Trips: 0,
      },
    ];
    try {
      const trips = await TRIP.find({ day: { $gte: start, $lte: end } });
      const accidents = await ACCIDENT.find({
        day: { $gte: start, $lte: end },
      });
      trips.forEach((trip) => {
        let index = getDay(trip.day);
        index = index === 0 ? 6 : index - 1;
        const point = data[index];
        data[index] = { ...point, Trips: point.Trips + trip.trip_count };
      });
      accidents.forEach((accident) => {
        let index = getDay(accident.day);
        index = index === 0 ? 6 : index - 1;
        const point = data[index];
        data[index] = {
          ...point,
          Accidents: point.Accidents + accident.accident_count,
        };
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  getAccidentCountweekly: async (req, res) => {
    const today = new Date(req.body.date);
    const start = startOfMonth(today);
    const end = endOfMonth(today);
    const data = [
      {
        name: "First Week",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Second Week",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Third Week",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Fourth Week",
        Accidents: 0,
        Trips: 0,
      },
    ];
    try {
      const trips = await TRIP.find({ day: { $gte: start, $lte: end } });
      const accidents = await ACCIDENT.find({
        day: { $gte: start, $lte: end },
      });
      trips.forEach((trip) => {
        let index = getWeekOfMonth(trip.day, { weekStartsOn: 1 }) - 1;
        const point = data[index];
        data[index] = { ...point, Trips: point.Trips + trip.trip_count };
      });
      accidents.forEach((accident) => {
        let index = getWeekOfMonth(accident.day, { weekStartsOn: 1 }) - 1;
        const point = data[index];
        data[index] = {
          ...point,
          Accidents: point.Accidents + accident.accident_count,
        };
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  getAccidentCountmonthly: async (req, res) => {
    const today = new Date(req.body.date);
    const start = startOfYear(today);
    const end = endOfYear(today);
    const data = [
      {
        name: "Jan",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Feb",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Mar",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Apr",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "May",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Jun",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Jul",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Agu",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Sep",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Oct",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Nov",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Dec",
        Accidents: 0,
        Trips: 0,
      },
    ];
    try {
      const trips = await TRIP.find({ day: { $gte: start, $lte: end } });
      const accidents = await ACCIDENT.find({
        day: { $gte: start, $lte: end },
      });
      trips.forEach((trip) => {
        let index = getMonth(trip.day);
        const point = data[index];
        data[index] = { ...point, Trips: point.Trips + trip.trip_count };
      });
      accidents.forEach((accident) => {
        let index = getMonth(accident.day);
        const point = data[index];
        data[index] = {
          ...point,
          Accidents: point.Accidents + accident.accident_count,
        };
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  getAccidentCountpie: async (req, res) => {
    const today = new Date(req.body.date);
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });
    const data = [
      {
        name: "Monday",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Tuesday",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Wednesday",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Thursday",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Friday",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Saturday",
        Accidents: 0,
        Trips: 0,
      },
      {
        name: "Sunday",
        Accidents: 0,
        Trips: 0,
      },
    ];
    try {
      const trips = await TRIP.find({ day: { $gte: start, $lte: end } });
      const accidents = await ACCIDENT.find({
        day: { $gte: start, $lte: end },
      });
      trips.forEach((trip) => {
        let index = getDay(trip.day);
        index = index === 0 ? 6 : index - 1;
        const point = data[index];
        data[index] = { ...point, Trips: point.Trips + trip.trip_count };
      });
      accidents.forEach((accident) => {
        let index = getDay(accident.day);
        index = index === 0 ? 6 : index - 1;
        const point = data[index];
        data[index] = {
          ...point,
          Accidents: point.Accidents + accident.accident_count,
        };
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },
};

module.exports = reportCntrl;
