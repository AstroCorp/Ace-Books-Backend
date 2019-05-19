<template>
    <div class="row justify-content-center align-items-center">
        <label for="image-upload">
            <div v-if="type === 'profile'" id="preview" class="rounded-circle d-flex align-items-center justify-content-center">
                <img class="img-fluid rounded-circle" v-if="url" :src="url" />
                <div class="edit"><span class="icon-centered icon-camera"></span></div>
            </div>

            <div v-if="type === 'library'" id="preview" class="standar-image-cb d-flex align-items-center justify-content-center">
                <div v-if="!url">{{ textInput }}</div>
                <img class="standar-image-cb" v-if="url" :src="url" />
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
            'image',
            'type',

            'textInput'
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
