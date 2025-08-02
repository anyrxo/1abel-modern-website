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

export const calculateBlogMetrics = (posts: BlogPost[]) => {
  const totalPosts = posts.length;
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