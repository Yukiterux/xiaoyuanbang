<template>
  <div></div>
</template>
<script>
import Auth from "@/utils/auth";
export default {
  mounted() {
    if (Auth.getToken()==undefined||Auth.getToken()==null||Auth.getToken()=='') {
          this.$router.push({ path: "/login" });
    } else {
        this.$router.push({ path: "/admin" });
    }
  }
};
</script>
