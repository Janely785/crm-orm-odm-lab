const Activity = require('../models/mongoose/activity');

async function getAll(req, res) {
  // TODO CHALLENGE 04: construir el filtro de Mongoose a partir de req.query.type
  const filter = {};
  //el if pregunta si viene algo en el type 
  //si es call la condicion es true entra al if
  //filter queda como { type: "CALL"} y Activity.find(filter) 
  //le dice a mongodb traeme solo los documentos donde type sea call
  if (req.query.type) {
  filter.type = req.query.type;
  }

  // TODO CHALLENGE 02: recuperar las actividades con Mongoose
  //DONE 
  //filter ya existe vacio {}, entonces con moongose cuando buscas con un
  //filtro vacio regresa todos los documentoas Activity.find(filter)
    const activities = await Activity.find(filter);

  res.status(200).json(activities);
}

async function getById(req, res) {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  res.status(200).json(activity);
}

async function create(req, res) {
  // TODO CHALLENGE 06: persistir correctamente el campo metadata (estructura variable segun type)
  const { type, description, contactId, userId } = req.body;
  const activity = await Activity.create({ type, description, contactId, userId });

  res.status(201).json(activity);
}

async function update(req, res) {
  // TODO CHALLENGE 08: revisar la operación de actualización
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body);

  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  res.status(200).json(activity);
}

async function remove(req, res) {
  const activity = await Activity.findByIdAndDelete(req.params.id);

  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  res.status(204).send();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
