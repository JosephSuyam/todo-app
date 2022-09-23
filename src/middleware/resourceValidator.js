export default (resourceSchema) => async (req, res, next) => {
  const resource = req.body;

  try {
    await resourceSchema.validate(resource);
    next();
  } catch(e) {
    return res.status(400).json({ message: e.errors.join(', ').replace(/_/g, ' ') });
  }
};