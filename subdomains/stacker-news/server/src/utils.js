// Get packages
const jwt = require("jsonwebtoken");

// Return the userId in the Authentication header if present
const getUserId = context => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }
  throw new Error("Not authenticated");
};

// Return the userId only  if they posted the supplied Link
const ensureLinkPoster = async (context, linkId) => {
  const userId = getUserId(context);

  // Ensure the user posted this link
  const linkExists = await context.prisma.$exists.link({
    id: linkId,
    postedBy: { id: userId }
  });

  if (linkExists) return true;

  throw new Error("User does not own this link");
};

module.exports = {
  getUserId,
  ensureLinkPoster
};
