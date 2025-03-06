const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const router = express.Router();

/**
 * Route d'inscription
 */
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;

        // Vérification des champs requis
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer un nouveau utilisateur
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false  // Par défaut, l'utilisateur n'est pas admin
        });

        await newUser.save();
        
        // Créer un token pour le nouvel utilisateur
        const token = jwt.sign(
            { 
                id: newUser._id, 
                username: newUser.username, 
                isAdmin: newUser.isAdmin 
            }, 
            process.env.SECRET, 
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: "Utilisateur enregistré avec succès",
            token,
            username: newUser.username,
            isAdmin: newUser.isAdmin, // Renvoi des informations pertinentes
        });
    } catch (error) {
        console.error("Erreur d'inscription:", error);
        res.status(500).json({ message: "Erreur lors de l'inscription", error: error.message });
    }
});

/**
 * Route de connexion
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérification des champs requis
        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        // Trouver l'utilisateur
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Vérifier le mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Créer le token JWT
        const token = jwt.sign(
            { 
                id: user._id, 
                username: user.username, 
                isAdmin: user.isAdmin,
                // Ajouter userId pour correspondre au frontend
                userId: user._id
            }, 
            process.env.SECRET, 
            { expiresIn: '1h' }
        );

        // Envoyer la réponse avec le token
        res.status(200).json({
            token,
            username: user.username,
            isAdmin: user.isAdmin,
            userId: user._id
        });
    } catch (error) {
        console.error("Erreur de connexion:", error);
        res.status(500).json({ message: "Erreur lors de la connexion", error: error.message });
    }
});

/**
 * Route pour vérifier si un token est valide
 */
router.get("/verify-token", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ valid: false, message: "Token non fourni" });
        }
        
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ valid: false, message: "Utilisateur non trouvé" });
        }
        
        res.status(200).json({ 
            valid: true, 
            user: {
                username: user.username,
                isAdmin: user.isAdmin,
                userId: user._id
            } 
        });
    } catch (error) {
        console.error("Erreur de vérification du token:", error);
        res.status(401).json({ valid: false, message: "Token invalide" });
    }
});

module.exports = router;
