module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("images/favicon.svg");
  return {
    dir: { input: "src", output: "_site" }
  };
};
