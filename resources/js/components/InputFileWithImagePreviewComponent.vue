<template>
    <div class="row justify-content-center align-items-center">
        <label for="image-upload">
            <div id="preview" class="rounded-circle d-flex align-items-center justify-content-center">
                <img class="img-fluid rounded-circle" v-if="url" :src="url" />
                <div class="edit"><span class="icon-centered icon-camera"></span></div>
            </div>
        </label>

        <input name="image" id="image-upload" class="d-none" type="file" @change="onFileChange" />
    </div>
</template>

<script>
    export default
    {
        props: [
            'image'
        ],
        data()
        {
            return {
                url: null,
            }
        },
        mounted()
        {
            this.url = this.image;
        },
        methods:
        {
            onFileChange(event)
            {
                const image = event.target.files[0];
                this.url = URL.createObjectURL(image);
            }
        }
    }  
</script>
