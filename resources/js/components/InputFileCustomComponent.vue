<template>
    <div class="row justify-content-center align-items-center">
        <label for="file-upload">
            <div class="d-flex align-items-center justify-content-center">
                <span class="form-btn">{{ buttonText }}</span>
                <span v-if="fileName" class="ml-2">{{ fileName }}</span>
            </div>
        </label>

        <input name="file" id="file-upload" class="d-none" type="file" @change="onFileChange" />
    </div>
</template>

<script>
    export default
    {
        props: [
            'buttonText'
        ],
        data()
        {
            return {
                fileName: null,
            }
        },
        methods:
        {
            onFileChange(event)
            {
                this.fileName = event.target.files[0].name;
            }
        }
    }
</script>
