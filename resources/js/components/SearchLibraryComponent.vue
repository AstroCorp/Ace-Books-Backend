<template>
    <form>
        @csrf
        
        <div class="form-group">
            <input class="form-control" type="text" name="search" placeholder="Buscar...">
        </div>
    </form>
</template>

<script>
    export default
    {
        mounted()
        {
            console.log('Component mounted.')
        }
    }
</script>
