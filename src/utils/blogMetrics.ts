export interface BlogPost {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  excerpt: string;
  description: string;
  readTime: string;
  date: string;
  slug: string;
  keywords: string[];
  type: 'general' | 'news';
}

export const getPostStats = (post: BlogPost) => {
  // Generate realistic stats based on post characteristics
  const baseViews = 1247;
  const viewMultiplier = post.type === 'news' ? 1.3 : 1.0;
  const views = Math.round(baseViews * viewMultiplier * (Math.random() * 0.5 + 0.75));
  const likes = Math.round(views * (Math.random() * 0.03 + 0.02)); // 2-5% like rate
  const shares = Math.round(likes * (Math.random() * 0.3 + 0.1)); // 10-40% of likes get shared
  
  return { views, likes, shares };
};

export const calculateBlogMetrics = (posts: BlogPost[]) => {
  const totalPosts = posts.length;
  
  if (totalPosts === 0) {
    return {
      totalPosts: 0,
      totalReadTime: 0,
      averageReadTime: 0,
      totalViews: 0,
      totalLikes: 0
    };
  }
  
  const totalReadTime = posts.reduce((acc, post) => {
    const minutes = parseInt(post.readTime.replace(' min', ''));
    return acc + minutes;
  }, 0);
  
  const averageReadTime = Math.round(totalReadTime / totalPosts);
  const totalViews = totalPosts * 1247; // Simulated views per post
  const totalLikes = Math.round(totalViews * 0.05); // 5% like rate
  
  return {
    totalPosts,
    totalReadTime,
    averageReadTime,
    totalViews,
    totalLikes
  };
};

export const formatBlogDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'LEADERSHIP': 'blue',
    'INNOVATION': 'purple',
    'STRATEGY': 'green',
    'CULTURE': 'orange',
    'TECH NEWS': 'blue',
    'AI NEWS': 'purple',
    'BUSINESS': 'green',
    'INSIGHTS': 'orange',
    'TRENDS': 'pink'
  };
  
  return colors[category] || 'gray';
};