/* ============================================
   StreamVault — shared blog storage helper
   Used by blog.html (read-only render) and
   admin.html (create / delete). Backed by
   localStorage under key "sv_blog_posts".
   Swap this whole file for real API calls
   when you hook up a backend.
   ============================================ */
(function (global) {
  const STORAGE_KEY = 'sv_blog_posts';

  // Seeded starter posts — dummy images from picsum.photos.
  // Replace `image` with real URLs (or delete these posts
  // entirely from the admin panel) whenever you're ready.
  const SEED_POSTS = [
    {
      id: 'seed-1',
      title: 'Why "no VPN needed" is a red flag, not a feature',
      category: 'Guide',
      excerpt: 'A lot of grey-market IPTV marketing leans on phrases like "bypasses ISP blocking." Here\u2019s what that actually means, and why a licensed service never needs to say it.',
      body: '',
      date: '2026-07-01',
      image: 'https://picsum.photos/seed/streamvault-post-1/800/450'
    },
    {
      id: 'seed-2',
      title: 'Your second post goes here',
      category: 'Placeholder',
      excerpt: 'This card is a placeholder. Edit or delete it from the admin panel, then publish your own post — it\u2019ll appear on this page automatically.',
      body: '',
      date: '2026-07-05',
      image: 'https://picsum.photos/seed/streamvault-post-2/800/450'
    }
  ];

  function getPosts() {
    let raw;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return SEED_POSTS.slice();
    }
    if (raw === null) {
      // First visit: seed storage so admin.html can manage (and delete) these too.
      savePosts(SEED_POSTS);
      return SEED_POSTS.slice();
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function savePosts(posts) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      // storage unavailable (private browsing, etc.) — fail silently
    }
  }

  function addPost(post) {
    const posts = getPosts();
    post.id = 'post-' + Date.now();
    posts.push(post);
    savePosts(posts);
    return posts;
  }

  function deletePost(id) {
    const posts = getPosts().filter(function (p) { return p.id !== id; });
    savePosts(posts);
    return posts;
  }

  global.SVBlog = {
    getPosts: getPosts,
    addPost: addPost,
    deletePost: deletePost
  };
})(window);
