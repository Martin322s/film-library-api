const Publication = require('../models/Publication');

exports.createPublication = async (data) => {
    const publication = await Publication.create(data);
    return publication;
}

exports.getAll = async () => await Publication.find();
exports.getOne = async (publicationId) => await Publication.findById({ _id: publicationId });
exports.getMyPublications = async (ownerId) => await Publication.find().where({ _ownerId: ownerId });

exports.donate = async (publicId, data) => 
    await Publication.findByIdAndUpdate({ _id: publicId },  data);

exports.editPublication = async (publicId, data) => await Publication.findByIdAndUpdate({ _id: publicId}, data);
exports.deletePublication = async (publicId) => await Publication.findByIdAndDelete({ _id: publicId });
