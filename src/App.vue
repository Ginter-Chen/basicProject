<template>
  <div>Ginter</div>
  <router-view :key="$route.path"></router-view>
</template>

<script>
import { onMounted, reactive, ref, computed, watch, nextTick } from "vue";
import { useRouter } from 'vue-router';

export default {
  components:{
  },
  setup(){
    onMounted( () => {
    });
    return{
    }
  },
}
</script>