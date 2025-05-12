declare global {
	type Post = {
		text: string;
		postId: number;
		userId: number;
		time: string;
		title: string;
		user: string;
		likes: number;
		dislikes: number;
		reports: number;
		commentsNo: number;
		comments: string[];
	};

	type User = {
		name: string;
		followersNo: number;
		followingNo: number;
		followers: string[];
		following: string[];
		posts: string;
		logo: string;
		userId: number;
	};
}

export {};
