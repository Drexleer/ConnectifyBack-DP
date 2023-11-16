const NewAd = require('../../models/NewAd');

const getAllAds = async (req, res) => {
  try {
    const ads = await NewAd.find({ isDeleted: false })
      .populate({
        path: 'creator',
        match: { deleted: { $ne: true } }, // Excluir los creadores con deleted: true
      })
      .exec();
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ error: 'Error creating ad.' });
  }
};

module.exports = getAllAds;
