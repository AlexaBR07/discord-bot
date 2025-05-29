// Opcional: para que el bot exponga endpoints si es necesario
exports.healthCheck = (req, res) => {
  res.send('🤖 Discord Bot está activo');
};
