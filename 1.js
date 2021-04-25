const vm=new Vue({
    el:"#music_box",
    data:{
      search:"",
      songs:[],
      url:"",
      picurl:"",
      name:"",
      songer:"",
      
      users:[],
      condition:0,
    },
    methods: {
       
        search_song(){
            const tmp = this;
          axios.get("https://autumnfish.cn/search?keywords="+this.search)
          .then(function(response){
              tmp.songs=response.data.result.songs;
              /* console.log(response.data.result.songs); */
             /*  console.log(response.data.result.songs[0].artists[0].name); */
             
              
          },function(err){
         
          })
          this.search="";
        },
        search_song_message(id,name){
          const tmp = this;
          this.name=name;
          this.condition=1;
          axios.get("https://autumnfish.cn/song/url?id="+id)
          .then(function(response){
            tmp.url=response.data.data[0].url;
           
             
          })
          axios.get("https://autumnfish.cn/song/detail?ids="+id)
          .then(function(response){
            tmp.picurl=response.data.songs[0].al.picUrl;
            tmp.songer=response.data.songs[0].ar[0].name;
          })
          axios.get("https://autumnfish.cn/comment/hot?type=0&id="+id)
          .then(function(response){
            tmp.users=response.data.hotComments;
            console.log(tmp.users);
          })
        },
        change(){
          const music =document.querySelector(".music");
          
          if(music.paused){
            music.play();
            this.condition=1;
          }else{
            music.pause();
            this.condition=0;
          }
        
        }
    },
})