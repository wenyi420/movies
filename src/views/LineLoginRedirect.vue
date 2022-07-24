<script>
// redirection handle
let code = getUrlParams("code");
let state = getUrlParams("state");
let error = getUrlParams("error");

if (error) {
  window.opener.postMessage(
    {
      error: "Line 登入失敗",
    },
    location.origin
  );
}

if (code && state) {
  // post message to parent
  window.opener.postMessage(
    {
      code,
      state,
    },
    location.origin
  );
}

function getUrlParams(param) {
  let search = location.search.substring(1);
  let params = search.split("&");

  let target = params.find((item) => {
    let key = item.split("=")[0];
    if (key === param) {
      return item;
    }
  });
  if (!target) return null;

  return target.split("=")[1];
}
</script>
<template>line login redirect</template>
