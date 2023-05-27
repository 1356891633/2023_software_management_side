<template>
    <!-- article - start -->
    <div class="flex flex-col overflow-hidden rounded-lg border bg-white">
        <a @click="emitClick" class="cursor-pointer group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
            <el-image :src="postFirstPic"
                loading="lazy" alt="加载失败"
                class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
        </a>

        <div class="flex flex-1 flex-col p-4 sm:p-6">
            <h2 class="mb-2 text-lg font-semibold text-gray-800 cursor-pointer">
                <a @click="emitClick" class="transition duration-100 hover:text-indigo-500 active:text-indigo-600">{{ postData.title }}</a>
            </h2>

            <p class="mb-8 text-gray-500 truncate ...">{{ postData.content }}</p>
            
            <div class="mt-auto flex items-end justify-between">
                <div class="flex items-center gap-2">
                    <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                        <img :src="authorData.avatar"
                            loading="lazy" alt="Photo by Jassir Jonis" class="h-full w-full object-cover object-center" />
                    </div>
                    <div>
                        <span class="block text-indigo-500">{{ authorData.name }}</span>
                        <span class="block text-sm text-gray-400">{{ postData.time | FormatDate('yyyy-MM-dd')}}</span>
                    </div>
                </div>

                <button @click="emitDelete" class="rounded border px-2 py-1 text-sm text-white bg-red-400 hover:bg-red-600">Delete</button>
            </div>
        </div>
    </div>
    <!-- article - end -->
</template>

<script>
export default {
    name: 'PostItem',
    props:['postData','avatar','name'],
    data() {
        return {
            // postData:{
            //     title: "帖子标题1",

            //     content: "帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1",
            //     pics: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            //     ]

            // },
            // authorData: {
            // "user_name": "lxy",
            // "avatar": "/user/sb.png"
            // }
            authorData:{}
        }
    },
    created() {
        
        
        console.log(this.authorData)
    },
    methods: {
        emitClick() {
            this.$emit('post-click');
        },
        emitDelete() {
            this.$emit('post-delete');
        },
        getAuthorData(post) {
            this.$axios.get('/api/user/view',{
                params:{
                    user_id:post.author_id
                }
            }).then((response)=>{
                this.authorData = response.data
                
            }).catch(()=>{
            })
        },
    },
    mounted() {
        this.authorData=this.getAuthorData(this.postData)
    },
    computed: {
        postFirstPic() {
            return this.postData.pics[0]
        }
    },
    filters: {
        FormatDate: function(value,args) {
            var dt = new Date(value);
            if(args == 'yyyy-M-d') {// yyyy-M-d
            let year = dt.getFullYear();
            let month = dt.getMonth() + 1;
            let date = dt.getDate();
            return `${year}-${month}-${date}`;
        } else if(args == 'yyyy-M-d H:m:s'){// yyyy-M-d H:m:s
            let year = dt.getFullYear();
            let month = dt.getMonth() + 1;
            let date = dt.getDate();
            let hour = dt.getHours();
            let minute = dt.getMinutes();
            let second = dt.getSeconds();
            return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
        } else if(args == 'yyyy-MM-dd') {// yyyy-MM-dd
            let year = dt.getFullYear();
            let month = (dt.getMonth() + 1).toString().padStart(2,'0');
            let date = dt.getDate().toString().padStart(2,'0');
            return `${year}-${month}-${date}`;
        } else {// yyyy-MM-dd HH:mm:ss
            let year = dt.getFullYear();
            let month = (dt.getMonth() + 1).toString().padStart(2,'0');
            let date = dt.getDate().toString().padStart(2,'0');
            let hour = dt.getHours().toString().padStart(2,'0');
            let minute = dt.getMinutes().toString().padStart(2,'0');
            let second = dt.getSeconds().toString().padStart(2,'0');
            return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
        }
        }

    }
}

</script>
<style scoped></style>
