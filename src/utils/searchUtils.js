export const searchKeySelector = (item) => {
    const title = item.title || '';
    const username = item.username || '';
    const author = item.author || '';
    return `${title} ${username} ${author}`;
  };
  