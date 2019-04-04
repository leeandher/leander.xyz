// Get packages
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUserId, ensureLinkPoster } = require("../utils");

// Authentication

const signup = async (parent, args, context, info) => {
  // Hash the password
  const password = await bcrypt.hash(args.password, 10);

  // Create the user
  const user = await context.prisma.createUser({
    ...args,
    password
  });

  // JWT Auth
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  // Return an object in the same structure as the AuthPayload in schema.graphql
  return {
    token,
    user
  };
};

const login = async (parent, args, context, info) => {
  // Find the user
  const user = await context.prisma.user({ email: args.email });
  if (!user) throw new Error("No such user found");

  // Validate password
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error("Invalid password");

  // JWT Auth
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  // Return an object in the same structure as the AuthPayload in schema.graphql
  return {
    token,
    user
  };
};

// Link Management

const postLink = (parent, { url, description }, context, info) => {
  // Get the logged in user
  const userId = getUserId(context);

  // Create their link
  return context.prisma.createLink({
    url,
    description,
    postedBy: { connect: { id: userId } }
  });
};

const updateLink = async (
  parent,
  { linkId, url, description },
  context,
  info
) => {
  // Verify the logged in user as poster
  await ensureLinkPoster(context, linkId);

  // Update the existing link
  return context.prisma.updateLink({
    where: { id: linkId },
    data: { url, description }
  });
};

const deleteLink = async (parent, { linkId }, context, info) => {
  // Verify the logged in user as poster
  await ensureLinkPoster(context, linkId);

  // Delete the associated votes
  const linkVotes = await context.prisma.link({ id: linkId }).votes();
  const linkIds = linkVotes.map(data => data.id);
  await context.prisma.deleteManyVotes({ id_in: linkIds });

  // Delete the link
  return context.prisma.deleteLink({ id: linkId });
};

// Vote Management

const vote = async (parent, { linkId }, context, info) => {
  // Get the logged in user
  const userId = getUserId(context);
  // Check that no link exists already
  const voteExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: linkId }
  });
  if (voteExists) throw new Error(`Already voted for link: ${linkId}`);

  // Connect this vote instance to the user and link
  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: linkId } }
  });
};

module.exports = {
  signup,
  login,
  postLink,
  updateLink,
  deleteLink,
  vote
};
