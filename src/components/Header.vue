<template>

  <div class="m-content">
    <h3>欢迎来到xyy的博客</h3>
    <div class="block"><el-avatar :size="50" :src=user.avatar></el-avatar></div>
    <div>{{ user.username }}</div>

    <div class="maction">
      <span> <el-link href="/blogs">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span> <el-link type="success" href="/blog/add">发表博客</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin"> <el-link type="primary" href="/login">登录</el-link></span>
      <span v-show="hasLogin"> <el-link type="warning" @click="logout">退出</el-link></span>
    </div>

  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      user: {
        username: '请先登录',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      hasLogin : false
    }
  },
  created() {
    if(this.$store.getters.getUser.username){
      this.hasLogin = true
      this.user.username=this.$store.getters.getUser.username
      this.user.avatar=this.$store.getters.getUser.avatar
    }
  },
  methods:{

    logout(){
      const _this = this
      _this.$axios.get("/logout",{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res =>{
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/login")
      })
    }

  }
}
</script>

<style scoped>

.m-content{
  margin: 0 auto;
  max-width: 960px;
  text-align: center;
}

.maction{
  margin: 10px;
}
</style>