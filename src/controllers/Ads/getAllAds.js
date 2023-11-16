const NewAd = require('../../models/NewAd');

const getAllAds = async (req, res) => {
  try {
    const ads = await NewAd.find({ isDeleted: false })
      .populate('creator')
      .exec();

    // Filtrar los anuncios según la propiedad isDeleted de cada creador
    const adsFiltrados = ads.filter((ad) =>
      ad.creator.every((creator) => !creator.isDeleted)
    );

    // Enviar la respuesta solo después de filtrar los anuncios
    res.status(200).json(adsFiltrados);
  } catch (error) {
    // Enviar una respuesta de error si hay algún problema
    res.status(500).json({ error: 'Error obtaining ads.' });
  }
};

module.exports = getAllAds;
