const link = ({ id }, args, context) => context.prisma.vote({ id }).link();

const user = ({ id }, args, context) => context.prisma.vote({ id }).user();

module.exports = {
  link,
  user
};
