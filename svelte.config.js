import cloudflare from '@sveltejs/adapter-cloudflare';

export default {
  kit: {
    adapter: cloudflare(),
    paths: {}
  }
};
