<template>
    <!-- article - start -->
    <div class="flex flex-col overflow-hidden rounded-lg border bg-white">
        <a @click="emitClick" class="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
            <img :src="postFirstPic"
                loading="lazy" alt="加载失败"
                class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
        </a>

        <div class="flex flex-1 flex-col p-4 sm:p-6">
            <h2 class="mb-2 text-lg font-semibold text-gray-800">
                <a @click="emitClick" class="transition duration-100 hover:text-indigo-500 active:text-indigo-600">{{ postData.title }}</a>
            </h2>

            <p class="mb-8 text-gray-500 truncate ...">{{ postData.content }}</p>

            <div class="mt-auto flex items-end justify-between">
                <div class="flex items-center gap-2">
                    <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                        <img src="https://images.unsplash.com/photo-1592660503155-7599a37f06a6?auto=format&q=75&fit=crop&w=64"
                            loading="lazy" alt="Photo by Jassir Jonis" class="h-full w-full object-cover object-center" />
                    </div>

                    <div>
                        <span class="block text-indigo-500">Tylor Grey</span>
                        <span class="block text-sm text-gray-400">March 15, 2021</span>
                    </div>
                </div>

                <span @click="emitDelete" class="rounded border px-2 py-1 text-sm text-white bg-red-400 active:bg-red-600">Delete</span>
            </div>
        </div>
    </div>
    <!-- article - end -->
</template>

<script>
export default {
    name: 'PostItem',
    props:['postData'],
    data() {
        return {
            // postData:{
            //     title: "帖子标题1",

            //     content: "帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1帖子内容1",
            //     pics: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            //     ]

            // },
            authorData: {
                
            }
        }
    },
    created() {

    },
    methods: {
        emitClick() {
            this.$emit('post-click');
        },
        emitDelete() {
            this.$emit('post-delete');
        }
    },
    mounted() {

    },
    computed: {
        postFirstPic() {
            return this.postData.pics[0]
        }
    }
}

</script>
<style scoped></style>
