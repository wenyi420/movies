import { useRouter, useRoute } from "vue-router";

export function routerUtils() {
  const router = useRouter();
  const route = useRoute();

  function toHome() {
    router.push("./");
  }
  function toSignup() {
    router.push("/signup");
  }

  function toLogin() {
    router.push("/login");
  }

  function toMyMovies() {
    router.push("/myMovies");
  }

  function toSearch() {
    router.push("./search");
  }

  function routerGoBack() {
    router.go(-1);
  }

  function getPath() {
    return route.path
  }

  return {
    toHome,
    toLogin,
    toSignup,
    toMyMovies,
    toSearch,
    routerGoBack,
    getPath
  };
}
