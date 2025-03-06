const express = require('express');
const Reservation = require('../model/reservation');
const router = express.Router();
const authenticate = require('../middleware/auth');

// 🛠 Route pour créer une réservation
router.post("/create", authenticate, async (req, res) => {
    const { name, date, time, peopleCount } = req.body;
    const user = req.user.id; // Récupérer l'ID de l'utilisateur connecté

    if (!name || !date || !time || !peopleCount) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires" });
    }

    try {
        const newReservation = new Reservation({
            user,
            name,
            date,
            time,
            peopleCount
        });

        await newReservation.save();
        res.status(200).json({ message: "Réservation créée avec succès", reservation: newReservation });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de la réservation" });
    }
});

// 📌 Route pour récupérer les réservations de l'utilisateur connecté
router.get("/user", authenticate, async (req, res) => {
    const user = req.user.id;

    try {
        const reservations = await Reservation.find({ user }).sort({ date: 1, time: 1 });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des réservations" });
    }
});

// 📌 Route pour obtenir les détails d'une réservation spécifique
router.get("/details/:id", authenticate, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ error: "Réservation introuvable" });

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la réservation" });
    }
});

// 📌 Route pour annuler une réservation
router.delete("/delete/:id", authenticate, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ error: "Réservation introuvable" });

        // Vérifier si l'utilisateur est bien le propriétaire
        if (reservation.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Accès non autorisé" });
        }

        await reservation.deleteOne();
        res.status(200).json({ message: "Réservation annulée avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'annulation de la réservation" });
    }
});

module.exports = router;
