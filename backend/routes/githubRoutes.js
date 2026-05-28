import express from 'express';
import axios from 'axios';

const router = express.Router();

// Simple in-memory cache
let githubCache = {
  profile: null,
  repos: [],
  lastFetched: null
};

// Cache duration: 15 minutes (15 * 60 * 1000 ms)
const CACHE_DURATION = 15 * 60 * 1000;

// @desc    Fetch GitHub profile stats and repos
// @route   GET /api/github/profile
// @access  Public
router.get('/profile', async (req, res, next) => {
  const now = new Date();
  const githubUser = 'MUKESHV17';

  // Return cache if it is still valid
  if (githubCache.profile && githubCache.lastFetched && (now - githubCache.lastFetched < CACHE_DURATION)) {
    return res.status(200).json({
      success: true,
      source: 'cache',
      data: {
        profile: githubCache.profile,
        repos: githubCache.repos
      }
    });
  }

  try {
    console.log(`Fetching fresh GitHub metrics for user: ${githubUser}...`);
    
    // Fetch profile data and public repositories concurrently
    const [profileRes, reposRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${githubUser}`, {
        headers: { 'User-Agent': 'Mukesh-Portfolio-Agent' }
      }),
      axios.get(`https://api.github.com/users/${githubUser}/repos?sort=pushed&direction=desc&per_page=100`, {
        headers: { 'User-Agent': 'Mukesh-Portfolio-Agent' }
      })
    ]);

    // Format repos to exclude bloated information and only keep necessary fields
    const formattedRepos = reposRes.data
      .filter(repo => !repo.fork) // public original projects only
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        watchers: repo.watchers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        updatedAt: repo.pushed_at
      }))
      .slice(0, 8); // Select top 8 active original repositories

    const formattedProfile = {
      username: profileRes.data.login,
      avatarUrl: profileRes.data.avatar_url,
      profileUrl: profileRes.data.html_url,
      name: profileRes.data.name,
      company: profileRes.data.company,
      blog: profileRes.data.blog,
      location: profileRes.data.location,
      bio: profileRes.data.bio,
      publicRepos: profileRes.data.public_repos,
      publicGists: profileRes.data.public_gists,
      followers: profileRes.data.followers,
      following: profileRes.data.following
    };

    // Store in cache
    githubCache.profile = formattedProfile;
    githubCache.repos = formattedRepos;
    githubCache.lastFetched = now;

    res.status(200).json({
      success: true,
      source: 'network',
      data: {
        profile: formattedProfile,
        repos: formattedRepos
      }
    });

  } catch (error) {
    console.error('GitHub API error:', error.message);
    
    // Fallback: If network request fails, return cache (even if expired)
    if (githubCache.profile) {
      return res.status(200).json({
        success: true,
        source: 'expired-cache-fallback',
        error: 'Network refresh failed, returning stale cache',
        data: {
          profile: githubCache.profile,
          repos: githubCache.repos
        }
      });
    }

    // Ultimate mock fallback (in case GitHub is rate-limited and no cache is present)
    const mockProfile = {
      username: githubUser,
      avatarUrl: "https://avatars.githubusercontent.com/u/1027b0293?v=4", // standard profile
      profileUrl: `https://github.com/${githubUser}`,
      name: "Mukesh V",
      location: "Coimbatore, India",
      bio: "Computer Science student | Full Stack Developer | AI/ML Enthusiast",
      publicRepos: 18,
      followers: 12,
      following: 15
    };

    const mockRepos = [
      {
        id: 1,
        name: "healthcare-risk-system",
        description: "AI-ML Integrated Healthcare Risk Management System using Random Forest and PyPDF.",
        url: `https://github.com/${githubUser}/healthcare-risk-system`,
        stars: 3,
        language: "Python",
        topics: ["machine-learning", "react", "flask", "ai"]
      },
      {
        id: 2,
        name: "ewallet-management-system",
        description: "Secure e-wallet bank transaction ledger system using Spring Boot.",
        url: `https://github.com/${githubUser}/ewallet-management-system`,
        stars: 2,
        language: "Java",
        topics: ["spring-boot", "react", "mysql", "jwt"]
      },
      {
        id: 3,
        name: "intelligent-traffic-management",
        description: "Computer vision and YOLO dynamic traffic signal switching optimizer.",
        url: `https://github.com/${githubUser}/intelligent-traffic-management`,
        stars: 5,
        language: "Python",
        topics: ["computer-vision", "yolo", "tensorflow", "pygame"]
      }
    ];

    res.status(200).json({
      success: true,
      source: 'mock-fallback',
      error: 'GitHub API offline/rate-limited. Displaying mock achievements.',
      data: {
        profile: mockProfile,
        repos: mockRepos
      }
    });
  }
});

export default router;
