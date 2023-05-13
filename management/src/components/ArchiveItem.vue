<template>
    <!-- product - start -->
    <div>
        <a class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
            <img @click="emitClick" :src="archiveFirstPic" loading="lazy" alt="Photo by Austin Wade"
                class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
        </a>
        <div class="flex flex-row items-end justify-evenly content-end">
            <div class="flex flex-col">
            <span class="text-gray-500">{{ archiveData.animal_type }}</span>
            <a @click="emitClick" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">{{
                archiveData.animal_name }}</a>
            
        </div>
        <button @click="emitDelete"
            class="rounded border px-2 py-2 text-sm text-white bg-red-400 hover:bg-red-600">Delete</button>
        </div>
        


    </div>
    <!-- product - end -->
</template>

<script>
export default {
    name: '',
    props:['archiveData'],
    data() {
        return {
            // archiveData: {
            //     animal_id: "1",
            //     animal_name: "动物1",
            //     animal_sex: 1,
            //     animal_status: 1,
            //     animal_type: "猫",
            //     pics: ["/animal/mmexport1679556326345-small.jpg"],
            //     content: "动物描述"
            // }
        }
    },
    created() {

    },
    methods: {
        emitClick() {
            this.$emit('archive-click');
        },
        emitDelete() {
            this.$emit('archive-delete');
        }
    },
    mounted() {

    },
    computed: {
        archiveFirstPic() {
            return this.archiveData.pics[0]
        }
    }
}

</script>
<style scoped></style>
