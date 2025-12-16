function normalizeProfile({
  platform,
  username,
  profileUrl = null,
  avatar = null,
  stats = {},
  extra = {}
}) {
  return {
    platform,
    username,

    profile: {
      url: profileUrl,
      avatar,
    },

    stats: {
      totalSolved: stats.totalSolved ?? 0,
      easy: stats.easy ?? 0,
      medium: stats.medium ?? 0,
      hard: stats.hard ?? 0,
      rating: stats.rating ?? null,
      rank: stats.rank ?? null,
      streak: stats.streak ?? null,
    },

    extra: {
      languages: extra.languages ?? [],
      topics: extra.topics ?? [],
      repositories: extra.repositories ?? null,
      followers: extra.followers ?? null,
      following: extra.following ?? null,
      ...extra, // preserve custom fields like "note"
    },
  };
}

module.exports = normalizeProfile;