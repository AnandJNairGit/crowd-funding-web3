export default currentUnixTimestamp = async (campaigns) => {
  return Math.floor(Date.now() / 1000);
};
