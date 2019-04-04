// Resolves the 'User' field on Link type in '../schema.graphql'
const postedBy = ({ id }, args, context) =>
  context.prisma.link({ id }).postedBy();

// Resolves the 'votes' field on Link type in '../schema.graphql'
const votes = ({ id }, args, context) => context.prisma.link({ id }).votes();

module.exports = {
  postedBy,
  votes
};
