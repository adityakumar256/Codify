const normalizeDashboard = ({ user, profiles }) => {
  let totalSolved = 0;

  profiles.forEach((p) => {
    totalSolved += p?.stats?.totalSolved || 0;
  });

  return {
    user,
    totalSolved,
    platforms: profiles,
  };
};

module.exports = normalizeDashboard;
