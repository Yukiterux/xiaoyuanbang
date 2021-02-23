<template>
    <div>
   <nuxt-child/>
    </div>
</template>
<script>
export default {
     created:function(){
      this.$router.push('/user/comment/errands'); 
    }
}
</script>
