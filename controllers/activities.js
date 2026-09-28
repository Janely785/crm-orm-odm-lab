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

//se quedaba en {} porque nunca ese extraia, con el metadata se extrae
//del cuerpo a la peticion
async function create(req, res) {
  const { type, description, contactId, userId, metadata } = req.body;
  const activity = await Activity.create({ type, description, contactId, userId, metadata });

  res.status(201).json(activity);
}


//agrego el tercer argumento con dos cosas: 
//con el new:true es dame el documento despues del cambio
//y con runValidators: true le dice a moongose que valide los datos 
//que le estas mandando contra las reglas del esquema antes de guardarlos
// 
async function update(req, res) {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

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
