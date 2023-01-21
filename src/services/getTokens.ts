export const getAccessToken = async () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('@uSecrets:accessToken')}`,
    },
  }
}
