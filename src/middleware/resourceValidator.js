export default (resourceSchema) => async (req, res, next) => {
  const resource = req.body;

  try {
    await resourceSchema.validate(resource);
    next();
  } catch(e) {
    console.log('resourceValidator error', e);
    res.status(400).send({ message: e.errors.join(', ') });
  }
};