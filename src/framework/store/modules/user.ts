export const useUserStore = defineStore("user", () => {
  const user = ref({
    name: "test",
    age: 18,
  });
  const getUserInfo = () => {
    return toValue(user);
  };
  return {
    getUserInfo,
  };
});
