const UserModel = require('../model/user')

// Créer et enregistrer un nouvel utilisateur
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        res.status(400).send({ message: "Le contenu ne peut pas être vide !" });
    }

    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });

    await user.save().then(data => {
        res.send({
            message: "Utilisateur créé avec succès !",
            user: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la création de l'utilisateur"
        });
    });
};

// Récupérer tous les utilisateurs de la base de données.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Trouver un seul utilisateur avec un id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Mise à jour d'un utilisateur par l'identifiant dans la requête
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas être vides !"
        });
    }

    const id = req.params.id;

    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: "Utilisateur non trouvé."
            });
        } else {
            res.send({ message: "L'utilisateur a été mis à jour avec succès." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Supprime un utilisateur avec l'id spécifié dans la requête
exports.destroy = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: "Utilisateur non trouvé."
            });
        } else {
            res.send({
                message: "Utilisateur supprimé avec succès !"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};