<template>
    <view class="save-image-box">
        <image src="http://pics.sc.chinaz.com/files/pic/pic9/201509/apic14546.jpg"/>
        <save-image :fileUrl="['http://pics.sc.chinaz.com/files/pic/pic9/201509/apic14546.jpg']" :isTempDir="false"></save-image>
    </view>
</template>

<script>
    import saveImage from '@/components/qs-save-image/qs-save-image.vue';
    export default {
        components: {
            saveImage,
        },
    }
</script>

<style scoped>

</style>