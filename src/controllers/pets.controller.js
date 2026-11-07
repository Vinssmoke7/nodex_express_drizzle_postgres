import { PetModel } from '../models/pet.model.js';

export const getPets = async (req, res, next) => {
  try {
    const pets = await PetModel.findAll();
    res.status(200).json({ success: true, data: pets });
  } catch (error) {
    next(error);
  }
};

export const getPetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pet = await PetModel.findById(id);

    if (!pet) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada.' });
    }

    res.status(200).json({ success: true, data: pet });
  } catch (error) {
    next(error);
  }
};

export const createPet = async (req, res, next) => {
  try {
    const { name, species, breed, age } = req.body;
    const userId = req.user.id;

    if (!name || !species) {
      return res.status(400).json({ success: false, message: 'Nombre y especie son obligatorios.' });
    }

    const pet = await PetModel.create({
      name,
      species,
      breed: breed || null,
      age: age ? parseInt(age, 10) : null,
      createdById: userId,
      updatedById: userId
    });

    res.status(201).json({ success: true, message: 'Mascota creada con éxito', data: pet });
  } catch (error) {
    next(error);
  }
};

export const updatePet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, species, breed, age } = req.body;
    const userId = req.user.id;

    const existingPet = await PetModel.findById(id);
    if (!existingPet) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada.' });
    }

    const dataToUpdate = {
      ...(name && { name }),
      ...(species && { species }),
      ...(breed !== undefined && { breed }),
      ...(age !== undefined && { age: parseInt(age, 10) }),
      updatedById: userId
    };

    const pet = await PetModel.update(id, dataToUpdate);

    res.status(200).json({ success: true, message: 'Mascota actualizada con éxito', data: pet });
  } catch (error) {
    next(error);
  }
};

export const deletePet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await PetModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada.' });
    }

    res.status(200).json({ success: true, message: 'Mascota eliminada exitosamente.' });
  } catch (error) {
    next(error);
  }
};