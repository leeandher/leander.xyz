// Resolves the 'links' field on User type in '../schema.graphql'//
const links = ({ id }, args, context) => context.prisma.user({ id }).links();

module.exports = {
  links
};
